import React, { ReactElement, ReactNode, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../Authentication/Authentication';
import { ProtectedRouteProps } from '../../redux/store/ProtectedRouteStore';

interface Props {
    component: ReactNode;
}

const ProtectedRoute = ({
    component: Component,
    verifyToken,
    ...rest
}: Props & ProtectedRouteProps): ReactElement => {
    useEffect(() => {
        verifyToken();
    }, []);

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
