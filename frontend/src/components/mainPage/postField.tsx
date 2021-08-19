import React, { useState, useContext }  from 'react';
import { publishPost } from '../../utils';
import { WebContext } from '../../context/WebContext';
import { FaUser } from 'react-icons/fa';
import './mainPage.scss';

const PostField = () => {

    const date = new Date().toUTCString();
    const [isActive, setIsActive] = useState(false);
    const [content, setContent] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isReputationDropdown, setIsReputationDropdown] = useState(false);
    const [reputation, setReputation] = useState(0);
    const [isEpkDropdown, setIsEpkDropdown] = useState(false);
    const [epkNonce, setEpkNonce] = useState(-1); // maybe it should be the first available epk

    const { user, setUser } = useContext(WebContext);
    const { shownPosts, setShownPosts } = useContext(WebContext);
    
    const activateInput = (event: any) => {
        setIsActive(true);
    }

    const handleUserInput = (event: any) => {
        setContent(event.target.value);
    }

    const switchReputationDropdown = () => {
        setIsReputationDropdown((prevState) => !prevState);
    }

    const changeReputation = (r: number) => {
        setReputation(r);
        switchReputationDropdown();
    }

    const switchEpkDropdown = () => {
        setIsEpkDropdown((prevState) => !prevState);
    }

    const changeEpk = (index: number) => {
        setEpkNonce(index);
        switchEpkDropdown();
    }

    const submitPost = async () => {
        if (user === null) {
            console.log('not login yet');
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
    }

    return (
        <div className="post-field">
            {isActive && user && user.identity ?
                <div className="post-field-after">
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
                            {isReputationDropdown? <div className="reputation-dropdown">
                                <div className="reputation-choice" onClick={switchReputationDropdown}>
                                    <span>{"> "}{reputation}</span>
                                </div>
                                <div className="divider"></div>
                                <div className="reputation-choice" onClick={() => changeReputation(0)}>{">"} 0</div>
                                <div className="reputation-choice" onClick={() => changeReputation(10)}>{">"} 10</div>
                                <div className="reputation-choice" onClick={() => changeReputation(20)}>{">"} 20</div>
                            </div> : <div className="reputation" onClick={switchReputationDropdown}>
                                    <span>{"> "}{reputation}</span>
                                    <img src="/images/arrow-down.png"/>
                                </div>}
                        </div>
                        <div className="setting-epk">
                            <label>Show Epoch Key</label>
                            {isEpkDropdown? <div className="epk-dropdown">
                                <div className="epk-choice" onClick={switchEpkDropdown}>{epkNonce >= 0? user.epoch_keys[epkNonce] : 'Choose an epock key'}</div>
                                <div className="divider"></div>
                                {
                                    user.epoch_keys.map((epk, index) => (
                                        <div className="epk-choice" key={epk} onClick={() => changeEpk(index)}>{user.epoch_keys[index]}</div>
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