import React, { useState, useContext } from 'react';
import { WebContext } from '../context/WebContext';
import PostsList from './postsList';
import NewPostBlock from './newPostBlock';
import { listAllPosts } from '../deploy';

const MainPage = () => {

    const { shownPosts, setShownPosts } = useContext(WebContext);

    const loadMorePosts = () => {
        // const examplePost = {
        //     id: Math.floor(Math.random() * 10000000),
        //     title: 'Post Title',
        //     content: 'Iaculis a consequat ut laoreet pretium, neque, at. Pellentesque a sapien rhoncus ut tincidunt phasellus laoreet nisl, et. Id cursus viverra lobortis pharetra tortor curabitur id. Mauris tincidunt duis vulputate eget posuere adipiscing.',
        //     vote: 200,
        //     epoch_key: 'xyz',
        //     username: 'cutie',
        //     post_time: Date.now(),
        // };
        // setShownPosts([...shownPosts, examplePost]);

        listAllPosts();
        // console.log("load more posts, now posts: " + shownPosts.length);
    }

    return (
        <div className="main-content">
            <div><NewPostBlock /></div>
            <div className="post-list"><PostsList posts={shownPosts} /></div>
            <div className="main-page-button" onClick={loadMorePosts}>Load More Posts</div>
        </div>
    );
};

export default MainPage;