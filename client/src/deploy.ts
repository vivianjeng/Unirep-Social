import { ethers } from 'ethers';
import UnirepSocial from "./artifacts/contracts/UnirepSocial.sol/UnirepSocial.json";
import { UNIREP_SOCIAL, DEFAULT_ETH_PROVIDER, DEPLOYER_PRIV_KEY } from './constants';

const provider = new ethers.providers.JsonRpcProvider(DEFAULT_ETH_PROVIDER);
const wallet = new ethers.Wallet(DEPLOYER_PRIV_KEY, provider);
const unirepSocialContract = new ethers.Contract(
    UNIREP_SOCIAL,
    UnirepSocial.abi,
    wallet,
);
const dbUri = 'mongodb://127.0.0.1:27017/test';

const add0x = (str: string): string => {
    str = str.padStart(64,"0")
    return str.startsWith('0x') ? str : '0x' + str
}

export const genUserIdentity = () => {
//     return {encodedIdentity, encodedIdentityCommitment};
}

export const userSignUp = async (encodedIdentityCommitment: string) => {
    // return {receipt}
}

export const listAllPosts = async () => {
    
}