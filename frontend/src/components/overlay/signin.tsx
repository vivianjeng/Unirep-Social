import React, { useState, useContext } from 'react';
import { WebContext } from '../../context/WebContext';
import * as Constants from '../../constants';
import './overlay.scss';

const SignUp = () => {
    const { setUser, setPageStatus } = useContext(WebContext);
    
    const [userInput, setUserInput] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    const preventCloseBox = (event: any) => {
        event.stopPropagation();
    }

    const handleUserInput = (event: any) => {
        event.stopPropagation();
        setUserInput(event.target.value);
        console.log('user input: ' + userInput);
    }

    const closeBox = () => {
        setPageStatus(Constants.PageStatus.None);
        // setUser({ identity: userInput }); // check if the user exists and login with the private identity
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