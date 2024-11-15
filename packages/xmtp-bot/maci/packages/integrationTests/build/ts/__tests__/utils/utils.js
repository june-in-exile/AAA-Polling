"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployTestContracts = exports.isArm = exports.sleep = exports.expectTally = exports.genTestUserCommands = void 0;
// eslint-disable-next-line import/no-extraneous-dependencies
const chai_1 = require("chai");
const maci_contracts_1 = require("maci-contracts");
const maci_domainobjs_1 = require("maci-domainobjs");
const os_1 = require("os");
const constants_1 = require("./constants");
const user_1 = require("./user");
/**
 * Test utility to generate vote objects for integrationt ests
 * @param userIndex - the index of the user
 * @param voteIndex - the index of the vote
 * @param numVotesPerUser - the amount of votes per user
 * @param votes - the votes object
 * @param bribers - the bribers votes
 * @returns
 */
const getTestVoteValues = (userIndex, voteIndex, numVotesPerUser, votes, bribers) => {
    // check if we have specific votes
    const useVotes = votes && userIndex in votes;
    let { voteOptionIndex } = constants_1.defaultVote;
    let { voteWeight } = constants_1.defaultVote;
    // if we have bribers
    if (bribers && userIndex in bribers) {
        if (!(bribers[userIndex].voteOptionIndices.length === numVotesPerUser)) {
            throw new Error("failed generating user commands: more bribes than votes set per user");
        }
        // if we were provided specific votes
        if (useVotes) {
            if (bribers[userIndex].voteOptionIndices[voteIndex] !== votes[userIndex][voteIndex].voteOptionIndex) {
                throw new Error("failed generating user commands: conflict between bribers voteOptionIndex and the one set by voters");
            }
        }
        voteOptionIndex = bribers[userIndex].voteOptionIndices[voteIndex];
    }
    else if (useVotes) {
        voteOptionIndex = votes[userIndex][voteIndex].voteOptionIndex;
    }
    if (useVotes) {
        voteWeight = votes[userIndex][voteIndex].voteWeight;
    }
    return { voteOptionIndex, voteWeight };
};
/**
 * Generate a list of user commands for integration tests
 * @param numUsers - the number of users
 * @param numVotesPerUser - the number of votes per user
 * @param bribers - the number of bribers
 * @param presetVotes - the preset votes if any
 * @returns an array of UserCommand objects
 */
const genTestUserCommands = (numUsers, numVotesPerUser, bribers, presetVotes) => {
    const usersCommands = [];
    for (let i = 0; i < numUsers; i += 1) {
        const userKeypair = new maci_domainobjs_1.Keypair();
        const votes = [];
        for (let j = 0; j < numVotesPerUser; j += 1) {
            const { voteOptionIndex, voteWeight } = getTestVoteValues(i, j, numVotesPerUser, presetVotes, bribers);
            const vote = {
                voteOptionIndex,
                voteWeight,
                nonce: BigInt(j + 1),
            };
            votes.push(vote);
        }
        const userCommand = new user_1.UserCommand(userKeypair, votes, constants_1.defaultVote.maxVoteWeight, constants_1.defaultVote.nonce);
        usersCommands.push(userCommand);
    }
    return usersCommands;
};
exports.genTestUserCommands = genTestUserCommands;
/**
 * Assertion function to validate that the tally results are as expected
 * @param maxMessages - the max number of messages
 * @param expectedTally - the expected tally values
 * @param expectedPerVOSpentVoiceCredits - the expected per VO spent voice credits
 * @param expectedTotalSpentVoiceCredits - the expected total spent voice credits
 * @param tallyFile the tally file itself as an object
 */
const expectTally = (maxMessages, expectedTally, expectedPerVOSpentVoiceCredits, expectedTotalSpentVoiceCredits, tallyFile) => {
    const genTally = Array(maxMessages).fill("0");
    const genPerVOSpentVoiceCredits = Array(maxMessages).fill("0");
    expectedTally.forEach((voteWeight, voteOption) => {
        if (voteWeight !== 0) {
            genTally[voteOption] = voteWeight.toString();
        }
    });
    expectedPerVOSpentVoiceCredits.forEach((spentCredit, index) => {
        if (spentCredit !== 0) {
            genPerVOSpentVoiceCredits[index] = spentCredit.toString();
        }
    });
    (0, chai_1.expect)(tallyFile.results.tally).to.deep.equal(genTally);
    (0, chai_1.expect)(tallyFile.perVOSpentVoiceCredits?.tally).to.deep.equal(genPerVOSpentVoiceCredits);
    (0, chai_1.expect)(tallyFile.totalSpentVoiceCredits.spent).to.eq(expectedTotalSpentVoiceCredits.toString());
};
exports.expectTally = expectTally;
/**
 * Stop the current thread for x seconds
 * @param ms - the number of ms to sleep for
 */
const sleep = async (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});
exports.sleep = sleep;
/**
 * Check whether we are running on an arm chip
 * @returns whether we are running on an arm chip
 */
const isArm = () => (0, os_1.arch)().includes("arm");
exports.isArm = isArm;
/**
 * Deploy a set of smart contracts that can be used for testing.
 * @param initialVoiceCreditBalance - the initial voice credit balance for each user
 * @param stateTreeDepth - the depth of the state tree
 * @param signer - the signer to use
 * @param quiet - whether to suppress console output
 * @param gatekeeper - the gatekeeper contract to use
 * @returns the deployed contracts
 */
const deployTestContracts = async (initialVoiceCreditBalance, stateTreeDepth, signer, quiet = false, gatekeeper = undefined) => {
    const mockVerifierContract = await (0, maci_contracts_1.deployMockVerifier)(signer, true);
    let gatekeeperContract = gatekeeper;
    if (!gatekeeperContract) {
        gatekeeperContract = await (0, maci_contracts_1.deployFreeForAllSignUpGatekeeper)(signer, true);
    }
    const constantInitialVoiceCreditProxyContract = await (0, maci_contracts_1.deployConstantInitialVoiceCreditProxy)(initialVoiceCreditBalance, signer, true);
    // VkRegistry
    const vkRegistryContract = await (0, maci_contracts_1.deployVkRegistry)(signer, true);
    const [gatekeeperContractAddress, constantInitialVoiceCreditProxyContractAddress] = await Promise.all([
        gatekeeperContract.getAddress(),
        constantInitialVoiceCreditProxyContract.getAddress(),
    ]);
    const { maciContract } = await (0, maci_contracts_1.deployMaci)({
        signUpTokenGatekeeperContractAddress: gatekeeperContractAddress,
        initialVoiceCreditBalanceAddress: constantInitialVoiceCreditProxyContractAddress,
        signer,
        stateTreeDepth,
        quiet,
    });
    return { maci: maciContract, verifier: mockVerifierContract, vkRegistry: vkRegistryContract };
};
exports.deployTestContracts = deployTestContracts;
//# sourceMappingURL=utils.js.map