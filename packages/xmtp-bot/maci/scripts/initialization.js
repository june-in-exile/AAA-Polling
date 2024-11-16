// const cli = require('maci-cli');
const hre = require("hardhat");

async function main() {
    console.log("???");
    const [signer] = await hre.ethers.getSigners();
    console.log("signer: ", signer);

    // console.log("start deploying VkRegistry...")
    // cli.deployVkRegistryContract()

    // console.log("start setting verifying keys...")
    // cli.setVerifyingKeys({
    //     stateTreeDepth: 10,
    //     intStateTreeDepth: 1,
    //     messageTreeDepth: 2,
    //     voteOptionTreeDepth: 2,cd 
    //     messageBatchDepth: 1,
    //     // processMessagesZkeyPathQv: "./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey",
    //     // tallyVotesZkeyPathQv: "./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey",
    //     // processMessagesZkeyPathNonQv: cmdObj.processMessagesZkeyNonQv,
    //     // tallyVotesZkeyPathNonQv: cmdObj.tallyVotesZkeyNonQv,
    //     // vkRegistry: cmdObj.vkRegistry,
    //     quiet: false,
    //     useQuadraticVoting: false,
    //     signer: signer
    // })

    // console.log("start deploying the main contracts...")
    // cli.deploy({ stateTreeDepth: 10, signer: signer });


    // // const corKeyPair = cli.genKeyPair({ seed: false });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});