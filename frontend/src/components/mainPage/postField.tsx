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
    const [epk, setEpk] = useState("choose an epoch key");

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

    const changeEpk = (epk: string) => {
        setEpk(epk);
        switchEpkDropdown();
    }

    const submitPost = async () => {
        if (user === null) {
            console.log('not login yet');
        } else {
            console.log('publish post');
            const ret = await publishPost(content, 0, user.identity, 0); // content, epkNonce, identity, minRep
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
                }
                setShownPosts([newPost, ...shownPosts]);
            } else {
                console.error('publish post error.');
            }
        }
    }

    return (
        <div className="post-field">
            {isActive?
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
                                <div className="epk-choice" onClick={switchEpkDropdown}>{epk}</div>
                                <div className="divider"></div>
                                <div className="epk-choice" onClick={() => changeEpk('epoch key 1')}>epoch key 1</div>
                                <div className="epk-choice" onClick={() => changeEpk('epoch key 2')}>epoch key 2</div>
                            </div> : <div className="epk" onClick={switchEpkDropdown}>
                                <span>{epk}</span>
                                <img src="/images/arrow-down.png"/>
                            </div>}
                        </div>
                        <div className="submit-btn">
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