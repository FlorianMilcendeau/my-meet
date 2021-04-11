import { Application } from 'express';

import AuthController from '../controllers/auth.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import CommonRouteConfig from './index.routes.config';

const signUp = AuthController.signUp.bind(AuthController);
const signIn = AuthController.signIn.bind(AuthController);

class AuthRoutes extends CommonRouteConfig {
    constructor(app: Application) {
        super(app, 'AuthRoutes');
    }

    configureRoute(): Application {
        this.app.post(
            '/api/authenticate/sign-up',
            AuthMiddleware.validateBodyRequest(),
            signUp,
        );
        this.app.post(
            '/api/authenticate/sign-in',
            AuthMiddleware.validateBodyRequest(),
            signIn,
        );
        return this.app;
    }
}

export default AuthRoutes;
