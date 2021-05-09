import { IUser } from './user.type';

declare module 'express-serve-static-core' {
    interface Request {
        user: IUser;
    }
}

export interface IUserRequest extends Request {
    user: IUser;
}

