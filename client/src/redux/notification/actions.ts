import { INotify, ISetNotify, SET_NOTIFY } from './types';

export const setNotify = (notification: INotify): ISetNotify => ({
    type: SET_NOTIFY,
    payload: notification,
});
