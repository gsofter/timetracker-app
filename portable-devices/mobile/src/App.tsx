/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createRenderer } from 'fela-native';
import { RendererProvider } from 'react-fela';
import { ConnectedRouter } from 'connected-react-router';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { NativeRouter } from 'react-router-native';
import {
  createReduxStore,
  storeReducer,
  history,
  persistConfig,
  epicMiddleware,
} from './config/redux-config';
import { createApolloClient } from './config/apollo-client';
import env from './config/public-config';
import config from './config';
import useColorScheme from './hooks/useColorScheme';
import useCachedResources from './hooks/useCachedResources';

import { MainRoute } from './modules';
import Example from './example';

const client = createApolloClient();

let store: any;
if ((module as any).hot && (module as any).hot.data && (module as any).hot.data.store) {
  // console.log('Restoring Redux store:', JSON.stringify((module as any).hot.data.store.getState()));
  store = (module as any).hot.data.store;
  // replace the reducers always as we don't have ablity to find
  // new reducer added through our `modules`
  store.replaceReducer(
    persistReducer(persistConfig, storeReducer((module as any).hot.data.history || history)),
  );
} else {
  store = createReduxStore();
}

const renderer = createRenderer();

console.log('---CONFIG--new-', config, env);
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const persistor = persistStore(store);
  const routeNameRef = useRef();
  const navigationRef = useRef<any>();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <RendererProvider renderer={renderer}>
            <PersistGate persistor={persistor}>
              <NativeRouter keyLength={23}>
                <ConnectedRouter history={history}>
                  <Example/>
                  {/* <MainRoute history={history} />
                  <StatusBar /> */}
                </ConnectedRouter>
              </NativeRouter>
            </PersistGate>
          </RendererProvider>
        </ApolloProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
