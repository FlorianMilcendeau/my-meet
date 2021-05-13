import React, { ReactElement, ComponentType, useEffect } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import Auth from '../../Authentication/Authentication';
import { ProtectedRouteProps } from '../../redux/store/ProtectedRouteStore';

interface Props {
    component: ComponentType<RouteComponentProps<any>>;
    path: string | string[];
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
