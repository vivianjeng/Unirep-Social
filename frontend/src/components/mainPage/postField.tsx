import React, { useState, useContext }  from 'react';
import { publishPost } from '../../utils';
import { WebContext } from '../../context/WebContext';
import { MainPageContext } from '../../context/MainPageContext';
import './mainPage.scss';
import Choice from './choices';

const PostField = () => {

    const date = new Date().toUTCString();
    const [content, setContent] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [reputation, setReputation] = useState(0);
    const [epkNonce, setEpkNonce] = useState(0); // maybe it should be the first available epk

    const { user, shownPosts, setShownPosts } = useContext(WebContext);
    const { 
        isPostFieldActive, 
        setIsPostFieldActive,
        isPostFieldEpkDropdown, 
        setIsPostFieldEpkDropdown 
    } = useContext(MainPageContext);

    const shrinkDropdown = (event:any) => {
        event.stopPropagation();
        setIsPostFieldEpkDropdown(false);
    }

    const activateInput = (event: any) => {
        event.stopPropagation();
        setIsPostFieldActive(true);
    }

    const handleUserInput = (event: any) => {
        setContent(event.target.value);
    }

    const changeReputation = (event: any) => {
        setReputation(event.target.value);
    }

    const switchEpkDropdown = (event: any|null) => {
        if (event != null) {
            event.stopPropagation();
        }
        setIsPostFieldEpkDropdown(!isPostFieldEpkDropdown);
    }

    const changeEpk = (epk: string) => {
        if (user != null) {
            setEpkNonce(user.epoch_keys.indexOf(epk));
            switchEpkDropdown(null);
        }  
    }

    const submitPost = async () => {
        if (user === null) {
            console.log('not login yet.');
        } else if (content == "") {
            console.log('not enter anything yet.');
        } else {
            console.log('publish post');
            const ret = await publishPost(content, epkNonce, user.identity, 0); // content, epkNonce, identity, minRep
            if (ret !== undefined) {
                const newPost = {
                    id: ret.postId,
                    title: 'title',
                    content,
                    upvote: 0,
                    downvote: 0,
                    epoch_key: ret.epk,
                    username: 'username',
                    post_time: Date.now(),
                    transaction_done: false,
                }
                setShownPosts([newPost, ...shownPosts]);
            } else {
                console.error('publish post error.');
            }
        }
        // after submit, all input are cleared and initialized
    }

    return (
        <div className="post-field">
            <div className="post-title">Post</div>
            {isPostFieldActive && user && user.identity ?
                <div className="post-field-after" onClick={shrinkDropdown}>
                    <textarea name="userInput" placeholder="Share something!" onChange={handleUserInput}></textarea>
                    <div className="setting-area">
                        <h3>Display</h3>
                        <p>The following selection will display with your comment.</p>
                        <div className="setting-epk">
                            <label>Epoch Key <span>?</span></label>
                            {isPostFieldEpkDropdown? <div className="epk-dropdown">
                                <div className="epk" onClick={switchEpkDropdown}>
                                    <img src="/images/arrow-down.png"/>
                                    <span>{epkNonce >= 0? user.epoch_keys[epkNonce] : 'Choose an epock key'}</span>
                                    <img src="/images/arrow-down.png"/>
                                </div>
                                <div className="divider"></div>
                                {
                                    user.epoch_keys.map((epk, index) => (
                                        <Choice className="epk" key={epk} setState={(value) => changeEpk(value)} value={user.epoch_keys[index]}/>
                                    ))
                                }
                            </div> : <div className="epk epk-with-border" onClick={switchEpkDropdown}>
                                <img src="/images/arrow-down.png"/>
                                <span>{epkNonce >= 0? user.epoch_keys[epkNonce] : 'Choose an epock key'}</span>
                                <img src="/images/arrow-down.png"/>
                            </div>}
                        </div>
                        <div className="setting-reputation">
                            <label>Reputation Score <span>?</span></label>
                            <br/>
                            <textarea name="repInput" placeholder="Enter a number between 10-xxx" onChange={changeReputation}></textarea>
                        </div>
                    </div>
                    <div className="submit-btn" onClick={submitPost}>
                        Post
                    </div>
                </div> : 
                <div className="post-field-before">
                    <div className="input-field" onClick={activateInput}>{content.length > 0? content : "Share something!"}</div>
                </div>
            }
        </div>
    );
};

export default PostField;