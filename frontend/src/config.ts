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

const UNIREP = '0x0165878A594ca255338adfa4d48449f69242Eb8F'
const UNIREP_SOCIAL = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'

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
    UNIREP,
    UNIREP_SOCIAL,
}