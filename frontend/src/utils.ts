import { genIdentity, genIdentityCommitment, serialiseIdentity } from 'libsemaphore'
import base64url from 'base64url'

const identityPrefix = 'Unirep.identity.'
const identityCommitmentPrefix = 'Unirep.identityCommitment.'

export const genUserIdentity = () => {
    const id = genIdentity()
    const commitment = genIdentityCommitment(id)

    const serializedIdentity = serialiseIdentity(id)
    const encodedIdentity = base64url.encode(serializedIdentity)
    console.log(identityPrefix + encodedIdentity)

    const serializedIdentityCommitment = commitment.toString(16)
    const encodedIdentityCommitment = base64url.encode(serializedIdentityCommitment)
    console.log(identityCommitmentPrefix + encodedIdentityCommitment)

    return {i: identityPrefix + encodedIdentity, c: identityCommitmentPrefix + encodedIdentityCommitment}
}