import { ethers } from 'ethers'

const globalStateTreeDepth = 16;

const userStateTreeDepth = 16;

const epochTreeDepth = 64;

const attestingFee = ethers.utils.parseEther("0.01")

const numEpochKeyNoncePerEpoch = 3;

const numAttestationsPerProof = 5;

const epochLength = 30;  // 30 seconds


const circuitGlobalStateTreeDepth = 4;

const circuitUserStateTreeDepth = 4;

const circuitEpochTreeDepth = 32;

const maxReputationBudget = 10;

const maxUsers = 2 ** circuitGlobalStateTreeDepth - 1;

const maxAttesters = 2 ** circuitUserStateTreeDepth - 1;

const DEFAULT_ETH_PROVIDER = 'http://localhost:8545'
const DEFAULT_START_BLOCK = 0
const DEFAULT_MAX_EPOCH_KEY_NONCE = 3
const DEFAULT_EPOCH_LENGTH = 30
const DEFAULT_ATTESTING_FEE = ethers.utils.parseEther("0.01")
const DEFAULT_TREE_DEPTHS_CONFIG = 'circuit'

export {
    attestingFee,
    circuitGlobalStateTreeDepth,
    circuitUserStateTreeDepth,
    circuitEpochTreeDepth,
    epochLength,
    epochTreeDepth,
    globalStateTreeDepth,
    numEpochKeyNoncePerEpoch,
    numAttestationsPerProof,
    maxUsers,
    maxAttesters,
    userStateTreeDepth,
    maxReputationBudget,

    DEFAULT_ETH_PROVIDER,
    DEFAULT_START_BLOCK,
    DEFAULT_MAX_EPOCH_KEY_NONCE,
    DEFAULT_EPOCH_LENGTH,
    DEFAULT_ATTESTING_FEE,
    DEFAULT_TREE_DEPTHS_CONFIG,
}