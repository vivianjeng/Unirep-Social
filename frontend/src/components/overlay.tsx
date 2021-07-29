import React, { useContext } from 'react';
import { WebContext } from '../context/WebContext';
import * as Constants from '../constants';
import SignUp from './signup';
import SignIn from './signin';

const Overlay = () => {
    const { pageStatus, setPageStatus } = useContext(WebContext);

    const closeOverlay = () => {
        console.log('close over lay');
        setPageStatus(Constants.PageStatus.None);
    }

    return (
        <div className="overlay" onClick={closeOverlay}>
            {pageStatus === Constants.PageStatus.SignUp? 
                <SignUp /> : pageStatus == Constants.PageStatus.SignIn?
                <SignIn /> : <div></div>}
        </div>
    );
}

export default Overlay;