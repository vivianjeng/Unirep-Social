import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import WebContext from '../context/WebContext';
import { FaUser } from 'react-icons/fa';
import * as Constants from '../constants';

const Header = () => {
    const { user, setUser, pageStatus, setPageStatus } = useContext(WebContext);

    const signUp = () => {
        /// open up popup box ///
        console.log('open sign up! set ' + Constants.PageStatus.SignUp);
        setPageStatus(Constants.PageStatus.SignUp);
    }

    const printUser = () => {
        console.log('user length is ' + user.length);
    }

    return (
        <header>
            <div className="navLinks">
                <NavLink to="/" className="link" activeClassName="active" exact>
                    UNIREP SOCIAL
                </NavLink>
            </div>
            {user && user.length > 0? 
                <div className="navButtons">
                    <div className="userInfo" onClick={printUser}><FaUser /></div>
                </div> :
                <div className="navButtons">
                    <div className="signupButton" onClick={signUp}> SignUp</div>
                    <div className="signinButton"> SignIn</div>
                </div>
                
            }   
        </header>
    );
}

export default Header;