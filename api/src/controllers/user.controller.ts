import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserDao from '../CrudDao/UserDao';
import { IUserCreate } from '../types/user.type';

class UserController {
    async post(req: Request, res: Response) {
        const errors = validationResult(req);

        try {
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array });
            }

            const user: IUserCreate = req.body;

            const newUser = await UserDao.create(user);

            if (!newUser) {
                return res.status(409).json({
                    success: false,
                    message: 'Account already exist.',
                });
            }

            return res.status(201).json({ ...newUser });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new UserController();
