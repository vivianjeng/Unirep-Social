import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import useLocalStorage from './useLocalStorage';
import * as Constants from './constants';

import Header from './components/header';
import PostsList from './components/postsList';

import WebContext from './context/WebContext';

const Router = () => {
    const [user, setUser] = useLocalStorage(Constants.userKey, {});
    const [pageStatus, setPageStatus] = useLocalStorage(Constants.pageStatusKey, Constants.PageStatus.None);

    const closeOverlay = () => {
        setPageStatus(Constants.PageStatus.None);
    }

    return (
        <BrowserRouter>
            <div>
            <WebContext.Provider value={{user, setUser, pageStatus, setPageStatus}}>
                <Header />
                <div className="main-content">
                    <Switch>
                        <Route components={PostsList} path="/" exact={true} />
                        <Route component={() => <Redirect to="/" />} />
                    </Switch>
                </div>
                {pageStatus === Constants.PageStatus.SignUp? 
                    <div className="overlay" onClick={closeOverlay}></div> : <div></div>
                }
                </WebContext.Provider>
            </div>
        </BrowserRouter>
    );
};

export default Router;