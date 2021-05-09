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

            const newUser = this.User.create({
                ...userFields,
                createdAt: new Date(),
            });

            return newUser;
        } catch (error) {
            return null;
        }
    }

    /**
     *
     * @param {string} id - User id
     * @returns {IUser | null} - A promise to resolve that contains a user or null
     */
    public getById(id: string): Promise<IUser | null> {
        const user = this.User.findById(id).exec();

        return user;
    }

    /**
     *
     * @param {string} email - User email
     * @returns {IUser | null} A promise to resolve that contains a user or null
     */
    public getByEmail(email: string): Promise<IUser | null> {
        const user = this.User.findOne({ email }).exec();

        return user;
    }

    /**
     *
     * @returns A resolution promise that contains an array of user or null
     */
    public findAll(): Promise<IUser[]> {
        const user: Promise<IUser[]> = this.User.find({}).exec();

        return user;
    }

<<<<<<< HEAD
    async deleteByid(id: string): Promise<void> {
=======
    async findAll(): Promise<IUser[]> {
        const user: IUser[] = await this.User.find({}).exec();

        return user;
    }

    async deleteByid(id: string) {
>>>>>>> 939ba8ac383c4c8ebd7c662e9b43b7a8faae1ac7
        await this.User.deleteOne({ _id: id });
    }
}

export default new UserDao(UserModel);
