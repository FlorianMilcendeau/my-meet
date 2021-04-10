export const SET_TOKEN = 'SET_TOKEN';

export type Env = {
  token: string | null;
};

export type Token = {
  jwt: string;
  expiresIn: number | string;
};

export interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: string;
}
