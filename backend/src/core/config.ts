import { ethers } from 'ethers'

const DEFAULT_AIRDROPPED_KARMA = 20

const DEFAULT_POST_KARMA = 10

const DEFAULT_COMMENT_KARMA = 5

const MAX_KARMA_BUDGET = 10

const ATTESTATION_NULLIFIER_DOMAIN = BigInt(1)

const EPOCH_KEY_NULLIFIER_DOMAIN = BigInt(2)

const KARMA_NULLIFIER_DOMAIN = BigInt(3)

const globalStateTreeDepth = 4;

const userStateTreeDepth = 4;

const epochTreeDepth = 4;

const nullifierTreeDepth = 128;

const maxUsers = 2 ** globalStateTreeDepth - 1;

const attestingFee = ethers.utils.parseEther("0.01")

const numEpochKeyNoncePerEpoch = 2;

const numAttestationsPerEpochKey = 6;

const epochLength = 30;  // 30 seconds


const circuitGlobalStateTreeDepth = 4;

const circuitUserStateTreeDepth = 4;

const circuitEpochTreeDepth = 8;

const circuitNullifierTreeDepth = 128;

export {
    DEFAULT_AIRDROPPED_KARMA,
    DEFAULT_POST_KARMA,
    DEFAULT_COMMENT_KARMA,
    MAX_KARMA_BUDGET,

    ATTESTATION_NULLIFIER_DOMAIN,
    EPOCH_KEY_NULLIFIER_DOMAIN,
    KARMA_NULLIFIER_DOMAIN,

    attestingFee,
    circuitGlobalStateTreeDepth,
    circuitUserStateTreeDepth,
    circuitEpochTreeDepth,
    circuitNullifierTreeDepth,
    epochLength,
    epochTreeDepth,
    globalStateTreeDepth,
    numEpochKeyNoncePerEpoch,
    maxUsers,
    nullifierTreeDepth,
    numAttestationsPerEpochKey,
    userStateTreeDepth
}