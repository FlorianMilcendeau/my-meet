class Authentication {
    protected authenticate: boolean;

    constructor() {
        this.authenticate = false;
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
