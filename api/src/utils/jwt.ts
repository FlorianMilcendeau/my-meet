import jwt from 'jsonwebtoken';

interface IUser {
    _id: string;
    name: string;
    email: string;
}

class JsonWebToken {
    private _key: string;

    constructor() {
        this._key = process.env.SECRET_KEY_JWT || '';
    }

    /**
     * Generate Json Web Token
     *
     * @param {object} user
     * @returns {{token: string, expiresIn: number}} Json Web Token and his expiration.
     */
    generate(user: IUser) {
        const { _id, name, email } = user;

        // Init payload
        const payload = {
            id: _id,
            name,
            email,
            iat: Date.now(),
        };

        // expires in 2 weeks.
        const expiresIn = Date.now() + 1000 * (60 * 60) * 24 * 7;

        // token generated and singed.
        const signedToken = jwt.sign(payload, this._key, {
            expiresIn,
            algorithm: 'HS256',
        });

        return {
            expiresIn,
            token: `Bearer ${signedToken}`,
        };
    }

    /**
     * Extraction of the Json Web Token
     *
     * @param {string} token
     * @returns {(false|string)} False if not a string, otherwise the token.
     */
    public extract(token: string): null | string {
        // extract the "Bearer" from token..

        const regExp = new RegExp(/(Bearer)\s+(\S+)/, 'i');
        const matches: RegExpMatchArray | null = regExp.exec(token);

        return matches && matches[2];
    }
}

export default new JsonWebToken();
