import { rootState } from '../redux';
import { Env } from '../redux/env/types';

class Authentication {
    protected authenticate: boolean;

    constructor() {
        const data = localStorage.getItem('persist:root');

        if (typeof data === 'string') {
            const { env } = JSON.parse(data) as rootState;

            const { token } = JSON.parse((env as unknown) as string) as Env;
            this.authenticate = !!token;
        } else {
            this.authenticate = false;
        }
    }

    public logIn(cb: () => void) {
        this.authenticate = true;
        cb();
    }

    public logOut(cb: () => void) {
        this.authenticate = false;
        cb();
    }

    get isAuthenticate() {
        return this.authenticate;
    }
}

export default new Authentication();
