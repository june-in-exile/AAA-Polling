const cli = require("maci-cli");

async function main() {
    // Get the signer
    const [signer] = await ethers.getSigners();

    console.log("start deploying VkRegistry...")
    cli.deployVkRegistryContract()

    console.log("start setting verifying keys...")
    cli.setVerifyingKeys({
        stateTreeDepth: 10,
        intStateTreeDepth: 1,
        messageTreeDepth: 2,
        voteOptionTreeDepth: 2,
        messageBatchDepth: 1,
        // processMessagesZkeyPathQv: "./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey",
        // tallyVotesZkeyPathQv: "./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey",
        // processMessagesZkeyPathNonQv: cmdObj.processMessagesZkeyNonQv,
        // tallyVotesZkeyPathNonQv: cmdObj.tallyVotesZkeyNonQv,
        // vkRegistry: cmdObj.vkRegistry,
        quiet: false,
        useQuadraticVoting: false,
        signer: signer
    })

    console.log("start deploying the main contracts...")
    cli.deploy({ stateTreeDepth: 10, signer: signer });
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });