import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../models/index.model';
import { IUser, IUserCreate } from '../types/user.type';
import { ICrudDao } from './CrudDao';

class UserDao implements ICrudDao {
    private User;

    constructor(User: Model<IUser>) {
        this.User = User;
    }

    public async create(userFields: IUserCreate) {
        const { email } = userFields;
        try {
            const userId = uuidv4();

            const user = this.User.findOne({ email }).exec();

            if (user) {
                return false;
            }

            const newUser = this.User.create({
                _id: userId,
                ...userFields,
            });

            return newUser;
        } catch (error) {
            console.error(error);
        }
    }

    async getByEmail(email: string) {
        return this.User.findOne({ email }).exec();
    }
}

export default new UserDao(User);
