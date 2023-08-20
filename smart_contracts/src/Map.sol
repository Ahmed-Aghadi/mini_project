// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// import "solmate/tokens/ERC721.sol";
import "openzeppelin/token/ERC721/ERC721.sol";
// import "solmate/tokens/ERC1155.sol";
import "openzeppelin/token/ERC1155/IERC1155.sol";
import "solmate/utils/LibString.sol";
// import "solmate/auth/Owned.sol";

import {ERC1155TokenReceiver} from "solmate/tokens/ERC1155.sol";

import "openzeppelin/metatx/ERC2771Context.sol";

error ZeroSize();
error ZeroPerSize();
error SizeNotDivisibleByPerSize();
error InvalidXIndex();
error InvalidYIndex();
error LandAlreadyOwned();
error NotOwner();

error InvalidLength();

contract Map is ERC2771Context, ERC721 {
    // // rectangular land with coordinates of corners as (x,y), (x,y+perSize), (x+perSize,y), (x+perSize,y+perSize)
    struct Land {
        uint256 xIndex;
        uint256 yIndex;
    }
    uint256 public size;
    uint256 public perSize;
    uint256 public landCount;
    string public baseUri;
    uint256 public utilCount;
    address public utilsAddress;

    // x/perSize,y/perSize to LandId
    // [ (x/perSize,y/perSize) to LandId ] of rectangular land with coordinates of corners as (x,y), (x,y+perSize), (x+perSize,y), (x+perSize,y+perSize)
    mapping(uint256 => mapping(uint256 => uint256)) public landIds;
    // mapping of LandId to Land (xIndex, yIndex)
    mapping(uint256 => Land) public land;

    // x,y to utilId
    mapping(uint256 => mapping(uint256 => uint256)) public map;

    constructor(
        uint256 _size,
        uint256 _perSize,
        string memory _baseUri,
        address _utilsAddress,
        address trustedForwarder
    ) ERC2771Context(trustedForwarder) ERC721("Map", "MAP") {
        if (_size == 0) revert ZeroSize();
        if (_perSize == 0) revert ZeroPerSize();
        size = _size;
        perSize = _perSize;
        if (_size % perSize != 0) revert SizeNotDivisibleByPerSize();
        baseUri = _baseUri;
        utilsAddress = _utilsAddress;
    }

    function mint(uint256 xIndex, uint256 yIndex) public returns (uint256) {
        if (xIndex >= size / perSize) revert InvalidXIndex();
        if (yIndex >= size / perSize) revert InvalidYIndex();
        if (landIds[xIndex][yIndex] != 0) revert LandAlreadyOwned();
        landCount += 1;
        // land[id] = Land(x, y);
        landIds[xIndex][yIndex] = landCount;
        land[landCount] = Land(xIndex, yIndex);
        _mint(_msgSender(), landCount);
        return landCount;
    }

    function placeItem(uint256 x, uint256 y, uint256 utilId) public {
        if (_msgSender() != ownerOf(landIds[x / perSize][y / perSize]))
            revert NotOwner();
        IERC1155 utils = IERC1155(utilsAddress);
        if (map[x][y] != 0) {
            utils.safeTransferFrom(
                address(this),
                _msgSender(),
                map[x][y],
                1,
                ""
            );
        }
        utils.safeTransferFrom(_msgSender(), address(this), utilId, 1, "");
        map[x][y] = utilId;
    }

    function removeItem(uint256 x, uint256 y) public {
        if (_msgSender() != ownerOf(landIds[x / perSize][y / perSize]))
            revert NotOwner();
        IERC1155 utils = IERC1155(utilsAddress);
        if (map[x][y] != 0) {
            utils.safeTransferFrom(
                address(this),
                _msgSender(),
                map[x][y],
                1,
                ""
            );
        }
        map[x][y] = 0;
    }

    function updateItem(uint256 x, uint256 y, uint256 utilId) public {
        if (utilId == 0) {
            removeItem(x, y);
        } else {
            placeItem(x, y, utilId);
        }
    }

    function placeItems(
        uint256[] memory x,
        uint256[] memory y,
        uint256[] memory utilId
    ) public {
        if (x.length != y.length) revert InvalidLength();
        if (x.length != utilId.length) revert InvalidLength();
        for (uint256 i = 0; i < x.length; i++) {
            placeItem(x[i], y[i], utilId[i]);
        }
    }

    function updateItems(
        uint256[] memory x,
        uint256[] memory y,
        uint256[] memory utilId
    ) public {
        if (x.length != y.length) revert InvalidLength();
        if (x.length != utilId.length) revert InvalidLength();
        for (uint256 i = 0; i < x.length; i++) {
            updateItem(x[i], y[i], utilId[i]);
        }
    }

    function tokenURI(
        uint256 id
    ) public view virtual override returns (string memory) {
        return string.concat(baseUri, LibString.toString(id));
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
