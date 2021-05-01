import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import AuthenticateRoutes from './AuthenticateRoutes';

const Root = (): ReactElement => {
    return (
        <Router>
            <Switch>
                <AuthenticateRoutes path="/authenticate" />
                <Redirect to="/authenticate/sign-in" />
            </Switch>
        </Router>
    );
};

export default Root;
