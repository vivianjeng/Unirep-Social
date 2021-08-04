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
}

export interface Post {
    id: string,
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