"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSG_BATCH_DEPTH = exports.VOTE_OPTION_TREE_DEPTH = exports.MSG_TREE_DEPTH = exports.INT_STATE_TREE_DEPTH = exports.STATE_TREE_DEPTH = exports.messageBatchDepth = exports.messageTreeDepth = exports.intStateTreeDepth = exports.duration = exports.voteOptionsMaxLeafIndex = exports.quadVoteTallyBatchSize = exports.tallyBatchSize = exports.messageBatchSize = exports.votingDurationInSeconds = exports.signUpDurationInSeconds = exports.votingDuration = exports.signUpDuration = exports.initialVoiceCredits = exports.maxVoteOptions = exports.maxMessages = exports.maxUsers = exports.ivcpData = exports.NOTHING_UP_MY_SLEEVE = exports.LEAVES_PER_NODE = exports.PROCESS_DEPTH = exports.SUB_DEPTH = exports.HASH_LENGTH = exports.QUINARY_HASH_LENGTH = exports.SG_DATA = exports.defaultVote = exports.invalidVote = void 0;
// this file contains all of the constants used in the integration tests
exports.invalidVote = {
    voteWeight: 2n,
    nonce: 0n,
    maxVoteWeight: 1n,
    voteCreditBalance: 1n,
};
exports.defaultVote = {
    voteWeight: 1n,
    nonce: 1n,
    maxVoteWeight: 25n,
    voteCreditBalance: 1n,
    voteOptionIndex: 0n,
};
exports.SG_DATA = "0x0000000000000000000000000000000000000000000000000000000000000000";
exports.QUINARY_HASH_LENGTH = 5;
exports.HASH_LENGTH = 2;
exports.SUB_DEPTH = 2;
exports.PROCESS_DEPTH = 4;
exports.LEAVES_PER_NODE = 5;
exports.NOTHING_UP_MY_SLEEVE = "8370432830353022751713833565135785980866757267633941821328460903436894336785";
exports.ivcpData = "0x0000000000000000000000000000000000000000000000000000000000000000";
exports.maxUsers = 15;
exports.maxMessages = 25;
exports.maxVoteOptions = 25;
exports.initialVoiceCredits = 1000;
exports.signUpDuration = 120;
exports.votingDuration = 120;
exports.signUpDurationInSeconds = 3600;
exports.votingDurationInSeconds = 3600;
exports.messageBatchSize = 4;
exports.tallyBatchSize = 4;
exports.quadVoteTallyBatchSize = 4;
exports.voteOptionsMaxLeafIndex = 3;
exports.duration = 300;
exports.intStateTreeDepth = 1;
exports.messageTreeDepth = 2;
exports.messageBatchDepth = 1;
exports.STATE_TREE_DEPTH = 10;
exports.INT_STATE_TREE_DEPTH = 1;
exports.MSG_TREE_DEPTH = 2;
exports.VOTE_OPTION_TREE_DEPTH = 2;
exports.MSG_BATCH_DEPTH = 1;
//# sourceMappingURL=constants.js.map