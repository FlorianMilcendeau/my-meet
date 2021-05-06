import { Application } from 'express';

import AuthController from '../controllers/auth.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import jwtMiddlewares from '../middlewares/jwt.middlewares';
import CommonRouteConfig from './index.routes.config';

const signUp = AuthController.signUp.bind(AuthController);
const signIn = AuthController.signIn.bind(AuthController);
const verifyAuth = AuthController.verifyAuth.bind(AuthController);
const verifyToken = jwtMiddlewares.verifyToken.bind(jwtMiddlewares);

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
        this.app.post('/api/authenticate/verify', verifyToken, verifyAuth);
        return this.app;
    }
}

export default AuthRoutes;
