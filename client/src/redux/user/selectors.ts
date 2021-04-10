import { State } from '../types';
import { User } from './types';

export const userSelector = ({ user }: State): User => user;
