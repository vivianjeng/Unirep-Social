import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header';
import PostsList from './components/postsList';

const Router = () => {
    // const [books, setBooks] = useLocalStorage('books', []);
    return (
        <BrowserRouter>
            <div>
                <Header />
                <div className="main-content">
                    <Switch>
                        <Route components={PostsList} path="/" exact={true} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Router;