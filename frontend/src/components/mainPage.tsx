import React, { useState, useContext } from 'react';
import { WebContext } from '../context/WebContext';
import { FaSearch } from 'react-icons/fa';
import PostsList from './postsList';

const MainPage = () => {

    const { shownPosts, setShownPosts } = useContext(WebContext);
    const [searchInput, setSearchInput] = useState<string>("");

    const handleSearchInput = (event: any) => {
        console.log("search input : " + event.target.value);
    }

    const loadMorePosts = () => {
        // setShownPosts([...shownPosts, examplePost]);
        console.log("load more posts, now posts: " + shownPosts.length);
    }

    return (
        <div className="main-content">
            <div className="search-bar">
                <form>
                    <input type="text" name="searchInput" placeholder="Search" onChange={handleSearchInput} />
                </form>
                <div className="search-icon"><FaSearch /></div>
            </div>
            <div className="post-list"><PostsList posts={shownPosts} /></div>
            <div className="main-page-button" onClick={loadMorePosts}>Load More Posts</div>
        </div>
    );
};

export default MainPage;