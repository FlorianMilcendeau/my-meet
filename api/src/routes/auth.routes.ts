import { Application } from 'express';
import userController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { CommonRouteConfig } from './index.routes.config';

export class AuthRoutes extends CommonRouteConfig {
    constructor(app: Application) {
        super(app, 'AuthRoutes');
    }

    configureRoute(): Application {
        this.app.post(
            '/authenticate/sign-up',
            authMiddleware.validateBodyRequest(),
            userController.post,
        );
        return this.app;
    }
}
