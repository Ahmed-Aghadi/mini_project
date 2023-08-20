// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC1155TokenReceiver} from "solmate/tokens/ERC1155.sol";
import "openzeppelin/token/ERC1155/IERC1155.sol";
import "openzeppelin/metatx/ERC2771Context.sol";

contract Faucet is ERC2771Context {
    constructor(address trustedForwarder) ERC2771Context(trustedForwarder) {}

    function getToken(address tokenAddress, uint256 tokenId) public {
        IERC1155(tokenAddress).safeTransferFrom(
            address(this),
            _msgSender(),
            tokenId,
            10,
            ""
        );
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public virtual returns (bytes4) {
        return ERC1155TokenReceiver.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public virtual returns (bytes4) {
        return ERC1155TokenReceiver.onERC1155BatchReceived.selector;
    }
}
