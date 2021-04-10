import Mongoose from '../config/mongoose';
import { IUser } from '../types/user.type';
import UserModel from './user.model';

const mongoose = Mongoose.getMongoose;

export const User = mongoose.model<IUser>('User', UserModel);
