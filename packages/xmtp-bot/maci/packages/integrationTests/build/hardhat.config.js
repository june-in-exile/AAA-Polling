"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomicfoundation/hardhat-toolbox");
const WALLET_MNEMONIC = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
const GAS_LIMIT = 30000000;
const config = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            gas: GAS_LIMIT,
            blockGasLimit: GAS_LIMIT,
            accounts: { count: 30, mnemonic: WALLET_MNEMONIC },
            mining: {
                auto: true,
                interval: 100,
            },
        },
    },
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
                details: {
                    yul: true,
                },
            },
        },
    },
    paths: {
        sources: "./node_modules/maci-contracts/contracts",
        artifacts: "./node_modules/maci-contracts/artifacts",
    },
};
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map