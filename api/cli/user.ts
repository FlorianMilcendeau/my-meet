/* eslint-disable no-console */
import program from 'commander';
import User from '../src/CrudDao/UserDao';
import { IUser } from '../src/types/user.type';

program.version('1.0.0').description('Client Management System');

program
    .command('find <email>')
    .alias('f')
    .description('Find a user by email')
    .action(async (email: string) => {
        try {
            const user: IUser | null = await User.getByEmail(email);

            console.info(user);
        } catch (error) {
            console.error(error);
        }
    });

program
    .command('findAll')
    .alias('f')
    .description('Find a user by email')
    .action(async (email: string) => {
        try {
            const users: IUser[] = await User.findAll();

            console.info(users);
            console.info(`${users.length} users`);
        } catch (error) {
            console.error(error);
        }
    });

program
    .command('create <name> <email> <password>')
    .alias('c')
    .description('Create a user')
    .action(async (name: string, email: string, password: string) => {
        try {
            const user = await User.create({
                name,
                email,
                password,
                createdAt: new Date(),
            });

            console.info('success !!', user);
        } catch (error) {
            console.error(error);
        }
    });

program
    .command('delete <id>')
    .alias('d')
    .description('Delete a user by id')
    .action(async (id: string) => {
        try {
            await User.deleteByid(id);

            console.info('success !!');
        } catch (error) {
            console.error(error);
        }
    });

program.parse(process.argv);
