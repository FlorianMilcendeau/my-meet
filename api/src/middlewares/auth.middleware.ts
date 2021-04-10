import { body } from 'express-validator';

class AuthMiddleware {
    validateBodyRequest() {
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

export default new AuthMiddleware();
