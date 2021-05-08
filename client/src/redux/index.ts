import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';

/** Reducers */
import userReducer from './user/reducer';
import envReducer from './env/reducer';

const NODE_ENV = process.env.NODE_ENV || 'development';

const rootReducer = (history: History<any>) =>
    combineReducers({
        router: connectRouter(history),
        env: envReducer,
        user: userReducer,
    });

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'env', 'router'],
};

const configureStore = (
    history: History<any>,
): { store: Store; persistor: Persistor } => {
    const enhancer =
        NODE_ENV === 'development'
            ? composeWithDevTools(
                  applyMiddleware(thunk),
                  applyMiddleware(routerMiddleware(history)),
              )
            : applyMiddleware(thunk);

    const persistedReducer = persistReducer(
        persistConfig,
        rootReducer(history),
    );

    const store = createStore(persistedReducer, enhancer);

    const persistor = persistStore(store);

    return { store, persistor };
};

export type rootState = ReturnType<typeof rootReducer>;
export default configureStore;
