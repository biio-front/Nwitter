import React from 'react';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import Home from 'routes/Home';
import Auth from 'routes/Auth';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            {isLoggedIn ?
                <>
                    <Route exact path='/'><Home userObj={userObj} /></Route>
                    <Route path='/profile' component={Profile} />
                    <Redirect from='*' to='/' />
                </>
                : <>
                    <Route exact path='/' component={Auth} />
                    <Redirect from='*' to='/' />
                </>
            }
        </Router>
    );
}

export default AppRouter;