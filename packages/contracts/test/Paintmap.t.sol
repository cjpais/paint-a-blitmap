// SPDX-License-Identifier: CC0-1.0
pragma solidity >=0.8.10 <0.9.0;

import "forge-std/Test.sol";
import "../src/Paintmap.sol";
import "../src/IRenderer.sol";

contract PaintmapTest is Test {
    Paintmap private nft;

    address private owner =
        vm.addr(uint256(keccak256(abi.encodePacked("owner"))));
    address private minter =
        vm.addr(uint256(keccak256(abi.encodePacked("minter"))));
    address private cj = address(0xD286064cc27514B914BAB0F2FaD2E1a89A91F314);

    function setUp() public {
        nft = new Paintmap();
        nft.transferOwnership(owner);
        vm.deal(owner, 10 ether);
        vm.deal(minter, 10 ether);
        vm.deal(cj, 10 ether);
    }

    function testMint() public {
        assertEq(nft.balanceOf(minter), 0);

        vm.expectRevert(ERC721Base.WrongPayment.selector);
        nft.mint{value: 1 ether}(1, bytes12(hex"e44f9cc9338493005874003f"));

        vm.prank(minter);
        nft.mint{value: 0.1 ether}(0, bytes12(hex"e44f9cc9338493005874003f"));
        assertEq(nft.balanceOf(minter), 1);

        console.log(nft.tokenURI(1));
    }

    function testMintDiscount() public {
        vm.prank(cj);
        vm.expectRevert(ERC721Base.WrongPayment.selector);
        nft.mintDiscount{value: .1 ether}(
            0,
            bytes12(hex"e44f9cc9338493005874003a")
        );

        vm.prank(minter);
        vm.expectRevert(Paintmap.NotDiscountEligible.selector);
        nft.mintDiscount{value: .032 ether}(
            0,
            bytes12(hex"e44f9cc9338493005874003a")
        );

        vm.prank(cj);
        nft.mintDiscount{value: .032 ether}(
            0,
            bytes12(hex"e44f9cc9338493005874003a")
        );

        vm.prank(cj);
        vm.expectRevert(Paintmap.AlreadyClaimedDiscount.selector);
        nft.mintDiscount{value: .032 ether}(
            0,
            bytes12(hex"e44f9cc9338493005874003f")
        );
    }
}
