"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
const chai_1 = __importDefault(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const maci_cli_1 = require("maci-cli");
const maci_contracts_1 = require("maci-contracts");
const maci_core_1 = require("maci-core");
const maci_crypto_1 = require("maci-crypto");
const maci_domainobjs_1 = require("maci-domainobjs");
const fs_1 = __importDefault(require("fs"));
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
const constants_1 = require("./utils/constants");
const utils_1 = require("./utils/utils");
chai_1.default.use(chai_as_promised_1.default);
const { expect } = chai_1.default;
/**
 * MACI Integration tests
 * @dev These tests use the cli code to perform full testing of the
 * protocol.
 */
describe("Integration tests", function test() {
    this.timeout(10000000);
    // check on which system we are running
    const useWasm = (0, utils_1.isArm)();
    // global variables we need shared between tests
    let maciState;
    let contracts;
    let pollId;
    let signer;
    const coordinatorKeypair = new maci_domainobjs_1.Keypair();
    // the code that we run before all tests
    before(async () => {
        signer = await (0, maci_contracts_1.getDefaultSigner)();
        // 1. deploy Vk Registry
        const vkRegistryAddress = await (0, maci_cli_1.deployVkRegistryContract)({ signer });
        // 2. set verifying keys
        await (0, maci_cli_1.setVerifyingKeys)({
            stateTreeDepth: constants_1.STATE_TREE_DEPTH,
            intStateTreeDepth: constants_1.INT_STATE_TREE_DEPTH,
            messageTreeDepth: constants_1.MSG_TREE_DEPTH,
            voteOptionTreeDepth: constants_1.VOTE_OPTION_TREE_DEPTH,
            messageBatchDepth: constants_1.MSG_BATCH_DEPTH,
            processMessagesZkeyPathQv: path_1.default.resolve(__dirname, "../../../cli/zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey"),
            tallyVotesZkeyPathQv: path_1.default.resolve(__dirname, "../../../cli/zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey"),
            processMessagesZkeyPathNonQv: path_1.default.resolve(__dirname, "../../../cli/zkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test.0.zkey"),
            tallyVotesZkeyPathNonQv: path_1.default.resolve(__dirname, "../../../cli/zkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test.0.zkey"),
            vkRegistry: vkRegistryAddress,
            signer,
        });
    });
    // the code that we run before each test
    beforeEach(async () => {
        // create a new maci state
        maciState = new maci_core_1.MaciState(constants_1.STATE_TREE_DEPTH);
        // 3. deploy maci
        contracts = await (0, maci_cli_1.deploy)({ stateTreeDepth: constants_1.STATE_TREE_DEPTH, initialVoiceCredits: constants_1.initialVoiceCredits, signer });
        // 4. create a poll
        await (0, maci_cli_1.deployPoll)({
            pollDuration: constants_1.duration,
            intStateTreeDepth: constants_1.INT_STATE_TREE_DEPTH,
            messageTreeSubDepth: constants_1.MSG_BATCH_DEPTH,
            messageTreeDepth: constants_1.MSG_TREE_DEPTH,
            voteOptionTreeDepth: constants_1.VOTE_OPTION_TREE_DEPTH,
            coordinatorPubkey: coordinatorKeypair.pubKey.serialize(),
            maciAddress: contracts.maciAddress,
            signer,
            useQuadraticVoting: true,
        });
        const treeDepths = {
            intStateTreeDepth: constants_1.INT_STATE_TREE_DEPTH,
            messageTreeDepth: constants_1.MSG_TREE_DEPTH,
            messageTreeSubDepth: constants_1.MSG_BATCH_DEPTH,
            voteOptionTreeDepth: constants_1.VOTE_OPTION_TREE_DEPTH,
        };
        const messageBatchSize = 5 ** constants_1.messageBatchDepth;
        pollId = maciState.deployPoll(BigInt(Date.now() + constants_1.duration * 60000), treeDepths, messageBatchSize, coordinatorKeypair);
    });
    // after each test we need to cleanup some files
    afterEach(async () => {
        if (fs_1.default.existsSync(path_1.default.resolve(__dirname, "../../../cli/tally.json"))) {
            await fs_1.default.promises.unlink(path_1.default.resolve(__dirname, "../../../cli/tally.json"));
        }
        const directory = path_1.default.resolve(__dirname, "../../../cli/proofs/");
        if (!fs_1.default.existsSync(directory)) {
            return;
        }
        const files = await fs_1.default.promises.readdir(directory);
        await Promise.all(files.map((file) => fs_1.default.promises.unlink(path_1.default.resolve(directory, file))));
    });
    // read the test suite data
    const data = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, `./data/suites.json`)).toString());
    data.suites.forEach((testCase) => {
        it(testCase.description, async () => {
            const users = (0, utils_1.genTestUserCommands)(testCase.numUsers, testCase.numVotesPerUser, testCase.bribers, testCase.votes);
            // loop through all users and generate keypair + signup
            for (let i = 0; i < users.length; i += 1) {
                const user = users[i];
                const timestamp = Date.now();
                // signup
                const stateIndex = BigInt(await (0, maci_cli_1.signup)({
                    maciPubKey: user.keypair.pubKey.serialize(),
                    maciAddress: contracts.maciAddress,
                    sgDataArg: constants_1.SG_DATA,
                    ivcpDataArg: constants_1.ivcpData,
                    signer,
                }).then((result) => result.stateIndex));
                // signup on local maci state
                maciState.signUp(user.keypair.pubKey, BigInt(constants_1.initialVoiceCredits), BigInt(timestamp));
                // publish messages
                for (let j = 0; j < user.votes.length; j += 1) {
                    const isKeyChange = testCase.changeUsersKeys && j in testCase.changeUsersKeys[i];
                    const voteOptionIndex = isKeyChange
                        ? testCase.changeUsersKeys?.[i][j].voteOptionIndex
                        : user.votes[j].voteOptionIndex;
                    const newVoteWeight = isKeyChange ? testCase.changeUsersKeys?.[i][j].voteWeight : user.votes[j].voteWeight;
                    const { nonce } = user.votes[j];
                    const salt = (0, maci_crypto_1.genRandomSalt)();
                    // store the previous keypair
                    const oldKeypair = user.keypair;
                    // change
                    if (isKeyChange) {
                        user.changeKeypair();
                    }
                    // actually publish it
                    const encryptionKey = await (0, maci_cli_1.publish)({
                        pubkey: user.keypair.pubKey.serialize(),
                        stateIndex,
                        voteOptionIndex: voteOptionIndex,
                        nonce,
                        pollId,
                        newVoteWeight: newVoteWeight,
                        maciAddress: contracts.maciAddress,
                        salt,
                        // if it's a key change command, then we pass the old private key otherwise just pass the current
                        privateKey: isKeyChange ? oldKeypair.privKey.serialize() : user.keypair.privKey.serialize(),
                        signer,
                    });
                    const encPrivKey = maci_domainobjs_1.PrivKey.deserialize(encryptionKey);
                    const encPubKey = new maci_domainobjs_1.PubKey((0, maci_crypto_1.genPubKey)(encPrivKey.rawPrivKey));
                    // create the command to add to the local state
                    const command = new maci_domainobjs_1.PCommand(stateIndex, user.keypair.pubKey, voteOptionIndex, newVoteWeight, nonce, pollId, salt);
                    const signature = command.sign(isKeyChange ? oldKeypair.privKey : user.keypair.privKey);
                    const message = command.encrypt(signature, maci_domainobjs_1.Keypair.genEcdhSharedKey(encPrivKey, coordinatorKeypair.pubKey));
                    maciState.polls.get(pollId)?.publishMessage(message, encPubKey);
                }
            }
            await (0, maci_cli_1.timeTravel)({ seconds: constants_1.duration, signer });
            // merge messages
            await expect((0, maci_cli_1.mergeMessages)({ pollId, maciAddress: contracts.maciAddress, signer })).to.eventually.not.be.rejectedWith();
            // merge signups
            await expect((0, maci_cli_1.mergeSignups)({ pollId, maciAddress: contracts.maciAddress, signer })).to.eventually.not.be.rejectedWith();
            // generate proofs
            const tallyData = await (0, maci_cli_1.genProofs)({
                outputDir: path_1.default.resolve(__dirname, "../../../cli/proofs"),
                tallyFile: path_1.default.resolve(__dirname, "../../../cli/tally.json"),
                tallyZkey: path_1.default.resolve(__dirname, "../../../cli/zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey"),
                processZkey: path_1.default.resolve(__dirname, "../../../cli/zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey"),
                pollId,
                rapidsnark: `${(0, os_1.homedir)()}/rapidsnark/build/prover`,
                processWitgen: path_1.default.resolve(__dirname, "../../../cli/zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/ProcessMessages_10-2-1-2_test"),
                processDatFile: path_1.default.resolve(__dirname, "../../../cli/zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/ProcessMessages_10-2-1-2_test.dat"),
                tallyWitgen: path_1.default.resolve(__dirname, "../../../cli/zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/TallyVotes_10-1-2_test"),
                tallyDatFile: path_1.default.resolve(__dirname, "../../../cli/zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/TallyVotes_10-1-2_test.dat"),
                coordinatorPrivKey: coordinatorKeypair.privKey.serialize(),
                maciAddress: contracts.maciAddress,
                processWasm: path_1.default.resolve(__dirname, "../../../cli/zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_js/ProcessMessages_10-2-1-2_test.wasm"),
                tallyWasm: path_1.default.resolve(__dirname, "../../../cli/zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_js/TallyVotes_10-1-2_test.wasm"),
                useWasm,
                useQuadraticVoting: true,
                signer,
            });
            expect(tallyData).to.not.eq(undefined);
            // verify that the data stored on the tally file is correct
            (0, utils_1.expectTally)(constants_1.maxMessages, testCase.expectedTally, testCase.expectedSpentVoiceCredits, testCase.expectedTotalSpentVoiceCredits, tallyData);
            // prove on chain if everything matches
            await expect((0, maci_cli_1.proveOnChain)({
                pollId,
                proofDir: path_1.default.resolve(__dirname, "../../../cli/proofs"),
                maciAddress: contracts.maciAddress,
                signer,
            })).to.not.be.rejected;
            // verify the proofs
            await expect((0, maci_cli_1.verify)({
                pollId,
                tallyData,
                maciAddress: contracts.maciAddress,
                signer,
            })).to.not.be.rejected;
        });
    });
});
//# sourceMappingURL=integration.test.js.map