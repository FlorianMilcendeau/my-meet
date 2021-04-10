import { Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export interface IUserCreate {
    name: string;
    email: string;
    password: string;
}
