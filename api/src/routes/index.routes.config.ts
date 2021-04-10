import { Application } from 'express';

export abstract class CommonRouteConfig {
    protected name: string;
    protected app: Application;

    constructor(app: Application, name: string) {
        this.app = app;
        this.name = name;

        this.configureRoute();
    }

    get getName() {
        return this.name;
    }

    protected abstract configureRoute(): Application;
}
