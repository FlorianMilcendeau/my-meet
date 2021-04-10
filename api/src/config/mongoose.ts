import mongoose from 'mongoose';
import debug, { IDebugger } from 'debug';

const log: IDebugger = debug('api:config:mongoose');

class Mongoose {
    private _mongoose: typeof mongoose;

    private count = 0;

    private dbName: string = process.env.DB_NAME || '';

    private dbUser: string = process.env.DB_USER || '';

    private dbPassword: string = process.env.DB_PASSWORD || '';

    private mongooseOption = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false,
        user: this.dbUser,
        pass: this.dbPassword,
    };

    constructor(mongo: typeof mongoose) {
        this.connectionWithRetry();
        this._mongoose = mongo;
    }

    public get getMongoose() {
        return this._mongoose;
    }

    private connectionWithRetry(): void {
        log('Attempting MongoDB connection (will retry if needed)');

        mongoose
            .connect(
                `mongodb://db-dev:27017/${this.dbName}?authSource=admin`,
                this.mongooseOption,
            )
            .then(() => {
                log('MongoDB is connected');
            })
            .catch((err) => {
                const retrySeconds = 5;

                this.count += 1;

                log(
                    `MongoDB connection unsuccessful (will retry #${this.count} after ${retrySeconds} seconds):`,
                    err,
                );

                setTimeout(
                    () => this.connectionWithRetry(),
                    retrySeconds * 1000,
                );
            });
    }
}

export default new Mongoose(mongoose);
