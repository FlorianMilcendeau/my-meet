import React, { ReactElement } from 'react';
import { Route } from 'react-router-dom';

/** Components */
import HomeLayout from '../layouts/HomeLayout/HomeLayout';
import { SignInStore } from '../../redux/store/SignInStore';
import { SignUpStore } from '../../redux/store/SignUpStore';

interface props {
  path: string;
}

const AuthenticateRoutes = ({ path }: props): ReactElement => {
  return (
    <>
      <Route
        path={`${path}/sign-up`}
        component={() => <HomeLayout component={SignUpStore} />}
      />
      <Route
        path={`${path}/sign-in`}
        component={() => <HomeLayout component={SignInStore} />}
      />
    </>
  );
};

export default AuthenticateRoutes;
