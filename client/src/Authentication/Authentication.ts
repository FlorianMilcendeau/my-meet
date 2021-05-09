class Authentication {
    protected authenticate: boolean;

    constructor() {
        const data = localStorage.getItem('persist:root');

        if (typeof data === 'string') {
            const { env } = JSON.parse(data);

            const { token } = JSON.parse(env);
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
