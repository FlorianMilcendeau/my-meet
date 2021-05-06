import React, { ReactNode, useEffect } from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import Auth from '../../Authentication/Authentication';

interface Props {
    component: ReactNode;
}

const ProtectedRoute = ({ component: Component, ...rest }: Props) => {
    useEffect(() => {}, []);
    return (
        <Route
            {...rest}
            render={(props) =>
                Auth.isAuthenticate ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/authenticate/sign-in' }} />
                )
            }
        />
    );
};

export default ProtectedRoute;
