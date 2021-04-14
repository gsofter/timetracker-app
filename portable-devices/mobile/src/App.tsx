/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { createRenderer } from 'fela-native';
import Layout from './components/layout/Layout';
import { Dashboard } from './pages';
// import { Provider } from 'react-redux';
// import { ApolloProvider } from 'react-apollo';
// import { persistStore, persistReducer } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
// import { RendererProvider } from 'react-fela';
// import { ConnectedRouter } from 'connected-react-router';
// import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
// import { NativeRouter } from 'react-router-native';
// import {
//   createReduxStore,
//   storeReducer,
//   history,
//   persistConfig,
//   epicMiddleware,
// } from './config/redux-config';
// import { createApolloClient } from './config/apollo-client';
// import env from './config/public-config';
// import config from './config';
// import useColorScheme from './hooks/useColorScheme';
import useCachedResources from './hooks/useCachedResources';

// import { MainRoute } from './modules';

// const client = createApolloClient();

// let store: any;
// if ((module as any).hot && (module as any).hot.data && (module as any).hot.data.store) {
//   // console.log('Restoring Redux store:', JSON.stringify((module as any).hot.data.store.getState()));
//   store = (module as any).hot.data.store;
//   // replace the reducers always as we don't have ablity to find
//   // new reducer added through our `modules`
//   store.replaceReducer(
//     persistReducer(persistConfig, storeReducer((module as any).hot.data.history || history)),
//   );
// } else {
//   store = createReduxStore();
// }

const renderer = createRenderer();

// console.log('---CONFIG--new-', config, env);
export default function App() {
  // const isLoadingComplete = useCachedResources();

  // if (!isLoadingComplete) {
  //   return null;
  // }
  return (
    <SafeAreaProvider>
      <NativeRouter>
        <Route exact path="/" component={Dashboard} />
        <Route path="/topics" component={Layout} />
      </NativeRouter>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
});
