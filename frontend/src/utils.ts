import { genIdentity, genIdentityCommitment, serialiseIdentity, unSerialiseIdentity } from 'libsemaphore'
import base64url from 'base64url'
import { ethers } from 'ethers'
import { stringifyBigInts } from 'maci-crypto'
import * as config from './config'

import UnirepSocial from "./artifacts/contracts/UnirepSocial.sol/UnirepSocial.json"
import Unirep from "./artifacts/contracts/Unirep.sol/Unirep.json"

import { genEpochKey, genUserStateFromContract } from './core/utils'
import { add0x } from './crypto/SMT'
import { genVerifyReputationProofAndPublicSignals, getSignalByNameViaSym, verifyProveReputationProof, formatProofForVerifierContract } from './circuits'

const genProof = async (identity: string, epkNonce: number = 0, proveKarmaAmount: number, minRep: number = 0) => {
    const provider = new ethers.providers.JsonRpcProvider(config.DEFAULT_ETH_PROVIDER)

    const unirepSocialContract = new ethers.Contract(
        config.UNIREP_SOCIAL,
        UnirepSocial.abi,
        provider,
    )

    const unirepAddress = await unirepSocialContract.unirep()
    const unirepContract = new ethers.Contract(
        unirepAddress,
        Unirep.abi,
        provider,
    )
    
    // Validate epoch key nonce
    const numEpochKeyNoncePerEpoch = await unirepContract.numEpochKeyNoncePerEpoch()
    if (epkNonce >= numEpochKeyNoncePerEpoch) {
        console.error('Error: epoch key nonce must be less than max epoch key nonce')
        return
    }

    const encodedIdentity = identity.slice(config.identityPrefix.length)
    const decodedIdentity = base64url.decode(encodedIdentity)
    const id = unSerialiseIdentity(decodedIdentity)
    const commitment = genIdentityCommitment(id)
    const currentEpoch = (await unirepContract.currentEpoch()).toNumber()
    const treeDepths = await unirepContract.treeDepths()
    const epochTreeDepth = treeDepths.epochTreeDepth
    const epk = genEpochKey(id.identityNullifier, currentEpoch, epkNonce, epochTreeDepth).toString(16)

    let circuitInputs: any
    let GSTRoot: any
    let nullifierTreeRoot: any

    console.log('generating proving circuit from contract...')
    
    // Gen epoch key proof and reputation proof from Unirep contract
    const userState = await genUserStateFromContract(
        provider,
        unirepAddress,
        config.DEFAULT_START_BLOCK,
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

    console.log('genVerifyReputationProofAndPublicSignals...')
    const results = await genVerifyReputationProofAndPublicSignals(stringifyBigInts(circuitInputs))
    console.log(results)
    
    const nullifiers = results['publicSignals'].slice(0, config.MAX_KARMA_BUDGET)
    
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
        config.DEFAULT_POST_KARMA,
        minRep !== 0 ? BigInt(1) : BigInt(0),
        minRep !== 0 ? BigInt(minRep) : BigInt(0)
    ]

    return {epochKey, proof, publicSignals, nullifiers}
}

export const userSignUp = async () => {
    const id = genIdentity()
    const commitment = genIdentityCommitment(id)

    const serializedIdentity = serialiseIdentity(id)
    const encodedIdentity = base64url.encode(serializedIdentity)
    console.log(config.identityPrefix + encodedIdentity)

    const serializedIdentityCommitment = commitment.toString(16)
    const encodedIdentityCommitment = base64url.encode(serializedIdentityCommitment)
    console.log(config.identityCommitmentPrefix + encodedIdentityCommitment)

    // call server user sign up

    return {i: config.identityPrefix + encodedIdentity, c: config.identityCommitmentPrefix + encodedIdentityCommitment}
}

export const publishPost = async (content: string, epkNonce: number, identity: string, minRep: number = 0) => {
    const ret = await genProof(identity, epkNonce, config.DEFAULT_POST_KARMA, minRep)
    
    if (ret === undefined) {
        console.error('genProof error, ret is undefined.')
        return
    }

     // to backend: proof, publicSignals, content
    
    return {epk: ret.epochKey.toString()}
}

export const vote = async(identity: string, upvote: number|undefined, downvote: number|undefined, postId: number, receiver: string, epkNonce: number = 0, minRep: number = 0) => {
    // upvote / downvote user 
    const graffiti = BigInt(0)
    const overwriteGraffiti = false
    const upvoteValue = upvote != null ? upvote : 0
    const downvoteValue = downvote != null ? downvote : 0
    const voteValue = upvoteValue + downvoteValue

    const ret = await genProof(identity, epkNonce, voteValue, minRep)
    if (ret === undefined) {
        console.error('genProof error, ret is undefined.')
        return
    }

    // send publicsignals, proof, voted post id, receiver epoch key, graffiti to backend  

    return {epk: ret.epochKey.toString()} 
}

export const leaveComment = async(identity: string, content: string, postId: number, epkNonce: number = 0, minRep: number = 0) => {
    const ret = await genProof(identity, epkNonce, config.DEFAULT_COMMENT_KARMA, minRep)
    if (ret === undefined) {
        console.error('genProof error, ret is undefined.')
        return
    }

    // send proof, publicSignals, postid, content, epockKey to backend

    return {epk: ret.epochKey.toString()}
}