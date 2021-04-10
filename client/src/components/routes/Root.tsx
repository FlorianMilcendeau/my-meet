import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import AuthenticateRoutes from './AuthenticateRoutes';

const Root = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <AuthenticateRoutes path="/authenticate" />
      </Switch>
    </Router>
  );
};

export default Root;
