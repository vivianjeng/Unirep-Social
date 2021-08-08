import React, { useState, useContext } from 'react';
import { FaArrowUp, FaArrowDown, FaComment, FaShare, FaCheck } from 'react-icons/fa';
import { Post } from '../../constants';
import { vote, leaveComment } from '../../utils';
import { WebContext } from '../../context/WebContext';
import './mainPage.scss';


type Props = {
    post: Post,
}

const PostBlock = ({ post } : Props) => {

    const date = new Date(post.post_time).toUTCString();
    const [ showComment, setShowComment ] = useState(false);
    const [ comment, setComment ] = useState("");
    const { user, setUser } = useContext(WebContext);
    const { shownPosts, setShownPosts } = useContext(WebContext);

    const upvote = async () => {
        if (user === null) {
            console.error('user not login!');
        } else {
            const ret = await vote(user.identity, 1, undefined, post.id, post.epoch_key);
            console.log('upvote ret: ' + JSON.stringify(ret))
            const filteredPosts = shownPosts.filter((p) => p.id != post.id)
            post.vote += 1
            setShownPosts([post, ...filteredPosts])
        }
    }

    const downvote = async () => {
        if (user === null) {
            console.error('user not login!');
        } else {
            const ret = await vote(user.identity, undefined, 1, post.id, post.epoch_key);
            console.log('downvote ret: ' + JSON.stringify(ret))
            const filteredPosts = shownPosts.filter((p) => p.id != post.id)
            post.vote -= 1
            setShownPosts([post, ...filteredPosts])
        }
    }

    const handleUserInput = (event: any) => {
        setComment(event.target.value);
    }

    const submitComment = async () => {
        if (user === null) {
            console.error('user not login!');
        } else {
            const ret = await leaveComment(user.identity, comment, post.id)
        }
    }

    const switchComment = () => {
        setShowComment((prevState) => !prevState);
    }

    return (
        <div className="post-block">
            <div className="post-block-vote">
                <div onClick={upvote}><FaArrowUp /></div>
                <div>{post.vote}</div>
                <div onClick={downvote}><FaArrowDown /></div>
            </div>
            <div className="post-block-main">
                <div className="post-block-info">posted by {post.epoch_key}, {date}</div>
                <div className="post-block-title">{post.title}</div>
                <div className="post-block-content">{post.content}</div>
                <div className="post-block-bottom-row">
                    <div className="post-block-button" onClick={switchComment}><FaComment /><span>Comment</span></div>
                    <div className="post-block-button"><FaShare /><span>Share</span></div>
                    <div className="post-block-button"><FaCheck /><span>Status</span></div>
                </div>
                { showComment? 
                    <div>
                        <form>
                            <input type="text" name="userInput" placeholder="say something..." value={comment} onChange={handleUserInput} />
                        </form>
                        <div onClick={submitComment}>Comment</div>
                    </div> : <div></div>
                }
            </div>
        </div>
    );
};

export default PostBlock;