// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// import "solmate/tokens/ERC1155.sol";
import {ERC1155} from "openzeppelin/token/ERC1155/ERC1155.sol";
import "solmate/utils/LibString.sol";
// import "solmate/auth/Owned.sol";
import "openzeppelin/access/Ownable.sol";
import "openzeppelin/metatx/ERC2771Context.sol";
import {AxelarExecutable} from "./axelar/AxelarExecutable.sol";
import {IAxelarGasService} from "./axelar/interfaces/IAxelarGasService.sol";

contract Utils is ERC2771Context, ERC1155, Ownable, AxelarExecutable {
    error CrossChainNotSupported();
    error InvalidChain();
    error InsufficientBalance();
    string public baseUri;
    uint256 public utilCount;
    IAxelarGasService public immutable gasService;
    mapping(string => string) public chains;

    modifier supportCrossChain() {
        if (address(gasService) == address(0)) {
            revert CrossChainNotSupported();
        }
        _;
    }

    constructor(
        string memory _baseUri,
        address trustedForwarder,
        address gateway_,
        address gasReceiver_
    )
        ERC2771Context(trustedForwarder)
        ERC1155(_baseUri)
        AxelarExecutable(gateway_)
    {
        baseUri = _baseUri;
        gasService = IAxelarGasService(gasReceiver_);
    }

    function setChain(
        string memory chain,
        string calldata addr
    ) public onlyOwner {
        chains[chain] = addr;
    }

    function crossChainTransfer(
        string calldata destinationChain,
        uint tokenId,
        uint amount
    ) public payable supportCrossChain {
        string memory destinationAddress = chains[destinationChain];
        if (bytes(destinationAddress).length == 0) {
            revert InvalidChain();
        }
        if (amount > balanceOf(_msgSender(), tokenId)) {
            revert InsufficientBalance();
        }
        _burn(_msgSender(), tokenId, amount);
        bytes memory payload = abi.encode(tokenId, amount, _msgSender());
        if (msg.value > 0) {
            gasService.payNativeGasForContractCall{value: msg.value}(
                address(this),
                destinationChain,
                destinationAddress,
                payload,
                msg.sender
            );
        }
        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    function _execute(
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload
    ) internal override supportCrossChain {
        if (
            keccak256(abi.encodePacked(chains[sourceChain])) !=
            keccak256(abi.encodePacked(sourceAddress))
        ) {
            revert InvalidChain();
        }
        (uint tokenId, uint amount, address sender) = abi.decode(
            payload,
            (uint, uint, address)
        );
        _mint(sender, tokenId, amount, "");
    }

    function mintMore(uint id, uint amount) public onlyOwner {
        _mint(_msgSender(), id, amount, "");
    }

    function mint(uint256 amount) public onlyOwner {
        utilCount += 1;
        _mint(_msgSender(), utilCount, amount, "");
    }

    function uri(
        uint256 id
    ) public view virtual override returns (string memory) {
        return string(abi.encodePacked(baseUri, LibString.toString(id)));
    }

    function _msgSender()
        internal
        view
        virtual
        override(Context, ERC2771Context)
        returns (address sender)
    {
        return ERC2771Context._msgSender();
    }

    function _msgData()
        internal
        view
        virtual
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }
}
