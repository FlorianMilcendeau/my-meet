import mongoose from 'mongoose';
import debug, { IDebugger } from 'debug';

const log: IDebugger = debug('api:config:mongoose');

class Mongoose {
    private count: number = 0;

    private dbName = process.env.DB_NAME;
    private dbUser = process.env.DB_USER;
    private dbPassword = process.env.DB_PASSWORD;

    private mongooseOption = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false,
        dbName: this.dbName,
        user: this.dbUser,
        pass: this.dbPassword,
    };

    constructor() {
        this.connectionWithRetry();
    }

    public get getMongoose() {
        return mongoose;
    }

    private connectionWithRetry(): void {
        log('Attempting MongoDB connection (will retry if needed)');

        mongoose
            .createConnection(
                `mongodb://db-dev:27017/${this.dbName}`,
                this.mongooseOption,
            )
            .then(() => {
                log('MongoDB is connected');
            })
            .catch((err) => {
                const retrySeconds = 5;

                log(
                    `MongoDB connection unsuccessful (will retry #${++this
                        .count} after ${retrySeconds} seconds):`,
                    err,
                );

                setTimeout(this.connectionWithRetry, retrySeconds * 1000);
            });
    }
}

export default new Mongoose();
