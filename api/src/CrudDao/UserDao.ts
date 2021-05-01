import { Model } from 'mongoose';

import UserModel from '../models/index.model';
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
            const user = await this.User.findOne({ email }).exec();

            if (user) {
                return null;
            }

            const newUser = await this.User.create({
                ...userFields,
            });

            return newUser;
        } catch (error) {
            return null;
        }
    }

    async getByEmail(email: string): Promise<IUser | null> {
        const user = await this.User.findOne({ email }).exec();

        return user;
    }

    async findAll(): Promise<IUser[]> {
        const user: IUser[] = await this.User.find({}).exec();

        return user;
    }

    async deleteByid(id: string) {
        await this.User.deleteOne({ _id: id });
    }
}

export default new UserDao(UserModel);
