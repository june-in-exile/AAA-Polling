const cli = require("maci-cli");
const fs = require('fs');
const path = require('path');
const { ethers, network } = require('hardhat');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.ETH_PROVIDER);

module.exports = async function signup(publicKey) {
    // const filePath = path.join(__dirname, '../deployed-contracts.json');
    // const rawData = fs.readFileSync(filePath, 'utf-8');
    // const deployedContracts = JSON.parse(rawData);
    // const maciAddress = deployedContracts.sepolia.named['MACI'].address;

    // const network = await provider.getNetwork();
    // console.log(`Connected to network: ${network.name} (Chain ID: ${network.chainId})`);

    // const [signer] = await ethers.getSigners();

    // const index = await cli.signup({
    //     maciPubKey: publicKey,
    //     maciAddress: maciAddress,
    //     signer: signer,
    //     quiet: false,
    // })
    // console.log(`index: ${index}`);

    // const isRegistered = await cli.isRegisteredUser({
    //     maciAddress: maciAddress,
    //     maciPubKey: publicKey,
    //     signer: signer,
    //     quiet: false,
    // })
    // console.log(`isRegistered: ${isRegistered}`);

    const isRegistered = true;
    return isRegistered;
}
