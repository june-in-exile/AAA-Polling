import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { MerkleProof, MerkleProofInterface } from "../../../../../@openzeppelin/contracts/utils/cryptography/MerkleProof";
type MerkleProofConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class MerkleProof__factory extends ContractFactory {
    constructor(...args: MerkleProofConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<MerkleProof & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): MerkleProof__factory;
    static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220565a113abde48d6df4f367bb5008d8361691ecfb5874d94aff300634ecb2965d64736f6c63430008140033";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "MerkleProofInvalidMultiproof";
        readonly type: "error";
    }];
    static createInterface(): MerkleProofInterface;
    static connect(address: string, runner?: ContractRunner | null): MerkleProof;
}
export {};
//# sourceMappingURL=MerkleProof__factory.d.ts.map