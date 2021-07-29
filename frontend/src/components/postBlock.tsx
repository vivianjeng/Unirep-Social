import React from 'react';
import { FaArrowUp, FaArrowDown, FaComment, FaShare, FaCheck } from 'react-icons/fa';
import { Post } from '../constants';

type Props = {
    post: Post,
}

const PostBlock = ({ post } : Props) => {

    const date = new Date(post.post_time).toUTCString();

    return (
        <div className="post-block">
            <div className="post-block-vote">
                <div><FaArrowUp /></div>
                <div>{post.vote}</div>
                <div><FaArrowDown /></div>
            </div>
            <div className="post-block-main">
                <div className="post-block-info">posted by {post.epoch_key}, {date}</div>
                <div className="post-block-title">{post.title}</div>
                <div className="post-block-content">{post.content}</div>
                <div className="post-block-bottom-row">
                    <div className="post-block-button"><FaComment /><span>Comment</span></div>
                    <div className="post-block-button"><FaShare /><span>Share</span></div>
                    <div className="post-block-button"><FaCheck /><span>Status</span></div>
                </div>
            </div>
        </div>
    );
};

export default PostBlock;