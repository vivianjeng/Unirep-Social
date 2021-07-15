import base64url, { Base64Url } from 'base64url';
import { genIdentity, genIdentityCommitment, serialiseIdentity } from 'libsemaphore';
import { ethers } from 'ethers';
import UnirepSocial from "./artifacts/contracts/UnirepSocial.sol/UnirepSocial.json";
import { UNIREP_SOCIAL, DEFAULT_ETH_PROVIDER, DEPLOYER_PRIV_KEY } from './constants';

const add0x = (str: string): string => {
    str = str.padStart(64,"0")
    return str.startsWith('0x') ? str : '0x' + str
}

// export const genUserIdentity = () => {
//     const id = genIdentity();
//     const commitment = genIdentityCommitment(id);
//     const serializedIdentity = serialiseIdentity(id);
//     const encodedIdentity = base64url.encode(serializedIdentity);
//     const serializedIdentityCommitment = commitment.toString(16);
//     const encodedIdentityCommitment = base64url.encode(serializedIdentityCommitment);

//     return {encodedIdentity, encodedIdentityCommitment};
// }

export const userSignUp = async (encodedIdentityCommitment: string) => {
    const provider = new ethers.providers.JsonRpcProvider(DEFAULT_ETH_PROVIDER);
    const wallet = new ethers.Wallet(DEPLOYER_PRIV_KEY, provider);
    const unirepSocialContract = new ethers.Contract(
        UNIREP_SOCIAL,
        UnirepSocial.abi,
        wallet,
    );
    const decodedCommitment = base64url.decode(encodedIdentityCommitment);
    const signupCommitment = add0x(decodedCommitment);

    let tx
    try {
        tx = await unirepSocialContract.userSignUp(
            signupCommitment,
            { gasLimit: 1000000 }
        )
    } catch(e) {
        console.error('Error: the transaction failed')
        if (e.message) {
            console.error(e.message)
        }
        return
    }

    const receipt = await tx.wait()
    console.log(receipt.hash)
}