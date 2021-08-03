import React, { useState, useContext }  from 'react';
import { publishPost } from '../utils';
import { WebContext } from '../context/WebContext';

const PostField = () => {

    const date = new Date().toUTCString();
    const [content, setContent] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const { user, setUser } = useContext(WebContext);
    
    const handleUserInput = (event: any) => {
        setContent(event.target.value);
    }

    const submitPost = async () => {
        if (user === null) {
            console.log('not login yet');
        } else {
            console.log('publish post');
            await publishPost(content, 0, user.identity, 0); // content, epkNonce, identity, minRep
        }
    }

    return (
        <div className="post-block">
            {/* <form onSubmit={submitPost}>
                <input type="text" name="userInput" placeholder="say something..." value={content} onChange={handleUserInput} />
                <input type="submit" value="Post" />
            </form> */}
            <form>
                <input type="text" name="userInput" placeholder="say something..." value={content} onChange={handleUserInput} />
            </form>
            <div onClick={submitPost}>Post</div>
        </div>
    );
};

export default PostField;