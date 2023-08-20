// Import the libraries and load the environment variables.
const { SDK, Auth, TEMPLATES, Metadata } = require("@infura/sdk");
require("dotenv").config();

// Create Auth object
const auth = new Auth({
  projectId: process.env.INFURA_API_KEY,
  secretId: process.env.INFURA_API_KEY_SECRET,
  privateKey: process.env.WALLET_PRIVATE_KEY,
  chainId: 80001,
});

const utilsBaseURI = "https://www.example.com/utils/";

// Instantiate SDK
const sdk = new SDK(auth);
let cursor = null;
const getCollectionsByWallet = async (walletAddress) => {
  if (cursor) {
    const result = await sdk.api.getCollectionsByWallet({
      walletAddress: walletAddress,
      cursor: cursor,
    });
    cursor = result.cursor;
    console.log("collections Cursor: " + result.pageNumber, {
      ...result,
      collections: [
        ...result.collections.filter((collection, index) => index < 5),
      ],
    });
  } else {
    const result = await sdk.api.getCollectionsByWallet({
      walletAddress: walletAddress,
    });
    cursor = result.cursor;
    console.log("collections:", {
      ...result,
      collections: [
        ...result.collections.filter((collection, index) => index < 5),
      ],
    });
  }
};

(async () => {
  //   try {
  //     await getCollectionsByWallet("0x0de82DCC40B8468639251b089f8b4A4400022e04");
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   try {
  //     await getCollectionsByWallet("0x0de82DCC40B8468639251b089f8b4A4400022e04");
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   try {
  //     await getCollectionsByWallet("0x0de82DCC40B8468639251b089f8b4A4400022e04");
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   try {
  //     await getCollectionsByWallet("0x0de82DCC40B8468639251b089f8b4A4400022e04");
  //   } catch (error) {
  //     console.log(error);
  //   }
  try {
    const utilsContractERC1155 = await sdk.deploy({
      template: TEMPLATES.ERC1155Mintable,
      params: {
        baseURI: utilsBaseURI,
        contractURI: utilsBaseURI,
        ids: [1, 2, 3],
      },
    });

    console.log("Contract: ", utilsContractERC1155.contractAddress);
  } catch (error) {
    console.log(error);
  }
})();
