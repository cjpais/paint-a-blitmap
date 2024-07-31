// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {Solenv} from "solenv/Solenv.sol";
import {Paintmap} from "../Paintmap.sol";

contract DeployPaintmap is Script {
    // Deployable contracts
    Paintmap public paintmapContract;

    function run() public {
        // Deployment config from .env.local file
        Solenv.config(".env.local");

        vm.startBroadcast();
        paintmapContract = new Paintmap();

        vm.stopBroadcast();
    }
}
