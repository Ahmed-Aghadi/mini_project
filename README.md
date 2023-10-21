BuildIt is a metaverse project. It provides users with the ability to own virtual land within a map, place items on the land they own, and even sell the land to other users. The land is represented as ERC721 tokens, while the items are represented as ERC1155 tokens. All interactions within the metaverse are secured by smart contracts.

## Pre-requisites

You should have `Unity`, `npm`, `forge` and `foundry` installed.

## Installation

### Backend

Go to `backend` folder and install dependencies

```bash
cd backend/
npm install
```

To run the project:

```bash
npm run dev
```

Visit `localhost:3000` to run the backend api access point.

### Unity Project

Go to `client` folder.

```bash
cd client/
```

Open the `client` folder in Unity. Build the project and save build files in `frontend/public` directory.

### Frontend

Go to `frontend` folder and install dependencies

```bash
cd frontend/
npm install
```

To run the project:

```bash
npm run dev
```

Visit `localhost:3000` to play the game.

### Smart Contracts

Go to `smart_contracts` folder and install foundry and hardhat.

```bash
cd smart_contracts/
forge init
npm install
```

To compile smart contracts:

```bash
forge compile --skip test --skip script

# Or If you want to compile test files

forge compile --via-ir
```

To run test on smart contracts:

```bash
forge test --via-ir
```

To deploy smart contracts:

```bash
npx hardhat deploy --network $ChainName

# example: npx hardhat deploy --network bscTestnet
```

Note: Don't forget to make .env file, refer .env.example file.

## Android APK

