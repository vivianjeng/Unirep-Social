import React, { useState, useContext } from 'react';
import WebContext from '../context/WebContext';
import { FaSearch } from 'react-icons/fa';
import PostsList from './postsList';

const MainPage = () => {

    const { shownPosts, setShownPosts } = useContext(WebContext);
    const [searchInput, setSearchInput] = useState("");

    const handleSearchInput = (event) => {
        console.log("search input : " + event.target.value);
    }

    const loadMorePosts = () => {
        const examplePost = {
            id: Math.floor(Math.random() * 10000000),
            title: 'Post Title',
            content: 'Iaculis a consequat ut laoreet pretium, neque, at. Pellentesque a sapien rhoncus ut tincidunt phasellus laoreet nisl, et. Id cursus viverra lobortis pharetra tortor curabitur id. Mauris tincidunt duis vulputate eget posuere adipiscing.',
            vote: 200,
            epoch_key: 'xyz',
            username: 'cutie',
            post_time: Date.now(),
        };
        setShownPosts([...shownPosts, examplePost]);

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