import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from 'routes/Home';
import Auth from 'routes/Auth';

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn
                ? <Route exact path='/' component={Home} />
                : <Route exact path='/' component={Auth} />
            }
        </Router>
    );
}

export default AppRouter;