import { createContext } from 'react';
import { Post, User } from '../constants';

const examplePost = {
    id: '19348297',
    title: 'Post Title',
    content: 'Iaculis a consequat ut laoreet pretium, neque, at. Pellentesque a sapien rhoncus ut tincidunt phasellus laoreet nisl, et. Id cursus viverra lobortis pharetra tortor curabitur id. Mauris tincidunt duis vulputate eget posuere adipiscing.',
    vote: 200,
    epoch_key: 'xyz',
    username: 'cutie',
    post_time: Date.now(),
};

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
    shownPosts: [examplePost],
    setShownPosts: () => {},
});