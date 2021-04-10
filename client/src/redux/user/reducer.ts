import { SetUserAction, SET_USER, User } from './types';

const user: User = {
  id: null,
  name: '',
  email: '',
  createdAt: null,
};

const userReducer = (state: User = user, action: SetUserAction): User => {
  switch (action.type) {
    case SET_USER:
      return { ...action.payload };

    default:
      return state;
  }
};

export default userReducer;
