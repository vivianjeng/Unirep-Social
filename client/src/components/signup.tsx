import React, { useState, useContext } from 'react';
import { WebContext } from '../context/WebContext';
import * as Constants from '../constants';
import { FaTwitter, FaCheck } from 'react-icons/fa';
import base64url from 'base64url';
// import { genIdentity, genIdentityCommitment, serialiseIdentity } from 'libsemaphore';
import { ethers } from 'ethers';
import UnirepSocial from "../artifacts/contracts/UnirepSocial.sol/UnirepSocial.json";

const SignUp = () => {
    const { setUser, setPageStatus } = useContext(WebContext);
    
    // step 0: sign up with twitter / others
    // step 1: private key randomly generated
    // step 2: confirm private key
    const [step, setStep] = useState(0);
    const [privateKey, setPrivateKey] = useState("75av86YRG34MG9297388723987"); // got from api
    const [userInput, setUserInput] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const DEFAULT_ETH_PROVIDER = 'http://localhost:8545';
    const identityPrefix = 'Unirep.identity.';
    const identityCommitmentPrefix = 'Unirep.identityCommitment.';
    const unirepSocial = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';
    const deployerPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
    const id = 'WyJlOGQ2NGU5OThhM2VmNjAxZThjZTNkNDQwOWQyZjc3MjEwOGJkMGI1NTgwODAzYjY2MDk0YTllZWExMzYxZjA2IiwiODZiYjk5ZGQ4MzA2ZGVkZDgxYTE4MzBiNmVjYmRlZjk5ZmVjYTU3M2RiNjIxMjk5NGMyMmJlMWEwMWZmMTEiLCIzMGE3M2MxMjE4ODQwNjE0MWQwYmI4NWRjZDY5ZjdhMjEzMWM1NWRkNDQzYWNmMGVhZTEwNjI2NzBjNDhmYSJd278';
    const commitment = 'MTI0ZWQ1YTc4NjYzMWVhODViY2YzZDI4NWFhOTA5MzFjMjUwOTEzMzljYzAzODU3YTVlMzY5ZWYxZmI2NTAzNw';

    const preventCloseBox = (event: any) => {
        event.stopPropagation();
    }

    const add0x = (str: string): string => {
        str = str.padStart(64,"0")
        return str.startsWith('0x') ? str : '0x' + str
    }

    const nextStep = async (event: any) => {
        event.stopPropagation();

        if (step === 0) {
            console.log(id);
            console.log(commitment);

            const provider = new ethers.providers.JsonRpcProvider(DEFAULT_ETH_PROVIDER);
            const wallet = new ethers.Wallet(deployerPrivateKey, provider);
            const unirepSocialContract = new ethers.Contract(
                unirepSocial,
                UnirepSocial.abi,
                wallet,
            );
            const decodedCommitment = base64url.decode(commitment);
            const signupCommitment = add0x(decodedCommitment);

            let tx
            try {
                tx = await unirepSocialContract.userSignUp(
                    signupCommitment,
                    { gasLimit: 1000000 }
                )

            } catch(e) {
                console.error('Error: the transaction failed')
                if (e.message) {
                    console.error(e.message)
                }
                return
            }

            const receipt = await tx.wait()
            console.log(receipt.hash)
        }

        setStep((prevState) => (prevState + 1));
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