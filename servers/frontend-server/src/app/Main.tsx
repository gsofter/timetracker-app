/// <reference path='../../../../typings/index.d.ts' />
import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { RendererProvider } from 'react-fela';
import { ApolloProvider } from '@apollo/react-common';
import { Provider } from 'react-redux';
import createRenderer from '../config/fela-renderer';
import { rehydrate } from 'fela-dom';
import { epic$ } from '../config/epic-config';
import {
  createReduxStore,
  storeReducer,
  history,
  persistConfig,
} from '../config/redux-config';
import { createClientContainer } from '../config/client.service';
import {
  SlotFillProvider,
  InversifyProvider, Lifecycle,
} from '@workbench-stack/components';
import { PluginArea } from '@common-stack/client-react';
import modules, { MainRoute, logger } from '../modules';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import { useProvideAuth } from '@adminide-stack/user-auth0-browser';
import { ProvideAuth as CoreProvideAuth, ErrorBoundary } from '@adminide-stack/react-shared-components';

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <CoreProvideAuth auth={auth}>{children}</CoreProvideAuth>;
};

const { apolloClient: client, container } = createClientContainer();

if (__DEV__) {
  modules.stylesInserts.map(style => {
    logger.warn('Include CSS file ["%s"] in index.ts', style);
  });
}
let store;
if ((module as any).hot && (module as any).hot.data && (module as any).hot.data.store) {
  // console.log('Restoring Redux store:', JSON.stringify((module as any).hot.data.store.getState()));
  store = (module as any).hot.data.store;
  // replace the reducers always as we don't have ablity to find
  // new reducer added through our `modules`
  store.replaceReducer(persistReducer(persistConfig, storeReducer((module as any).hot.data.history || history)));
} else {
  store = createReduxStore();
}
if ((module as any).hot) {
  (module as any).hot.dispose(data => {
    // console.log("Saving Redux store:", JSON.stringify(store.getState()));
    data.store = store;
    data.history = history;
    // Force Apollo to fetch the latest data from the server
    delete window.__APOLLO_STATE__;
  });
  (module as any).hot.accept('../config/epic-config', () => {
    // we may need to reload epic always as we don't
    // know whether it is updated using our `modules`
    const nextRootEpic = require('../config/epic-config').rootEpic;
    // First kill any running epics
    store.dispatch({ type: 'EPIC_END' });
    // Now setup the new one
    epic$.next(nextRootEpic);
  });
}

export class Main extends React.Component<{}, {}> {

  render() {
    const renderer = createRenderer();
    let persistor = persistStore(store);
    rehydrate(renderer);
    return (
      <ErrorBoundary>
        <SlotFillProvider>
          <Provider store={store}>
            <ProvideAuth>
              <ApolloProvider client={client}>
                <InversifyProvider container={container} modules={modules}>
                    <RendererProvider renderer={renderer}>
                      <PersistGate persistor={persistor}>
                        <PluginArea />
                        {modules.getWrappedRoot(
                          (
                            <ConnectedRouter history={history}>
                              <MainRoute />
                            </ConnectedRouter>
                          ),
                        )}
                      </PersistGate>
                    </RendererProvider>
                </InversifyProvider>
              </ApolloProvider>
            </ProvideAuth>
          </Provider>
        </SlotFillProvider>
      </ErrorBoundary>
    );
  }
}

export default hot(Main);
