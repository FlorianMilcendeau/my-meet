import { Application } from 'express';

import AuthController from '../controllers/auth.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import CommonRouteConfig from './index.routes.config';

class AuthRoutes extends CommonRouteConfig {
    constructor(app: Application) {
        super(app, 'AuthRoutes');
    }

    configureRoute(): Application {
        this.app.post(
            '/api/authenticate/sign-up',
            AuthMiddleware.validateBodyRequest(),
            AuthController.signUp,
        );
        this.app.post(
            '/api/authenticate/sign-in',
            AuthMiddleware.validateBodyRequest(),
            AuthController.signIn,
        );
        return this.app;
    }
}

export default AuthRoutes;
