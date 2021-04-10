import { User } from './user/types';
import { Env } from './env/types';

export interface State {
  env: Env;
  user: User;
}
