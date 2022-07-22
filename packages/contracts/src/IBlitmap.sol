/*
______ _     _____ _____ 
| ___ \ |   |_   _|_   _|
| |_/ / |     | |   | |  
| ___ \ |     | |   | |  
| |_/ / |_____| |_  | |  
\____/\_____/\___/  \_/                     
___  ___  ___  ______    
|  \/  | / _ \ | ___ \   
| .  . |/ /_\ \| |_/ /   
| |\/| ||  _  ||  __/    
| |  | || | | || |       
\_|  |_/\_| |_/\_|       

by dom hofmann and friends
*/

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IBlitmap {
    function creatorNameOf(address _address)
        external
        view
        returns (string memory);

    function tokenNameOf(uint256 tokenId) external view returns (string memory);

    function tokenIsOriginal(uint256 tokenId) external view returns (bool);

    function tokenCreatorOf(uint256 tokenId) external view returns (address);

    function tokenCreatorNameOf(uint256 tokenId)
        external
        view
        returns (string memory);

    function tokenDataOf(uint256 tokenId) external view returns (bytes memory);

    function tokenSlabsOf(uint256 tokenId)
        external
        view
        returns (string[4] memory);

    function tokenAffinityOf(uint256 tokenId)
        external
        view
        returns (string[3] memory);
}
