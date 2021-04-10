import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/** Reducers */
import userReducer from './user/reducer';
import envReducer from './env/reducer';

const rootReducer = combineReducers({ env: envReducer, user: userReducer });

export default createStore(
  combineReducers({ env: envReducer, user: userReducer }),
  composeWithDevTools(applyMiddleware(thunk)),
);

export type rootState = ReturnType<typeof rootReducer>;
