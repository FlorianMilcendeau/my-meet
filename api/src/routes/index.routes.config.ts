import { Application } from 'express';

abstract class CommonRouteConfig {
    protected name: string;

    protected app: Application;

    constructor(app: Application, name: string) {
        this.app = app;
        this.name = name;

        this.configureRoute();
    }

    get getName(): string {
        return this.name;
    }

    protected abstract configureRoute(): Application;
}

export default CommonRouteConfig;
