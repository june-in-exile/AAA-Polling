import { Signer } from "ethers";
import { FreeForAllGatekeeper } from "maci-contracts";
import type { TallyData } from "maci-cli";
import { IVote, IBriber, IDeployedTestContracts } from "./interfaces";
import { UserCommand } from "./user";
/**
 * Generate a list of user commands for integration tests
 * @param numUsers - the number of users
 * @param numVotesPerUser - the number of votes per user
 * @param bribers - the number of bribers
 * @param presetVotes - the preset votes if any
 * @returns an array of UserCommand objects
 */
export declare const genTestUserCommands: (numUsers: number, numVotesPerUser: number, bribers?: IBriber[], presetVotes?: IVote[][]) => UserCommand[];
/**
 * Assertion function to validate that the tally results are as expected
 * @param maxMessages - the max number of messages
 * @param expectedTally - the expected tally values
 * @param expectedPerVOSpentVoiceCredits - the expected per VO spent voice credits
 * @param expectedTotalSpentVoiceCredits - the expected total spent voice credits
 * @param tallyFile the tally file itself as an object
 */
export declare const expectTally: (maxMessages: number, expectedTally: number[], expectedPerVOSpentVoiceCredits: number[], expectedTotalSpentVoiceCredits: number, tallyFile: TallyData) => void;
/**
 * Stop the current thread for x seconds
 * @param ms - the number of ms to sleep for
 */
export declare const sleep: (ms: number) => Promise<void>;
/**
 * Check whether we are running on an arm chip
 * @returns whether we are running on an arm chip
 */
export declare const isArm: () => boolean;
/**
 * Deploy a set of smart contracts that can be used for testing.
 * @param initialVoiceCreditBalance - the initial voice credit balance for each user
 * @param stateTreeDepth - the depth of the state tree
 * @param signer - the signer to use
 * @param quiet - whether to suppress console output
 * @param gatekeeper - the gatekeeper contract to use
 * @returns the deployed contracts
 */
export declare const deployTestContracts: (initialVoiceCreditBalance: number, stateTreeDepth: number, signer?: Signer, quiet?: boolean, gatekeeper?: FreeForAllGatekeeper | undefined) => Promise<IDeployedTestContracts>;
//# sourceMappingURL=utils.d.ts.map