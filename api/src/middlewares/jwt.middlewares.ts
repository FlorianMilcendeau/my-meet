import { Response, Request, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import fs from 'fs'
import path from 'path'

import { IUserDecoded } from '../types/user.type';
import JsonWebToken from '../utils/jwt';

/** Read private key */
const pathToPubKey = path.join(__dirname, '../../', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf-8');

class JwtMiddleware {
    private _key: string;

    constructor() {
        this._key = PUB_KEY;
    }

    public verifyToken(req: Request, res: Response, next: NextFunction) {
        // Get token.
        const token =
            req.headers.authorization &&
            JsonWebToken.extract(req.headers.authorization);

        // If the token does not exist.
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Error. Need a token',
            });
        }

        // Verify Json Web Token.
        return jwt.verify(
            token,
            this._key,
            {
                clockTimestamp: Date.now(),
                algorithms: ['RS256'],
            },
            // eslint-disable-next-line @typescript-eslint/ban-types
            (err: VerifyErrors | null, decoded: object | undefined) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: err.message,
                    });
                }

                if (decoded) {
                    const {
                        iat,
                        exp,
                        ...user
                    }: IUserDecoded = decoded as IUserDecoded;

                    // If the token is valid
                    req.user = user;
                }

                return next();
            },
        );
    }
}

export default new JwtMiddleware();
