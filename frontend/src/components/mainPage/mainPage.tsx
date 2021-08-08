import React, { useState, useContext } from 'react';
import { WebContext } from '../../context/WebContext';
import PostsList from './postsList';
import PostField from './postField';
import './mainPage.scss';

const MainPage = () => {

    const { shownPosts, setShownPosts } = useContext(WebContext);

    const loadMorePosts = () => {
        // setShownPosts([...shownPosts, examplePost]);
        console.log("load more posts, now posts: " + shownPosts.length);
    }

    return (
        <div className="main-content">
            <PostField />
            <div className="post-list"><PostsList posts={shownPosts} /></div>
            <div className="main-page-button" onClick={loadMorePosts}>Load More Posts</div>
        </div>
    );
};

export default MainPage;