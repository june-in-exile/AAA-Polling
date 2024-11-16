require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: "media quit flower sword interest nominee merit answer science drift nothing borrow",
      },
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_PROJECT_ID}`,
      account: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};