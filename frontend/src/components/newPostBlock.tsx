import React from 'react';
import { FaArrowUp, FaArrowDown, FaComment, FaShare, FaCheck } from 'react-icons/fa';
import { Post } from '../constants';

type Props = {
    post: Post,
}

const NewPostBlock = () => {

    const handleUserInput = (event: any) => {
        console.log(event.target.value);
    }

    return (
        <div className="post-block">
            <div className="new-post-text-field">
                <form>
                    <input type="text" name="userInput" placeholder="New Post..." onChange={handleUserInput} />
                </form>
            </div>
            <div className="new-post-button">
                POST
            </div>
        </div>
    );
};

export default NewPostBlock;