import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AxiosResponse } from 'axios';
import { rootState } from '..';
import api from '../../utils/http';
import { setToken } from '../env/actions';
import { setUserSuccess } from './action';
import { ResponseAuth, UserLogin, UserRegister } from './types';

/**
 *  Function asynchrone for login the user
 *  and to set all his info.
 *
 * @param {object} user
 * @param {string} user.email
 * @param {string} user.password
 */
export const userLogin = (
  user: UserLogin,
): ThunkAction<void, rootState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  const response: AxiosResponse<ResponseAuth> = await api.post<ResponseAuth>(
    '/authenticate/sign-in',
    user,
  );

  const { user: userInfo, token } = response.data;

  api.setToken = token.token;

  console.log(token.token);
  
  dispatch(setToken(token.token));
  dispatch(setUserSuccess(userInfo));
};

/**
 *  Function asynchrone for register the user
 *  and to set all his info.
 *
 * @param {object} user
 * @param {string} user.name
 * @param {string} user.email
 * @param {string} user.password
 */
export const userRegister = (
  user: UserRegister,
): ThunkAction<void, rootState, unknown, Action<string>> => async (
  dispatch: Dispatch,
) => {
  const response: AxiosResponse<ResponseAuth> = await api.post<ResponseAuth>(
    '/authenticate/sign-up',
    user,
  );

  const { user: userInfo, token } = response.data;

  api.setToken = token.token;

  dispatch(setToken(token.token));
  dispatch(setUserSuccess(userInfo));
};
