import { SET_TOKEN, SetTokenAction } from './types';

export const setToken = (token: string): SetTokenAction => ({
  type: SET_TOKEN,
  payload: token,
});
