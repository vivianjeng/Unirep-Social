import { genIdentity, genIdentityCommitment, serialiseIdentity, unSerialiseIdentity } from 'libsemaphore'
import base64url from 'base64url'
import { ethers } from 'ethers'
import { stringifyBigInts } from 'maci-crypto'
import * as Config from './config'

import UnirepSocial from "./artifacts/contracts/UnirepSocial.sol/UnirepSocial.json"
import Unirep from "./artifacts/contracts/Unirep.sol/Unirep.json"

import { genEpochKey, genUserStateFromContract } from './core/utils'
import { add0x } from './crypto/SMT'
import { genVerifyReputationProofAndPublicSignals, getSignalByNameViaSym, verifyProveReputationProof, formatProofForVerifierContract } from './circuits'

export const userSignUp = async () => {
    const id = genIdentity()
    const commitment = genIdentityCommitment(id)

    const serializedIdentity = serialiseIdentity(id)
    const encodedIdentity = base64url.encode(serializedIdentity)
    console.log(Config.identityPrefix + encodedIdentity)

    const serializedIdentityCommitment = commitment.toString(16)
    const encodedIdentityCommitment = base64url.encode(serializedIdentityCommitment)
    console.log(Config.identityCommitmentPrefix + encodedIdentityCommitment)

    // call server user sign up

    return {i: Config.identityPrefix + encodedIdentity, c: Config.identityCommitmentPrefix + encodedIdentityCommitment}
}

export const publishPost = async (content: string, epkNonce: number, identity: string, minRep: number = 0) => {
    const provider = new ethers.providers.JsonRpcProvider(Config.DEFAULT_ETH_PROVIDER)

    const unirepSocialContract = new ethers.Contract(
        Config.UNIREP_SOCIAL,
        UnirepSocial.abi,
        provider,
    )

    const unirepAddress = await unirepSocialContract.unirep()
    const unirepContract = new ethers.Contract(
        unirepAddress,
        Unirep.abi,
        provider,
    )
    const attestingFee = await unirepContract.attestingFee()
    
    // Validate epoch key nonce
    const numEpochKeyNoncePerEpoch = await unirepContract.numEpochKeyNoncePerEpoch()
    if (epkNonce >= numEpochKeyNoncePerEpoch) {
        console.error('Error: epoch key nonce must be less than max epoch key nonce')
        return
    }

    const encodedIdentity = identity.slice(Config.identityPrefix.length)
    const decodedIdentity = base64url.decode(encodedIdentity)
    const id = unSerialiseIdentity(decodedIdentity)
    const commitment = genIdentityCommitment(id)
    const currentEpoch = (await unirepContract.currentEpoch()).toNumber()
    const treeDepths = await unirepContract.treeDepths()
    const epochTreeDepth = treeDepths.epochTreeDepth
    const epk = genEpochKey(id.identityNullifier, currentEpoch, epkNonce, epochTreeDepth).toString(16)

    // gen reputation proof 
    const proveKarmaAmount = Config.DEFAULT_POST_KARMA

    let circuitInputs: any
    let GSTRoot: any
    let nullifierTreeRoot: any

    console.log('generating proving circuit from contract...')
    
    // Gen epoch key proof and reputation proof from Unirep contract
    const userState = await genUserStateFromContract(
        provider,
        unirepAddress,
        Config.DEFAULT_START_BLOCK,
        id,
        commitment,
    )

    circuitInputs = await userState.genProveReputationCircuitInputs(
        epkNonce,                       // generate epoch key from epoch nonce
        proveKarmaAmount,               // the amount of output karma nullifiers
        minRep                          // the amount of minimum reputation the user wants to prove
    )
    
    GSTRoot = userState.getUnirepStateGSTree(currentEpoch).root
    nullifierTreeRoot = (await userState.getUnirepStateNullifierTree()).getRootHash()
    // }

    const results = await genVerifyReputationProofAndPublicSignals(stringifyBigInts(circuitInputs))
    const nullifiers: BigInt[] = [] 
    
    for (let i = 0; i < Config.MAX_KARMA_BUDGET; i++) {
        const variableName = 'main.karma_nullifiers['+i+']'
        nullifiers.push(getSignalByNameViaSym('proveReputation', results['witness'], variableName))
    }
    
    // TODO: Not sure if this validation is necessary
    const isValid = await verifyProveReputationProof(results['proof'], results['publicSignals'])
    if(!isValid) {
        console.error('Error: reputation proof generated is not valid!')
        return
    }

    const proof = formatProofForVerifierContract(results['proof'])
    const epochKey = BigInt(add0x(epk))

    // generate public signals
    const publicSignals = [
        GSTRoot,
        nullifierTreeRoot,
        BigInt(true),
        Config.DEFAULT_POST_KARMA,
        minRep != null ? BigInt(1) : BigInt(0),
        minRep != null ? BigInt(minRep) : BigInt(0)
    ]

    // to backend: proof, publicSignals, content
}