import { Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface IUserDecoded {
    id: string;
    name: string;
    email: string;
    exp: number;
    iat: number;
}

export interface IUserCreate {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}
