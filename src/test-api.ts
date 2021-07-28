import { genIdentity, genIdentityCommitment, serialiseIdentity } from 'libsemaphore'

export const genUserIdentity = () => {
    const id = genIdentity()
    const commitment = genIdentityCommitment(id)

    const serializedIdentity = serialiseIdentity(id)

    console.log(id)
    console.log(commitment)
    console.log(serializedIdentity)
}