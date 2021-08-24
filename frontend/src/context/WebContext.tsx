import { createContext } from 'react';
import { Post, User } from '../constants';

type GlobalContent = {
    user: User | null;
    setUser: (u: User | null) => void;
    pageStatus: string;
    setPageStatus: (p: string) => void;
    shownPosts: Post[];
    setShownPosts: (posts: Post[]) => void;
}

export const WebContext = createContext<GlobalContent>({
    user: null,
    setUser: () => {},
    pageStatus: 'none',
    setPageStatus: () => {},
    shownPosts: [],
    setShownPosts: () => {},
});