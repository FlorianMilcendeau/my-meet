import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AxiosResponse } from 'axios';
import { push } from 'connected-react-router';
import { rootState } from '..';
import api from '../../utils/http';
import { setToken } from '../env/actions';
import { setUserSuccess, startLoadingUser, stopLoadingUser } from './action';
import { ResponseAuth, User, UserLogin, UserRegister } from './types';
import Authentication from '../../Authentication/Authentication';

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
    try {
        dispatch(startLoadingUser());
        const response: AxiosResponse<ResponseAuth> = await api.post<ResponseAuth>(
            '/authenticate/sign-in',
            user,
        );

        const { user: userInfo, token } = response.data;

        api.setToken = token.token;

        dispatch(setToken(token.token));
        dispatch(setUserSuccess(userInfo));
        Authentication.logIn(() => dispatch(push('/room')));

        dispatch(stopLoadingUser());
    } catch (e) {
        dispatch(stopLoadingUser());
    }
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
    try {
        dispatch(startLoadingUser());
        const response: AxiosResponse<ResponseAuth> = await api.post<ResponseAuth>(
            '/authenticate/sign-up',
            user,
        );

        const { user: userInfo, token } = response.data;

        api.setToken = token.token;

        dispatch(setToken(token.token));
        dispatch(setUserSuccess(userInfo));
        Authentication.logIn(() => dispatch(push('/room')));

        dispatch(stopLoadingUser());
    } catch (e) {
        dispatch(stopLoadingUser());
    }
};

/**
 *  Function asynchrone to verify the json web token.
 *
 */
export const verifyToken = (): ThunkAction<
    void,
    rootState,
    unknown,
    Action<string>
> => async (dispatch: Dispatch, getState) => {
    try {
        dispatch(startLoadingUser());

        const {
            env: { token },
            user,
            router: {
                location: { pathname },
            },
        } = getState();

        if (token) {
            api.setToken = token as string;
        }

        const response: AxiosResponse<{ user: User }> = await api.post<{
            user: User;
        }>('/authenticate/verify', user);

        const { user: userInfo } = response.data;

        dispatch(setUserSuccess(userInfo));
        Authentication.logIn(() =>
            dispatch(
                push(
                    window.location.pathname !== pathname
                        ? window.location.pathname
                        : pathname,
                ),
            ),
        );

        dispatch(stopLoadingUser());
    } catch (e) {
        Authentication.logOut(() => dispatch(push('/authenticate/sign-in')));
        dispatch(stopLoadingUser());
    }
};
