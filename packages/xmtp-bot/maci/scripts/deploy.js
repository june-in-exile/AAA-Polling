// const cli = require("maci-cli");
// const VkRegistryArtifact = require('maci-contracts/build/artifacts/VkRegistry.json');

const MACIContracts = require("maci-contracts");

async function main() {
    const [signer] = await ethers.getSigners();
    const vkRegistry = await MACIContracts.deployVkRegistry();
    console.log("VkRegistry deployed at:", vkRegistry.address);

    // console.log("start setting verifying keys...")
    // await cli.setVerifyingKeys({
    //     stateTreeDepth: 10,
    //     intStateTreeDepth: 1,
    //     messageTreeDepth: 2,
    //     voteOptionTreeDepth: 2,
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
    // const contracts = await cli.deploy({ stateTreeDepth: 10, signer: signer });
    // console.log("contracts: ", contracts);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

