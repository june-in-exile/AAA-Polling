import { Keypair, PrivKey } from "maci-domainobjs";
import { IVote } from "./interfaces";
/**
 * A class representing a user and its votes
 */
export declare class UserCommand {
    keypair: Keypair;
    votes: IVote[];
    voiceCreditBalance: bigint;
    nonce: bigint;
    /**
     * Create a new instance of a UserCommand object
     * @param _keypair the keypair of the user
     * @param votes the votes casted by the user
     * @param voiceCreditBalance the voice credit balance of the user
     * @param nonce the nonce of the user
     */
    constructor(_keypair: Keypair, votes: IVote[], voiceCreditBalance: bigint, nonce: bigint);
    /**
     * Helper function that can be used to change the keypair of the user
     * @returns
     */
    changeKeypair(): PrivKey;
}
//# sourceMappingURL=user.d.ts.map