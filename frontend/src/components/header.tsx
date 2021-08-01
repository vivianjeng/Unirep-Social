import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { WebContext } from '../context/WebContext';
import { FaUser } from 'react-icons/fa';
import * as Constants from '../constants';

const Header = () => {
    const { user, setUser, pageStatus, setPageStatus } = useContext(WebContext);

    const signUp = () => {
        console.log('open sign up! set ' + Constants.PageStatus.SignUp);
        setPageStatus(Constants.PageStatus.SignUp);
    }

    const signIn = () => {
        console.log('open sign in! set ' + Constants.PageStatus.SignIn);
        setPageStatus(Constants.PageStatus.SignIn);
    }

    const printUser = () => {
        if (user != null) {
            console.log('user is ' + user.identity);
        }
    }

    return (
        <header>
            <div className="navLinks">
                <NavLink to="/" className="link" activeClassName="active" exact>
                    UNIREP SOCIAL
                </NavLink>
            </div>
            {user && user.identity? 
                <div className="navButtons">
                    <div className="userInfo" onClick={printUser}><FaUser /></div>
                </div> :
                <div className="navButtons">
                    <div className="signupButton" onClick={signUp}> SignUp</div>
                    <div className="signinButton" onClick={signIn}> SignIn</div>
                </div>
                
            }   
        </header>
    );
}

export default Header;