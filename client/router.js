import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import useLocalStorage from './useLocalStorage';

import Header from './components/header';
import PostsList from './components/postsList';

import UserContext from './context/UserContext';

const Router = () => {
    const [user, setUser] = useLocalStorage('user', {});
    return (
        <BrowserRouter>
            <div>
            <UserContext.Provider value={{user, setUser}}>
                <Header />
                <div className="main-content">
                    <Switch>
                        <Route components={PostsList} path="/" exact={true} />
                    </Switch>
                </div>
                </UserContext.Provider>
            </div>
        </BrowserRouter>
    );
};

export default Router;