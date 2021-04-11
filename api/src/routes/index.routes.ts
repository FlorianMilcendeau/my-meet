import { Application } from 'express';

import CommonRouteConfig from './index.routes.config';
import IndexControllers from '../controllers/index.controllers';
import AuthRoutes from './auth.routes';

const get = IndexControllers.get.bind(IndexControllers);
class IndexRoutes extends CommonRouteConfig {
    constructor(app: Application) {
        super(app, 'IndexRoutes');
    }

    configureRoute(): Application {
        this.app.get('/api', get);
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
