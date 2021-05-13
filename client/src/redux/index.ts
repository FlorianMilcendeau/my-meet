import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

/** Reducers */
import userReducer from './user/reducer';
import envReducer from './env/reducer';
import notifyReducer from './notification/reducer';

const NODE_ENV = process.env.NODE_ENV || 'development';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    notification: notifyReducer,
    env: envReducer,
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'env', 'router'],
};

const enhancer =
    NODE_ENV === 'development'
        ? composeWithDevTools(
              applyMiddleware(thunk),
              applyMiddleware(routerMiddleware(history)),
          )
        : applyMiddleware(thunk);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);

export type rootState = ReturnType<typeof rootReducer>;
