import React, { useContext, useState } from 'react';
import { WebContext } from '../../context/WebContext';
import { MainPageContext } from '../../context/MainPageContext';
import PostsList from './postsList';
import PostField from './postField';
import './mainPage.scss';

const MainPage = () => {

    const { shownPosts } = useContext(WebContext);

    const [isPostFieldActive, setIsPostFieldActive] = useState(false);
    const [isPostFieldEpkDropdown, setIsPostFieldEpkDropdown] = useState(false);

    const loadMorePosts = () => {
        // setShownPosts([...shownPosts, examplePost]);
        console.log("load more posts, now posts: " + shownPosts.length);
    }

    const closeAll = () => {
        setIsPostFieldActive(false);
        setIsPostFieldEpkDropdown(false);
    }

    return (
        <div className="overlay" onClick={closeAll}>
            <div className="main-content">
                <MainPageContext.Provider value={{isPostFieldActive, setIsPostFieldActive, isPostFieldEpkDropdown, setIsPostFieldEpkDropdown}}>
                    <PostField />
                    <div className="post-list"><PostsList posts={shownPosts} /></div>
                    <div className="main-page-button" onClick={loadMorePosts}>Load More Posts</div>
                </MainPageContext.Provider>
            </div>
        </div>
    );
};

export default MainPage;