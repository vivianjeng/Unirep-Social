export const DEFAULT_ETH_PROVIDER = 'http://localhost:8545';
export const IDENTITY_PREFIX = 'Unirep.identity.';
export const COMMITMENT_PREFIX = 'Unirep.identityCommitment.';
export const UNIREP_SOCIAL = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';
export const DEPLOYER_PRIV_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';


export const pageStatusKey = "pageStatus";
export const userKey = "user";
export const shownPostsKey = "shownPosts";

export interface WebState {
    user: { private_key: string };
    pageStatus: string;
    shownPosts: Post[];
}

export interface User {
    identity: string,
    commitment: string,
}

export interface Post {
    id: number,
    title: string,
    content: string,
    vote: number,
    epoch_key: string,
    username: string,
    post_time: number,
}

export enum PageStatus {
    None = 'none',
    SignUp = 'signup',
    SignIn = 'signin',
}