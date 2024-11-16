import { run } from "@xmtp/message-kit";
import cli from 'maci-cli';
import { ethers } from "ethers";
import * as dotenv from "dotenv";
// Function to generate a key pair
function genKeyPair() {
    const keyPair = cli.genKeyPair({ seed: BigInt(1) });
    return keyPair;
}
dotenv.config();
const provider = new ethers.JsonRpcProvider(process.env.ETH_PROVIDER);
async function signup(publicKey) {
    try {
        // Uncomment if contract details are required from a JSON file
        // const filePath = path.join(__dirname, '../deployed-contracts.json');
        // const rawData = fs.readFileSync(filePath, 'utf-8');
        // const deployedContracts = JSON.parse(rawData);
        // const maciAddress = deployedContracts.sepolia.named['MACI'].address;
        // Uncomment if network details are required
        // const network = await provider.getNetwork();
        // console.log(`Connected to network: ${network.name} (Chain ID: ${network.chainId})`);
        // Uncomment if using Hardhat for signer
        // const [signer]: Signer[] = await ethers.getSigners();
        // Uncomment if signup logic with maci-cli is required
        // const index = await cli.signup({
        //     maciPubKey: publicKey,
        //     maciAddress: maciAddress,
        //     signer: signer,
        //     quiet: false,
        // });
        // console.log(`index: ${index}`);
        // Uncomment if checking registration status with maci-cli is required
        // const isRegistered = await cli.isRegisteredUser({
        //     maciAddress: maciAddress,
        //     maciPubKey: publicKey,
        //     signer: signer,
        //     quiet: false,
        // });
        // console.log(`isRegistered: ${isRegistered}`);
        const isRegistered = true; // Placeholder value for demonstration
        return isRegistered;
    }
    catch (error) {
        console.error("Error during signup process:", error);
        throw error;
    }
}
async function tally() {
    return "ETHGlobal.com";
}
async function vote(publicKey, privateKey, option) {
    console.log("publicKey: ", publicKey);
    console.log("privateKey: ", privateKey);
    console.log("option: ", option);
    return true;
}
run(async (context) => {
    const { content, sender } = context.message;
    const message = content?.text;
    console.log(`Message received: ${message}`);
    console.log(`Sender: ${sender}`);
    if (message?.startsWith("/keygen")) {
        const args = message.slice(7).trim();
        await handleKeygen(args, context);
    }
    else if (message?.startsWith("/signup")) {
        const args = message.slice(8).trim();
        await handleSignup(args, context);
    }
    else if (message?.startsWith("/vote")) {
        const args = message.slice(6).trim();
        await handleVote(args, context);
    }
    else if (message?.startsWith("/result")) {
        const args = message.slice(7).trim();
        await handleResult(args, context);
    }
    else {
        await context.send("Command not recognized. Please use /keygen, /signup, /vote, or /result.");
    }
});
async function handleKeygen(message, context) {
    const keypair = await genKeyPair();
    const parsedKeypair = {
        publicKey: keypair.publicKey, // Adjust this to the actual key names
        privateKey: keypair.privateKey, // Adjust this to the actual key names
    };
    await context.send(`Key generation:\nPublic Key: ${parsedKeypair.publicKey}\nPrivate Key: ${parsedKeypair.privateKey}`);
}
async function handleSignup(message, context) {
    const result = await signup(message);
    await context.send(`signup success`);
}
async function handleVote(message, context) {
    // Split the message by spaces
    // const [pub, pri, option] = message.split(" ");
    const [address, option] = message.split(" ");
    await vote("pub", "pri", option);
    await context.send(`Vote for ${option} success`);
}
async function handleResult(message, context) {
    const result = await tally();
    await context.send(`result: ${result}`);
}
//# sourceMappingURL=index.js.map