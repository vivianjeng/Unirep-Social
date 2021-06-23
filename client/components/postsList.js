import React from 'react';
import PostBlock from './postBlock';

const PostsList = (props) => {
    return (
        <div className="post-list">
            {props.posts.length > 0? (
                props.posts.map((post) => (
                    <PostBlock post={post} />
                ))
            ) : <p>No posts are available.</p>}
        </div>
    );
}

export default PostsList;