import { Schema } from 'mongoose';

const UserModel: Schema = new Schema({
    _id: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
});

export default UserModel;
