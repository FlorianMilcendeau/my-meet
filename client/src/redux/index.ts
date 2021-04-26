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

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    env: envReducer,
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'env'],
};

export type rootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<rootState>(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(history)),
    ),
);

export const persistor = persistStore(store);

export default store;
