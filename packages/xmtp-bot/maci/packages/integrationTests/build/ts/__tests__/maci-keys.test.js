"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const maci_contracts_1 = require("maci-contracts");
const maci_crypto_1 = require("maci-crypto");
const maci_domainobjs_1 = require("maci-domainobjs");
const constants_1 = require("./utils/constants");
const utils_1 = require("./utils/utils");
describe("integration tests private/public/keypair", () => {
    describe("crypto/domainobjs", () => {
        it("should serialize and deserialize a private key correctly", () => {
            const privateKeyCrypto = (0, maci_crypto_1.genPrivKey)();
            const privKeyDomainobjs = new maci_domainobjs_1.PrivKey(privateKeyCrypto);
            const privKeyDomainobjsSerialized = privKeyDomainobjs.serialize();
            const privKeyDomainobjsDeserialized = maci_domainobjs_1.PrivKey.deserialize(privKeyDomainobjsSerialized);
            (0, chai_1.expect)(privKeyDomainobjsDeserialized.rawPrivKey.toString()).to.eq(privateKeyCrypto.toString());
        });
        it("should serialize and deserialize a public key correctly", () => {
            const privateKeyCrypto = (0, maci_crypto_1.genPrivKey)();
            const publicKeyCrypto = (0, maci_crypto_1.genPubKey)(privateKeyCrypto);
            const pubKeyDomainobjs = new maci_domainobjs_1.PubKey(publicKeyCrypto);
            const pubKeyDomainobjsSerialized = pubKeyDomainobjs.serialize();
            const pubKeyDomainobjsDeserialized = maci_domainobjs_1.PubKey.deserialize(pubKeyDomainobjsSerialized);
            (0, chai_1.expect)(pubKeyDomainobjsDeserialized.rawPubKey[0].toString()).to.eq(publicKeyCrypto[0].toString());
            (0, chai_1.expect)(pubKeyDomainobjsDeserialized.rawPubKey[1].toString()).to.eq(publicKeyCrypto[1].toString());
        });
        it("should serialize and deserialize a private key correct after serializing as contract params", () => {
            const privateKeyCrypto = (0, maci_crypto_1.genPrivKey)();
            const privKeyDomainobjs = new maci_domainobjs_1.PrivKey(privateKeyCrypto);
            const keypairDomainobjs = new maci_domainobjs_1.Keypair(privKeyDomainobjs);
            const pubKeyDomainobjsAsContractParam = keypairDomainobjs.pubKey.asContractParam();
            const privKeyDomainobjsSerialized = privKeyDomainobjs.serialize();
            const privKeyDomainobjsDeserialized = maci_domainobjs_1.PrivKey.deserialize(privKeyDomainobjsSerialized);
            const keypairDomainobjsDeserialized = new maci_domainobjs_1.Keypair(privKeyDomainobjsDeserialized);
            (0, chai_1.expect)(keypairDomainobjsDeserialized.pubKey.rawPubKey[0].toString()).to.eq(pubKeyDomainobjsAsContractParam.x.toString());
            (0, chai_1.expect)(keypairDomainobjsDeserialized.pubKey.rawPubKey[1].toString()).to.eq(pubKeyDomainobjsAsContractParam.y.toString());
        });
    });
    describe("crypto/domainobjs/contracts", () => {
        let pollContract;
        let signer;
        const coordinatorKeypair = new maci_domainobjs_1.Keypair();
        before(async () => {
            signer = await (0, maci_contracts_1.getDefaultSigner)();
            const { maci, verifier, vkRegistry } = await (0, utils_1.deployTestContracts)(constants_1.initialVoiceCredits, constants_1.STATE_TREE_DEPTH, signer, true);
            // deploy a poll
            await maci.deployPoll(BigInt(constants_1.duration), {
                intStateTreeDepth: constants_1.INT_STATE_TREE_DEPTH,
                messageTreeDepth: constants_1.messageTreeDepth,
                messageTreeSubDepth: constants_1.messageBatchDepth,
                voteOptionTreeDepth: constants_1.VOTE_OPTION_TREE_DEPTH,
            }, coordinatorKeypair.pubKey.asContractParam(), verifier, vkRegistry, maci_contracts_1.EMode.NON_QV);
            // we know it's the first poll so id is 0
            pollContract = maci_contracts_1.Poll__factory.connect((await maci.polls(0)).poll, signer);
        });
        it("should have the correct coordinator pub key set on chain", async () => {
            const onChainKey = await pollContract.coordinatorPubKey();
            (0, chai_1.expect)(onChainKey.x.toString()).to.eq(coordinatorKeypair.pubKey.rawPubKey[0].toString());
            (0, chai_1.expect)(onChainKey.y.toString()).to.eq(coordinatorKeypair.pubKey.rawPubKey[1].toString());
        });
        it("should serialize and deserialize the coordinator private key to match the on chain key", async () => {
            const onChainKey = await pollContract.coordinatorPubKey();
            const coordinatorPrivKeySerialized = coordinatorKeypair.privKey.serialize();
            const coordinatorPrivKeyDeserialized = maci_domainobjs_1.PrivKey.deserialize(coordinatorPrivKeySerialized);
            const coordinatorKeypairDeserialized = new maci_domainobjs_1.Keypair(coordinatorPrivKeyDeserialized);
            (0, chai_1.expect)(coordinatorKeypairDeserialized.pubKey.rawPubKey[0].toString()).to.eq(onChainKey.x.toString());
            (0, chai_1.expect)(coordinatorKeypairDeserialized.pubKey.rawPubKey[1].toString()).to.eq(onChainKey.y.toString());
        });
        it("should have a matching coordinator public key hash", async () => {
            const onChainKeyHash = await pollContract.coordinatorPubKeyHash();
            const coordinatorPubKeyHash = coordinatorKeypair.pubKey.hash();
            (0, chai_1.expect)(onChainKeyHash.toString()).to.eq(coordinatorPubKeyHash.toString());
        });
    });
});
//# sourceMappingURL=maci-keys.test.js.map