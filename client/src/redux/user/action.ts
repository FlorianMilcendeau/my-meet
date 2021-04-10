import { SetUserAction, SET_USER, User } from './types';

export const setUserSuccess = (user: User): SetUserAction => ({
  type: SET_USER,
  payload: user,
});
