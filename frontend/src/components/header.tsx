import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { WebContext } from '../context/WebContext';
import { FaUser, FaSearch } from 'react-icons/fa';
import * as Constants from '../constants';

const Header = () => {
    const { user, setUser, pageStatus, setPageStatus } = useContext(WebContext);
    const [searchInput, setSearchInput] = useState<string>("");

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

    const handleSearchInput = (event: any) => {
        console.log("search input : " + event.target.value);
    }

    return (
        <header>
            <div className="navLinks">
                <NavLink to="/" className="link" activeClassName="active" exact>
                    UNIREP SOCIAL
                </NavLink>
            </div>
            <div className="search-bar">
                <div className="search-icon"><FaSearch /></div>
                <form>
                    <input type="text" name="searchInput" placeholder="Search by keyword, user names or epoch key" onChange={handleSearchInput} />
                </form>
            </div>
            {user && user.identity? 
                <div className="navButtons">
                    <div className="userInfo" onClick={printUser}><FaUser /></div>
                </div> :
                <div className="navButtons">
                    <div className="signupButton" onClick={signUp}> Sign Up</div>
                    <div className="signinButton" onClick={signIn}> Sign In</div>
                </div>
                
            }   
        </header>
    );
}

export default Header;