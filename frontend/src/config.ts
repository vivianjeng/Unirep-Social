import { ethers } from 'ethers'

const identityPrefix = 'Unirep.identity.'
const identityCommitmentPrefix = 'Unirep.identityCommitment.'
const epkProofPrefix = 'Unirep.epkProof.'
const reputationProofPrefix = 'Unirep.reputationProof.'
const reputationProofFromAttesterPrefix = 'Unirep.reputationProofFromAttester.'

const DEFAULT_ETH_PROVIDER = 'http://localhost:8545'
const DEFAULT_START_BLOCK = 0
const DEFAULT_MAX_EPOCH_KEY_NONCE = 2
const DEFAULT_NUM_ATTESTATIONS_PER_EPOCH_KEY = 6
const DEFAULT_EPOCH_LENGTH = 30
const DEFAULT_ATTESTING_FEE = ethers.utils.parseEther("0.01")
const DEFAULT_TREE_DEPTHS_CONFIG = 'circuit'
const DEFAULT_POST_KARMA = 10
const MAX_KARMA_BUDGET = 10
const DEFAULT_AIRDROPPED_KARMA = 20

const UNIREP = '0x0165878A594ca255338adfa4d48449f69242Eb8F'
const UNIREP_SOCIAL = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'

const circuitGlobalStateTreeDepth = 4;
const circuitUserStateTreeDepth = 4;
const circuitEpochTreeDepth = 8;
const circuitNullifierTreeDepth = 128;
const globalStateTreeDepth = 4;
const userStateTreeDepth = 4;
const epochTreeDepth = 4;
const nullifierTreeDepth = 128;
const maxUsers = 2 ** globalStateTreeDepth - 1;
const attestingFee = ethers.utils.parseEther("0.01")
const numEpochKeyNoncePerEpoch = 2;
const numAttestationsPerEpochKey = 6;
const epochLength = 30; 

export {
    identityPrefix,
    identityCommitmentPrefix,
    epkProofPrefix,
    reputationProofPrefix,
    reputationProofFromAttesterPrefix,
    DEFAULT_ETH_PROVIDER,
    DEFAULT_START_BLOCK,
    DEFAULT_MAX_EPOCH_KEY_NONCE,
    DEFAULT_NUM_ATTESTATIONS_PER_EPOCH_KEY,
    DEFAULT_EPOCH_LENGTH,
    DEFAULT_ATTESTING_FEE,
    DEFAULT_TREE_DEPTHS_CONFIG,
    DEFAULT_POST_KARMA,
    MAX_KARMA_BUDGET,
    DEFAULT_AIRDROPPED_KARMA,
    UNIREP,
    UNIREP_SOCIAL,
    circuitGlobalStateTreeDepth,
    circuitUserStateTreeDepth,
    circuitEpochTreeDepth,
    circuitNullifierTreeDepth,
    userStateTreeDepth,
    epochTreeDepth,
    nullifierTreeDepth,
    maxUsers,
    attestingFee,
    numEpochKeyNoncePerEpoch,
    numAttestationsPerEpochKey,
    epochLength,
    globalStateTreeDepth
}