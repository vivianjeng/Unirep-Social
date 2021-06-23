import React, { useState, useContext } from 'react';
import WebContext from '../context/WebContext';
import * as Constants from '../constants';
import { FaTwitter, FaCheck } from 'react-icons/fa';

const SignUp = () => {
    const { setUser, setPageStatus } = useContext(WebContext);
    
    const [userInput, setUserInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const preventCloseBox = (event) => {
        event.stopPropagation();
    }

    const handleUserInput = (event) => {
        event.stopPropagation();
        setUserInput(event.target.value);
        console.log('user input: ' + userInput);
    }

    const closeBox = () => {
        setPageStatus(Constants.PageStatus.None);
        setUser({ privateKey: userInput }); // check if the user exists and login with the private identity
    }

    return (
        <div className="signBox" onClick={preventCloseBox}>
            <div className="sign-title">
                <h3>Sign In With Private Key</h3> 
            </div>
            <div className="sign-confirm">
                <div className="sign-private-key">
                    <form>
                        <input type="text" name="userInput" placeholder="enter your private key" onChange={handleUserInput} />
                    </form>
                </div>
                <div className="sign-message">
                    ... some message
                </div>
                <div className="sign-button-black" onClick={closeBox}>Confirm</div>
            </div>
        </div>
    );
}

export default SignUp;