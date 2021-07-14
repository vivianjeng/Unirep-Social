import React, { useState, useContext } from 'react';
import { WebContext } from '../context/WebContext';
import * as Constants from '../constants';
import { FaTwitter, FaCheck } from 'react-icons/fa';

const SignUp = () => {
    const { setUser, setPageStatus } = useContext(WebContext);
    
    
    // step 0: sign up with twitter / others
    // step 1: private key randomly generated
    // step 2: confirm private key
    const [step, setStep] = useState(0);
    const [privateKey, setPrivateKey] = useState("75av86YRG34MG9297388723987"); // got from api
    const [userInput, setUserInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const preventCloseBox = (event: any) => {
        event.stopPropagation();
    }

    const nextStep = (event: any) => {
        event.stopPropagation();
        setStep((prevState) => (prevState + 1));
        // console.log('sign up step: ' + step);
    }

    const previousStep = (event: any) => {
        event.stopPropagation();
        setStep((prevState) => (prevState > 0? prevState - 1 : 0));
        // console.log('sign up step: ' + step);
    }

    const copyPrivateKey = (event: any) => {
        event.stopPropagation();
        // console.log('copy private key: ' + privateKey);
    }

    const downloadPrivateKey = (event: any) => {
        event.stopPropagation();
        // console.log('download private key: ' + privateKey);
    }

    const handleUserInput = (event: any) => {
        event.stopPropagation();
        setUserInput(event.target.value);
        if (event.target.value !== privateKey) {
            setErrorMsg("wrong private key");
        } else {
            setErrorMsg("");
        }
    }

    const closeBox = async () => {
        setPageStatus(Constants.PageStatus.None);
        setUser({ private_key: privateKey });
    }

    return (
        <div className="signBox" onClick={preventCloseBox}>
            <div className="sign-title">
                <h3>{
                    step === 0?
                    "Sign Up With" : step === 1?
                    "Protect Your Private Key" : step === 2?
                    "Confirm Your Private Key" : "Sign Up Error"
                }</h3> 
            </div>
            {
                step === 0?
                <div className="signup-with">
                    {/* should change to real functioned connect to twitter account */}
                    <div className="signup-with-twitter" onClick={nextStep}>
                        <FaTwitter />
                    </div>
                </div> : step === 1?
                <div>
                    <div className="sign-private-key" onClick={copyPrivateKey}>
                        <div className="signup-private-key-text">{privateKey}</div>
                        <div className="signup-private-key-status"><FaCheck /></div>
                    </div>
                    <div className="sign-message">
                        Record this private key and store it safely. You will need it to regain access to your reputation score.
                    </div>
                    <div className="sign-buttons">
                        <div className="sign-button-purple" onClick={downloadPrivateKey}>Download Private Key</div>
                        <div className="margin-box"></div>
                        <div className="sign-button-grey" onClick={nextStep}>Next</div>
                    </div>
                </div> : step === 2?
                <div className="sign-confirm">
                    <div className="sign-private-key">
                        <form>
                            <input type="text" name="userInput" placeholder="enter your private key" onChange={handleUserInput} />
                        </form>
                    </div>
                    {errorMsg !== ''? 
                        <div className="sign-error-message">
                            {errorMsg}
                        </div> : <div></div>
                    }
                    <div className="sign-message">
                        ... some message
                    </div>
                    <div className="sign-button-black" onClick={closeBox}>Confirm</div>
                    <div className="sign-button-white" onClick={previousStep}>{"<<Back"}</div>
                </div> : <div>{errorMsg}</div>
            } 
        </div>
    );
}

export default SignUp;