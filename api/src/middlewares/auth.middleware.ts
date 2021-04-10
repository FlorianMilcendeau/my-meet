import { body, ValidationChain } from 'express-validator';

class AuthMiddleware {
    static validateBodyRequest(): Array<ValidationChain> {
        return [
            body('email').isEmail().withMessage('e-mail is wrong'),
            body('password')
                .isLength({ min: 8 })
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                ),
        ];
    }
}

export default AuthMiddleware;
