import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="links">
                <NavLink to="/" className="link" activeClassName="active" exact>
                    UNIREP SOCIAL
                </NavLink>
            </div>
        </header>
    );
}

export default Header;