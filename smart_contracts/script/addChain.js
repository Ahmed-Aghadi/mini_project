const { ethers, network } = require("hardhat");
const hre = require("hardhat");

// Run: npx hardhat run script/addChain.js --network sourceChain
// Example: npx hardhat run script/addChain.js --network arbitrumGoerli
// you can get sourceChain from hardhat.config.js
async function addChain() {
  accounts = await hre.ethers.getSigners();
  deployer = accounts[0];
  const chainId = network.config.chainId;
  console.log("Chain ID : " + chainId);
  console.log("Creating Utils contract");
  const utilsContractFactory = await hre.ethers.getContractFactory("Utils");

  const mumbaiName = "Polygon";
  const fantomTestnetName = "Fantom";
  const arbitrumGoerliName = "arbitrum";
  const bscTestnetName = "binance";

  const mumbaiAddress = "0x1e32B261781Ed5aD7dA316f61074864De0a88eC7";
  const fantomTestnetAddress = "0x8E10a436eafE80B2388D56e8Bb4435C31C930dbf";
  const arbitrumGoerliAddress = "0x4A4e6Cc94507B6aD2c91aD765d3f5B566B15d895";
  const bscTestnetAddress = "0x2e4dDe518EB8B63C47D388aa129386d9ca110a45";

  const mumbai = {
    chainName: mumbaiName,
    chainAddress: mumbaiAddress,
  };
  const fantomTestnet = {
    chainName: fantomTestnetName,
    chainAddress: fantomTestnetAddress,
  };
  const arbitrumGoerli = {
    chainName: arbitrumGoerliName,
    chainAddress: arbitrumGoerliAddress,
  };
  const bscTestnet = {
    chainName: bscTestnetName,
    chainAddress: bscTestnetAddress,
  };

  const addresses = {
    source: {
      ...bscTestnet,
    },
    destination: {
      ...mumbai,
    },
  };

  const utilsContract = await utilsContractFactory.attach(
    addresses.source.chainAddress
  );

  console.log("Utils contract created");
  console.log("Connecting user to Utils contract");
  const utils = await utilsContract.connect(deployer);
  console.log("User connected to Utils contract");
  const tx = await utils.setChain(
    addresses.destination.chainName,
    addresses.destination.chainAddress
  );

  console.log("----------------------------------");
  console.log(tx);
  const response = await tx.wait();
  console.log("----------------------------------");
  console.log(response);
  // console.log("address of entry : " + response.events[0].data)
}

addChain()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