[Download apk file for Android](https://drive.google.com/drive/folders/1koUt3GFjGn5jITEy1MgrMTs4LI_h77DB?usp=sharing)

Website can also be used which is build for webgl and will works on both desktop and mobile.

## Smart Contracts ( BSC Testnet )

| Contract                                                                                                             | Explorer Link                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [Map.sol](https://github.com/Ahmed-Aghadi/BuildIt-cross-chain/blob/main/smart_contracts/src/Map.sol)                 | [0x9574E60E8aBeb8062CD3DCC3ed7714E067768a72](https://testnet.bscscan.com/address/0x9574E60E8aBeb8062CD3DCC3ed7714E067768a72) |
| [Utils.sol](https://github.com/Ahmed-Aghadi/BuildIt-cross-chain/blob/main/smart_contracts/src/Utils.sol)             | [0x2e4dDe518EB8B63C47D388aa129386d9ca110a45](https://testnet.bscscan.com/address/0x2e4dDe518EB8B63C47D388aa129386d9ca110a45) |
| [Faucet.sol](https://github.com/Ahmed-Aghadi/BuildIt-cross-chain/blob/main/smart_contracts/src/Faucet.sol)           | [0x816d0366156F406069223D5E454Ab8c98E6D4440](https://testnet.bscscan.com/address/0x816d0366156F406069223D5E454Ab8c98E6D4440) |
| [Marketplace.sol](https://github.com/Ahmed-Aghadi/BuildIt-cross-chain/blob/main/smart_contracts/src/Marketplace.sol) | [0xB20CDCaF8636Efee0730Ac5fe37842afA13909e6](https://testnet.bscscan.com/address/0xB20CDCaF8636Efee0730Ac5fe37842afA13909e6) |
| [Forwarder.sol](https://github.com/Ahmed-Aghadi/BuildIt-cross-chain/blob/main/smart_contracts/src/Forwarder.sol)     | [0xC07DdbA94611C33882612b8031b2a6AfB65ca545](https://testnet.bscscan.com/address/0xC07DdbA94611C33882612b8031b2a6AfB65ca545) |

## Smart Contracts ( OPBNB Testnet )

| Contract                                                                                                             | Explorer Link                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [Map.sol](https://github.com/Ahmed-Aghadi/BuildIt-cross-chain/blob/main/smart_contracts/src/Map.sol)                 | [0xdf78d5a57dcff31ca18978b56760867010aebc2e](https://opbnb-testnet.bscscan.com/address/0xdf78d5a57dcff31ca18978b56760867010aebc2e) |
| [Utils.sol](https://github.com/Ahmed-Aghadi/BuildIt-cross-chain/blob/main/smart_contracts/src/Utils.sol)             | [0x11da0f57086a19977e46b548b64166411d839a30](https://opbnb-testnet.bscscan.com/address/0x11da0f57086a19977e46b548b64166411d839a30) |
| [Faucet.sol](https://github.com/Ahmed-Aghadi/BuildIt-cross-chain/blob/main/smart_contracts/src/Faucet.sol)           | [0x76cfdE04F691B93c9993Be24d5FE7667E7A8782C](https://opbnb-testnet.bscscan.com/address/0x76cfdE04F691B93c9993Be24d5FE7667E7A8782C) |
| [Marketplace.sol](https://github.com/Ahmed-Aghadi/BuildIt-cross-chain/blob/main/smart_contracts/src/Marketplace.sol) | [0x489d47E592639Ba11107E84dd6CCA08F0892E27d](https://opbnb-testnet.bscscan.com/address/0x489d47E592639Ba11107E84dd6CCA08F0892E27d) |
| [Forwarder.sol](https://github.com/Ahmed-Aghadi/BuildIt-cross-chain/blob/main/smart_contracts/src/Forwarder.sol)     | [0xCA34FF4068f042203087D475805c4DD8347cE958](https://opbnb-testnet.bscscan.com/address/0xCA34FF4068f042203087D475805c4DD8347cE958) |

## Table of Contents

- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [How We Built It](#how-we-built-it)
- [Challenges We Ran Into](#challenges-we-ran-into)
- [Accomplishments That We're Proud Of](#accomplishments-that-were-proud-of)
- [What We Learned](#what-we-learned)
- [What's Next for BuildIt](#whats-next-for-buildit)

## Inspiration

The inspiration behind BuildIt comes from the desire to create an immersive metaverse experience where users can explore, own, and customize virtual land. We wanted to empower users to express their creativity and engage with a virtual world where they have control over their own unique space.

## What It Does

BuildIt allows users to:

- Own virtual land within a map represented as ERC721 tokens.
- Place items on their owned land, such as buildings, roads, and other structures, represented as ERC1155 tokens.
- Sell their land to other users, transferring ownership and associated items.
- Connect their wallets (e.g., Metamask, Coinbase, WalletConnect) to interact with the metaverse.

When a user connects their wallet, the game fetches data from the smart contracts and highlights the portion of the map that the user owns. Users can then click the "Edit" button to place or remove items on their land. They have the option to cancel or confirm the changes, which updates the items in the appropriate locations. Smart contract checks ensure that users can only interact with the land they own.

In addition, BuildIt includes a marketplace where users can sell their land through direct listings or auctions. Chainlink automation can be utilized for auction listings, and if the chain supports Chainlink price feeds, the land can be sold in USD. The marketplace provides an easy and secure way for users to trade their land.

Also, users can transfer their util items from one chain to another ( using Axelar )

While editing the map, user can also save/load private designs which is saved using sprucekit.

In marketplace listing, if seller owns an ENS account then it will display it so that it add more credibility about seller.

## How We Built It

BuildIt was built using the following technologies and tools:

- Unity: The game was developed using Unity and built for Webgl.
- Smart Contracts: Five smart contracts were developed using Foundry and Hardhat:
  - Map Contract: Responsible for the Lands in the Map, implemented as an ERC721 contract.
  - Utils Contract: Represents the items that can be placed on the land, implemented as an ERC1155 contract.
  - Faucet Contract: Allows users to obtain items for free initially. It is funded to provide items for judges and other participants.
  - Marketplace Contract: Facilitates land sales through direct listings and auctions.
  - Forwarder Contract: As all contracts implements ERC2771 context, Forwarder is used to provide gasless transactions for users.
- Map Size: The map size is determined in the smart contract, allowing the deployment of multiple maps with different sizes. The current deployment consists of a map with a size of 15 by 15 tiles, where each land is a 5 by 5 tile.
- Item Minting: Three items are minted in the Utils contract: road, house, and special item.
- Wallet Integration: Users can connect their wallets, such as Metamask, Coinbase, and WalletConnect, to interact with the metaverse.
- Gasless Transactions: All smart contracts implement ERC2771Context, enabling users to perform gasless transactions when the relayer is funded.
- Axelar was used facilitate cross chain transfer of util items from one chain to another
- Sprucekit was used to let User Save/Load private designs
- ENS was used to resolve custom name for users in marketplace

## Challenges We Ran Into

During the development of BuildIt, we encountered several challenges, including:

- Integrating Unity with the blockchain and ensuring secure and efficient interactions between the game and smart contracts.
- Implementing ERC721 and ERC1155 token standards and handling the transfer of ownership between users and their land/items.
- Optimizing gas usage and transaction costs in smart contract deployments.
- Developing a user-friendly interface and seamless wallet integration for a smooth user experience.
- Sprucekit sdk was mainly for Reactjs project, so to pass message between game build for wasm to Reactjs was challenging.

## Accomplishments That We're Proud Of

Throughout the development process, we achieved several accomplishments that we're proud of, including:

- Successfully integrating the Unity game engine with the Blockchain and smart contracts.
- Creating a metaverse where users can own virtual land and customize it with various items.
- Implementing a marketplace where users can buy and sell land securely through direct listings and auctions.
- Enabling gasless transactions for users by implementing ERC2771Context in all smart contracts.
- Conducting comprehensive testing, including fuzz testing, to ensure the stability and reliability of the application.

## What We Learned

The development of BuildIt provided us with valuable learning experiences, including:

- Gaining in-depth knowledge of integrating smart contracts with Unity.
- Understanding the intricacies of token standards like ERC721 and ERC1155.
- Optimizing gas usage and transaction costs in smart contract deployments.
- Enhancing user experience through seamless wallet integration and fetching data from smart contracts.

## What's Next for BuildIt

BuildIt is an ongoing project, and we have exciting plans testnet.bscscan.com

- Adding multiple maps with different sizes to expand the metaverse and accommodate more users.
- Conducting further research on gasless transactions to reduce transaction costs and improve user experience.
- Exploring cross-chain integrations to enable interoperability with other blockchain platforms.
- Enhancing the variety of items and customizations available to users.
- Engaging with the community to gather feedback and implement new features based on user suggestions.

We are dedicated to continuously improving and expanding BuildIt to create a vibrant and immersive metaverse experience for all users.
