//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

interface IReverseRegistrar {
    function node(address addr) external view returns (bytes32);
}

interface IReverseResolver {
    function name(bytes32 node) external view returns (string memory);
}

contract ENSNameResolver {
    IReverseRegistrar constant registrar =
        IReverseRegistrar(0x084b1c3C81545d370f3634392De611CaaBFf8148);
    IReverseResolver constant resolver =
        IReverseResolver(0xA2C122BE93b0074270ebeE7f6b7292C7deB45047);

    function getENSName(address addr) public view returns (string memory) {
        // TODO chain id for testnet?
        // will need to as well for blitmap and xqst genesis i guess for real test...
        try resolver.name(registrar.node(addr)) {
            return resolver.name(registrar.node(addr));
        } catch {
            return toAsciiString(addr);
        }
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint256 i; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}
