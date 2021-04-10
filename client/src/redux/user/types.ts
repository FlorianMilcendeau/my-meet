import { Token } from '../env/types';

export const SET_USER = 'SET_USER';

export interface User {
  id: number | null;
  name: string;
  email: string;
  createdAt: Date | null;
}

export interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

export type UserLogin = {
  email: string;
  password: string;
};

export interface UserRegister extends UserLogin {
  name: string;
}

export interface ResponseAuth {
  success: boolean;
  user: User;
  token: Token;
}
