import React from 'react';
import { FaArrowUp, FaArrowDown, FaComment, FaShare, FaCheck } from 'react-icons/fa';

const PostBlock = (props) => {

    const date = new Date(props.post.post_time).toUTCString();

    return (
        <div className="post-block">
            <div className="post-block-vote">
                <div><FaArrowUp /></div>
                <div>{props.post.vote}</div>
                <div><FaArrowDown /></div>
            </div>
            <div className="post-block-main">
                <div className="post-block-info">posted by {props.post.epoch_key}, {date}</div>
                <div className="post-block-title">{props.post.title}</div>
                <div className="post-block-content">{props.post.content}</div>
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