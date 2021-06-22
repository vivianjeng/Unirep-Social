import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { FaUser } from 'react-icons/fa';

const Header = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <header>
            <div className="navLinks">
                <NavLink to="/" className="link" activeClassName="active" exact>
                    UNIREP SOCIAL
                </NavLink>
            </div>
            {user.length == 0? 
                <div className="navButtons">
                    <div className="signupButton"> SignUp</div>
                    <div className="signinButton"> SignIn</div>
                </div> : 
                <div className="navButtons">
                    <div className="userInfo"><FaUser /></div>
                </div> 
            }   
        </header>
    );
}

export default Header;