import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import debug, { IDebugger } from 'debug';

import CommonRouteConfig from './routes/index.routes.config';
import router from './routes/index.routes';

const app = express();
const PORT = process.env.PORT || 8080;
const routes: Array<CommonRouteConfig> = [];
const debugLog: IDebugger = debug('api');

const logRoutes: IDebugger = debugLog.extend('route');

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(logger('dev'));

router(app, routes);

export default app.listen(PORT, () => {
    debugLog(`Server running on port: ${PORT}`);

    routes.forEach((route: CommonRouteConfig) => {
        logRoutes(`Route configured for -> ${route.getName}`);
    });
});
