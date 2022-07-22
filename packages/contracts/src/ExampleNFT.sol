// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import {ERC721Base} from "./ERC721Base.sol";
import {IBlitmap} from "./IBlitmap.sol";
import {IExquisiteGraphics} from "./IExquisiteGraphics.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

import "forge-std/console.sol";

/// @author frolic.eth
/// @title  Example NFT
contract ExampleNFT is ERC721Base {
    // TODO optimize the struct for mint cost
    struct PaintedBlitmap {
        uint256 originalTokenID;
        bytes12 colors;
    }

    uint256 public constant NUM_CUSTOM = 10;
    bytes8 public constant XQST_GFX_HEADER = hex"0120200004000000";

    mapping(uint256 => PaintedBlitmap) paintings;
    mapping(uint256 => uint256) numPainted;
    mapping(bytes12 => bool) invalidPalettes;

    IBlitmap blitmap = IBlitmap(0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63);
    IExquisiteGraphics gfx =
        IExquisiteGraphics(payable(0xDf01A4040493B514605392620B3a0a05Eb8Cd295));

    error InvalidTokenID();
    error InvalidPalette();
    error MaxPainted();

    // ****************** //
    // *** INITIALIZE *** //
    // ****************** //

    // TODO swap this out to have some custom logic to give to creators
    constructor() ERC721Base("Example NFT", "EXAMPLE", 0.1 ether, 1_000) {
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
    }

    // ************ //
    // *** MINT *** //
    // ************ //

    function mint(uint256 originalTokenID, bytes12 colors)
        external
        payable
        hasExactPayment(1)
    {
        // if tokenIsOriginal then we are good to go!
        if (!blitmap.tokenIsOriginal(originalTokenID)) revert InvalidTokenID();

        // if the first 12 bytes match any colors then throw error
        if (invalidPalettes[colors]) revert InvalidPalette();

        // each original can be painted 10 times
        if (numPainted[originalTokenID] > NUM_CUSTOM) revert MaxPainted();

        // get the creator address tokenCreatorOf.
        // TODO use this to set where to send funds
        address originalArtist = blitmap.tokenCreatorOf(originalTokenID);

        PaintedBlitmap storage painting = paintings[_nextTokenId()];
        painting.originalTokenID = originalTokenID;
        painting.colors = colors;

        numPainted[originalTokenID]++;
        invalidPalettes[colors] = true;
        _mint(msg.sender, 1);
    }

    // function svg(uint256 tokenId) public view returns (string memory) {}

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

        bytes memory imageData = abi.encodePacked(XQST_GFX_HEADER, blitmapData);
        string memory encodedSVG = Base64.encode(bytes(gfx.draw(imageData)));
        string memory metadata = string.concat(
            "data:application/json,",
            "%7B%22name%22:%20%22Paint%20A%20Blitmap",
            "%22,%20%22description%22:%20%22An%20SVG%20-%2064x64%20in%20256%20Colors.%20This%20is%20one%20of%20the%20toughest%20images%20for%20Exquisite%20Graphics%20to%20render.%20It%20ensures%20that%20anyone%20will%20be%20able%20to%20render%20high%20resolution%20on-chain%20art%20with%20Exquisite%20Graphics.%22",
            ",%20%22attributes%22:%20%5B%7B%22trait_type%22:%22Width%22,%20%22value%22:%2264%22%7D,%7B%22trait_type%22:%22Height%22,%20%22value%22:%2264%22%7D,%20%7B%22trait_type%22:%22Colors%22,%20%22value%22:%22256%22%7D,%20%7B%22trait_type%22:%22Number%20of%20Pixels%22,%20%22value%22:%224096%22%7D%5D",
            ",%20%22image%22:%20%22data:image/svg+xml;base64,",
            encodedSVG,
            "%22%7D"
        );

        return metadata;
    }

    function updateExquisiteGraphics(address _gfx) public onlyOwner {
        gfx = IExquisiteGraphics(payable(_gfx));
    }

    /* -------------------------------------------------------------------------- */
    /*                            INTERNAL FUNCTIONS                              */
    /* -------------------------------------------------------------------------- */

    // function tokenURI();

    // function tokenURI(tokenId) ;

    // get the data and slice in the new colors (these are sent as bytes directly)
    // after this render it out
    // add exquisite graphics header + sliced in colors + data
}
