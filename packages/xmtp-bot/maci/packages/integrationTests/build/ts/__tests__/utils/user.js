"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCommand = void 0;
const maci_domainobjs_1 = require("maci-domainobjs");
/**
 * A class representing a user and its votes
 */
class UserCommand {
    /**
     * Create a new instance of a UserCommand object
     * @param _keypair the keypair of the user
     * @param votes the votes casted by the user
     * @param voiceCreditBalance the voice credit balance of the user
     * @param nonce the nonce of the user
     */
    constructor(_keypair, votes, voiceCreditBalance, nonce) {
        this.keypair = _keypair;
        this.votes = votes;
        this.voiceCreditBalance = voiceCreditBalance;
        this.nonce = nonce;
    }
    /**
     * Helper function that can be used to change the keypair of the user
     * @returns
     */
    changeKeypair() {
        const newUserKeypair = new maci_domainobjs_1.Keypair();
        const oldPrivateKey = this.keypair.privKey;
        this.keypair = !newUserKeypair.equals(this.keypair) ? newUserKeypair : this.keypair;
        return oldPrivateKey;
    }
}
exports.UserCommand = UserCommand;
//# sourceMappingURL=user.js.map