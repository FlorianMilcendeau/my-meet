import { Application } from 'express';

import CommonRouteConfig from './index.routes.config';
import IndexControllers from '../controllers/index.controllers';
import AuthRoutes from './auth.routes';

class IndexRoutes extends CommonRouteConfig {
    constructor(app: Application) {
        super(app, 'IndexRoutes');
    }

    configureRoute(): Application {
        this.app.get('/api', IndexControllers.get);
        return this.app;
    }
}

export default (
    app: Application,
    routes: Array<CommonRouteConfig>,
): Array<CommonRouteConfig> => {
    routes.push(new IndexRoutes(app));
    routes.push(new AuthRoutes(app));

    return routes;
};
