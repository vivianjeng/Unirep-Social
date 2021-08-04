export const DEPLOYER_PRIV_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
export const UNIREP = '0x0165878A594ca255338adfa4d48449f69242Eb8F';
export const UNIREP_SOCIAL = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';
export const DEFAULT_ETH_PROVIDER = 'http://localhost:8545'

export const identityPrefix = 'Unirep.identity.'
export const identityCommitmentPrefix = 'Unirep.identityCommitment.'
export const epkProofPrefix = 'Unirep.epkProof.'
export const reputationProofPrefix = 'Unirep.reputationProof.'
export const reputationProofFromAttesterPrefix = 'Unirep.reputationProofFromAttester.'

export const add0x = (str: string): string => {
    str = str.padStart(64,"0")
    return str.startsWith('0x') ? str : '0x' + str
}