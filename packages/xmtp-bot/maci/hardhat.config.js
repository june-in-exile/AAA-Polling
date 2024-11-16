require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

module.exports = {
  defaultNetwork: "sepolia",
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: process.env.ETH_PROVIDER,
      account: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 11155111,
    },
    // hardhat: {
    //   accounts: {
    //     mnemonic: "media quit flower sword interest nominee merit answer science drift nothing borrow",
    //   },
    // },
  },
};


