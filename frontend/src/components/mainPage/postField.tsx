import React, { useState, useContext }  from 'react';
import { publishPost } from '../../utils';
import { WebContext } from '../../context/WebContext';
import { MainPageContext } from '../../context/MainPageContext';
import { FaUser } from 'react-icons/fa';
import './mainPage.scss';
import Choice from './choices';

const PostField = () => {

    const date = new Date().toUTCString();
    const [content, setContent] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [reputation, setReputation] = useState(0);
    const [epkNonce, setEpkNonce] = useState(-1); // maybe it should be the first available epk

    const { user, shownPosts, setShownPosts } = useContext(WebContext);
    const { 
        isPostFieldActive, 
        setIsPostFieldActive, 
        isPostFieldRepDropdown, 
        setIsPostFieldRepDropdown, 
        isPostFieldEpkDropdown, 
        setIsPostFieldEpkDropdown 
    } = useContext(MainPageContext);

    const shrinkDropdown = (event:any) => {
        event.stopPropagation();
        setIsPostFieldRepDropdown(false);
        setIsPostFieldEpkDropdown(false);
    }

    const activateInput = (event: any) => {
        event.stopPropagation();
        setIsPostFieldActive(true);
    }

    const handleUserInput = (event: any) => {
        setContent(event.target.value);
    }

    const switchReputationDropdown = (event: any|null) => {
        if (event != null) {
            event.stopPropagation();
        }
        setIsPostFieldRepDropdown(!isPostFieldRepDropdown);
    }

    const changeReputation = (r: string) => {
        setReputation(Number(r));
        switchReputationDropdown(null);
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
            {isPostFieldActive && user && user.identity ?
                <div className="post-field-after" onClick={shrinkDropdown}>
                    <h3>Post</h3>
                    <textarea name="userInput" placeholder="Share something!" onChange={handleUserInput}></textarea>
                    <div className="setting-area">
                        <div className="setting-username">
                            <label>Show Username</label>
                            <div className="setting-username-row">
                                <p>username</p>
                                <label className="switch">
                                    <input type="checkbox"/>
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                        <div className="setting-reputation">
                            <label>Show Reputation</label>
                            {isPostFieldRepDropdown? <div className="reputation-dropdown">
                                <div className="reputation-choice" onClick={switchReputationDropdown}>
                                    <span>{"> "}{reputation}</span>
                                </div>
                                <div className="divider"></div>
                                <Choice className="reputation-choice" setState={(value) => changeReputation(value)} value="0" />
                                <Choice className="reputation-choice" setState={(value) => changeReputation(value)} value="10" />
                                <Choice className="reputation-choice" setState={(value) => changeReputation(value)} value="20" />
                            </div> : <div className="reputation" onClick={switchReputationDropdown}>
                                    <span>{"> "}{reputation}</span>
                                    <img src="/images/arrow-down.png"/>
                                </div>}
                        </div>
                        <div className="setting-epk">
                            <label>Show Epoch Key</label>
                            {isPostFieldEpkDropdown? <div className="epk-dropdown">
                                <div className="epk-choice" onClick={switchEpkDropdown}>{epkNonce >= 0? user.epoch_keys[epkNonce] : 'Choose an epock key'}</div>
                                <div className="divider"></div>
                                {
                                    user.epoch_keys.map((epk, index) => (
                                        <Choice className="epk-choice" key={epk} setState={(value) => changeEpk(value)} value={user.epoch_keys[index]}/>
                                    ))
                                }
                            </div> : <div className="epk" onClick={switchEpkDropdown}>
                                <span>{epkNonce >= 0? user.epoch_keys[epkNonce] : 'Choose an epock key'}</span>
                                <img src="/images/arrow-down.png"/>
                            </div>}
                        </div>
                        <div className="submit-btn" onClick={submitPost}>
                            Share
                        </div>
                    </div>
                </div> : 
                <div className="post-field-before">
                    <h3>Post</h3>
                    <div className="row-before">
                        <div className="user-image"><FaUser /></div>
                        <div className="input-field" onClick={activateInput}>{content.length > 0? content : "Share something!"}</div>
                    </div>
                </div>
            }
        </div>
    );
};

export default PostField;