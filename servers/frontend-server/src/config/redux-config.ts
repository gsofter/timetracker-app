import { createStore, applyMiddleware, Middleware, compose, combineReducers, StoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createEpicMiddleware } from 'redux-observable';
// import { initialRedirectState } from '@adminide-stack/user-auth0-browser';
import { createClientContainer } from './client.service';
import { rootEpic } from './epic-config';
import modules, { container } from '../modules';

export const history = require('./router-history');

const { apolloClient, services, logger } = createClientContainer();
export const epicMiddleware = createEpicMiddleware({
    dependencies: {
        apolloClient,
        routes: modules.getConfiguredRoutes(),
        services,
        container,
        logger,
    },
});

export const storeReducer = (hist) =>
    combineReducers({
        router: connectRouter(hist),
        ...modules.reducers,
    });

export const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
    // Don't add `user` state to persist as it creates problems.
    whitelist: [],
};

/**
 * Add any reducers required for this app dirctly in to
 * `combineReducers`
 */
export const createReduxStore = (url = '/') => {
    // only in server side, url will be passed.
    const newHistory = __CLIENT__ ? history : history(url);
    /**
     * Add middleware that required for this app.
     */
    const middlewares: Middleware[] = [
        thunk,
        routerMiddleware(newHistory),
        epicMiddleware, // epic middleware
    ];

    // Add redux logger during development only
    if ((process.env.NODE_ENV === 'development' || __DEBUGGING__) && __CLIENT__) {
        const { createLogger } = require('redux-logger');

        middlewares.push(createLogger({ collapsed: true }));
    }

    const enhancers: () => StoreEnhancer<any>[] = () => [applyMiddleware(...middlewares)];

    const composeEnhancers: any =
        ((process.env.NODE_ENV === 'development' || __DEBUGGING__) &&
            __CLIENT__ &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose;

    const rootReducer = storeReducer(newHistory);
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    // If we have preloaded state, save it.
    const initialRedirectState = {};
    const initialState = __CLIENT__
        ? // ? { ...window.__PRELOADED_STATE__, redirectRoutes: initialRedirectState } //#952 TODO we need cookie to have id_token for SSR to work properly
          { redirectRoutes: initialRedirectState }
        : { redirectRoutes: initialRedirectState };
    // Delete it once we have it stored in a variable
    if (__CLIENT__) {
        delete window.__PRELOADED_STATE__;
    }

    const store = createStore(persistedReducer, initialState as any, composeEnhancers(...enhancers()));
    if (__CLIENT__) {
        // no SSR for now
        epicMiddleware.run(rootEpic as any);
    }

    return store;
};
