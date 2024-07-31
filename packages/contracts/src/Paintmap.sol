// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {ERC721Base} from "./ERC721Base.sol";
import {IBlitmap} from "./IBlitmap.sol";
import {IExquisiteGraphics} from "./IExquisiteGraphics.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {ENSNameResolver} from "./lib/ENSNameResolver.sol";

import "./lib/BlitmapAnalysis.sol";

// TODO: PAINTMAP?

/// @author cjpais.eth
/// @title 'Paintmap' aka 'BlitmapPaint' aka 'Paint a Blitmap'
contract Paintmap is ERC721Base, ENSNameResolver {
    // ************************* //
    // *** TYPE DECLARATIONS *** //
    // ************************* //

    // TODO optimize the struct for mint cost
    struct PaintedBlitmap {
        uint256 originalTokenID;
        bytes12 colors;
        address painter;
    }

    // TODO add event for subgraph?
    // event BlitmapPainted(
    //     address indexed _from,
    //     address indexed _to,
    //     uint256 indexed _tokenId,
    //     bytes12 _colors
    // );

    // *********************** //
    // *** STATE VARIABLES *** //
    // *********************** //

    // TODO should there be a specific mint and a random mint?
    // 16 for specific, 16 for random? specific is .064, random is .032?
    uint256 public constant MAX_NUM_VARIANTS = 16;
    bytes8 public constant XQST_GFX_HEADER = hex"0120200004000000";
    uint256 public constant MINT_PRICE = .05 ether;
    uint256 public constant DISCOUNT_MINT_PRICE = .025 ether;

    mapping(uint256 => PaintedBlitmap) paintings;
    mapping(uint256 => uint256) numPainted;
    mapping(bytes12 => bool) invalidPalettes;
    mapping(address => bool) claimedDiscount;
    mapping(address => uint256) artistBalance;

    uint256 public ownerBalance;
    uint256 public xqstBalance;

    // ************************** //
    // *** EXTERNAL CONTRACTS *** //
    // ************************** //

    // IBlitmap blitmap = IBlitmap(0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63);
    // TODO this is for the testnet, above is mainnet!
    IBlitmap blitmap = IBlitmap(0xB11885A98F09d2bFDF966832A6fAC83569052c6c);
    IExquisiteGraphics gfx =
        IExquisiteGraphics(payable(0xDf01A4040493B514605392620B3a0a05Eb8Cd295));
    IERC1155 xqstGenesis = IERC1155(0xe1a2C5b67E595Bb672bC6b03Ecd731881c158A89);

    // ************** //
    // *** ERRORS *** //
    // ************** //

    error InvalidTokenID();
    error InvalidPalette();
    error MaxPainted();
    error AlreadyClaimedDiscount();
    error NotDiscountEligible();

    // ****************** //
    // *** INITIALIZE *** //
    // ****************** //

    // TODO swap this out to have some custom logic to give to creators
    constructor() ERC721Base("Paintmap", "PAINT", 0.1 ether, 1_600) {
        // go through all of the palettes of blitmaps, ensure they cant be used.
        for (uint256 i = 0; i < 100; i++) {
            bytes12 colors;
            bytes memory data = blitmap.tokenDataOf(i);
            // read color from data, and store it
            assembly {
                // offset by 32 and read the first 12 bytes.
                // the first 32 bytes of `data` is `data.length`
                colors := mload(add(data, 32))
            }
            // add to mapping
            invalidPalettes[colors] = true;
        }

        // transfer ownership to cj? hw wallet? TODO
    }

    // ************ //
    // *** MINT *** //
    // ************ //

    function mintDiscount(uint256 originalTokenID, bytes12 colors)
        external
        payable
    {
        // if the wrong amount has sent
        if (msg.value != DISCOUNT_MINT_PRICE) revert WrongPayment();

        // if the sender has claimed already
        if (claimedDiscount[msg.sender]) revert AlreadyClaimedDiscount();

        // not eligible for discount
        if (xqstGenesis.balanceOf(msg.sender, 0) == 0)
            revert NotDiscountEligible();

        // store the painting
        _storePainting(originalTokenID, colors);

        // allocate the mint fund accordingly
        address originalArtist = blitmap.tokenCreatorOf(originalTokenID);
        artistBalance[originalArtist] += DISCOUNT_MINT_PRICE;

        // set the sender to have claimed
        claimedDiscount[msg.sender] = true;

        _mint(msg.sender);
    }

    function mint(uint256 originalTokenID, bytes12 colors) external payable {
        // if the wrong amount has sent
        if (msg.value != MINT_PRICE) revert WrongPayment();

        // store the painting
        _storePainting(originalTokenID, colors);

        // allocate the mint fund accordingly
        address originalArtist = blitmap.tokenCreatorOf(originalTokenID);
        artistBalance[originalArtist] += .06 ether;
        xqstBalance += 0.02 ether;
        ownerBalance += 0.02 ether;

        _mint(msg.sender);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        // if tokenid is past max
        if (tokenId > _nextTokenId()) revert InvalidTokenID();

        PaintedBlitmap memory token = paintings[tokenId];

        // get the color palette and slice together all the info
        bytes memory blitmapData = blitmap.tokenDataOf(token.originalTokenID);

        // naively overwrite the first 12 bytes with the real colors
        for (uint256 i = 0; i < 12; i++) {
            blitmapData[i] = token.colors[i];
        }

        string memory blitmapName = blitmap.tokenNameOf(token.originalTokenID);
        string memory painterENS = "cjpais.eth";
        // string memory painterENS = ENSNameResolver.getENSName(token.painter);

        bytes memory imageData = abi.encodePacked(XQST_GFX_HEADER, blitmapData);
        string memory encodedSVG = Base64.encode(bytes(gfx.draw(imageData)));
        string memory metadata = string.concat(
            '{"name":"#',
            toString(token.originalTokenID),
            " - Painted ",
            blitmapName,
            '","description":"A ',
            blitmapName,
            " Blitmap painted by [",
            painterENS,
            "](https://etherscan.io/address/",
            painterENS,
            '). All data is completely on chain.",',
            _getAttributes(token, blitmapName, painterENS, blitmapData),
            '"image": "data:image/svg+xml;base64,',
            encodedSVG,
            '"}'
        );

        return
            string.concat(
                "data:application/json;base64,",
                Base64.encode(bytes(metadata))
            );
    }

    // *************************** //
    // *** WIDTHDRAW FUNCTIONS *** //
    // *************************** //

    // withdraw artist
    function withdrawArtist(address artist) external {
        require(artistBalance[artist] > 0);
        (bool sent, ) = artist.call{value: ownerBalance}("");
        require(sent, "Failed to withdraw");
    }

    // withdraw owner
    function withdrawOwner() external {
        require(ownerBalance > 0, "Zero balance");
        (bool sent, ) = owner().call{value: ownerBalance}("");
        require(sent, "Failed to withdraw");
    }

    // withdraw xqstgfx
    function withdrawExquisiteGraphics() external {
        require(xqstBalance > 0, "Zero balance");
        gfx.ty{value: xqstBalance}();
    }

    // ************************* //
    // *** INTERNAL FUNCTION *** //
    // ************************* //

    function _storePainting(uint256 originalTokenID, bytes12 colors) internal {
        // if tokenIsOriginal then we are good to go!
        if (!blitmap.tokenIsOriginal(originalTokenID)) revert InvalidTokenID();

        // if the first 12 bytes match any colors then throw error
        if (invalidPalettes[colors]) revert InvalidPalette();

        // each original can be painted 16 times
        if (numPainted[originalTokenID] > MAX_NUM_VARIANTS) revert MaxPainted();

        PaintedBlitmap storage painting = paintings[_nextTokenId()];
        painting.originalTokenID = originalTokenID;
        painting.colors = colors;

        numPainted[originalTokenID]++;
        invalidPalettes[colors] = true;
    }

    function _getAttributes(
        PaintedBlitmap memory token,
        string memory blitmapName,
        string memory painterENS,
        bytes memory data
    ) internal pure returns (string memory) {
        // TODO get the slabs right, reivew okpc
        string[4] memory slabs = BlitmapAnalysis.tokenSlabsOf(data);

        string memory attributes = string.concat(
            '"attributes":[{"trait_type":"Type","value":"Painted"},{"trait_type":"Composition","value":"',
            blitmapName,
            " (#",
            toString(token.originalTokenID),
            ')"},{"trait_type":"Painter","value":"',
            painterENS,
            '"},{"trait_type":"Affinity","value":"',
            _getAffinity(data),
            '"},{"trait_type":"Slabs","value":"',
            string.concat(
                slabs[0],
                " ",
                slabs[1],
                " ",
                slabs[2],
                " ",
                slabs[3]
            ),
            '"}],'
        );

        return attributes;
    }

    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT license
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function _getAffinity(bytes memory data)
        internal
        pure
        returns (string memory)
    {
        string[3] memory affinity = BlitmapAnalysis.tokenAffinityOf(data);

        if (bytes(affinity[2]).length != 0) {
            return
                string.concat(affinity[0], " ", affinity[1], " ", affinity[2]);
        } else if (bytes(affinity[1]).length != 0) {
            return string.concat(affinity[0], " ", affinity[1]);
        }

        return affinity[0];
    }
}
