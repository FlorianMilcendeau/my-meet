import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { User as UserModel } from '../models/index.model';
import { IUser, IUserCreate } from '../types/user.type';
import { ICrudDao } from './CrudDao';

class UserDao implements ICrudDao {
    private User;

    constructor(User: Model<IUser>) {
        this.User = User;
    }

    /**
     * Create a new user
     *
     * @param {IUserCreate} userFields
     * @returns {IUser | null | undefined} - Returns false if a user already exists otherwise the user's info.
     */
    public async create(
        userFields: IUserCreate,
    ): Promise<IUser | null | undefined> {
        const { email } = userFields;
        try {
            const userId = uuidv4();

            const user = await this.User.findOne({ email }).exec();

            if (user) {
                return null;
            }

            const newUser = await this.User.create({
                _id: userId,
                ...userFields,
            });

            return newUser;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getByEmail(email: string): Promise<IUser | null> {
        const user = await this.User.findOne({ email }).exec();

        return user;
    }
}

export default new UserDao(UserModel);
