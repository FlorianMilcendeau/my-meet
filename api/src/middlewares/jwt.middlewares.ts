class JwtMiddleware {
    private _key: string | undefined;

    constructor() {
        this._key = process.env.SECRET_KEY_JWT;
    }

    public generateToken() {}

    public verifyToken() {}

    /** Extraction of the Json Web Token
     *
     * @param {string} token
     * @returns {(false|string)} False if not a string, otherwise the token.
     */
    public extractToken(token: string) {
        // extract the "Bearer" from token..
        const matches: RegExpMatchArray | null = token.match(
            /(Bearer)\s+(\S+)/i,
        );

        return matches && matches[2];
    }
}
