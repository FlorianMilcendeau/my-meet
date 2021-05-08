import React, { ReactElement } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { ProtectedRouteStore } from '../../redux/store/ProtectedRouteStore';
import AuthenticateRoutes from './AuthenticateRoutes';
import Room from '../views/meet/Room';

const Root = (): ReactElement => {
    return (
        <Switch>
            <AuthenticateRoutes path="/authenticate" />
            <ProtectedRouteStore component={Room} path="/room" />
            <Redirect to="/authenticate/sign-in" />
        </Switch>
    );
};

export default Root;
