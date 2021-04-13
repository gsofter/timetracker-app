/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { NativeRouter, Route, Link } from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Home, About, Topics } from './pages/Topic';
// import { Provider } from 'react-redux';
// import { ApolloProvider } from 'react-apollo';
// import { persistStore, persistReducer } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
import { createRenderer } from 'fela-native';
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
import Example from './example';

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
        <View style={styles.container}>
          <View style={styles.nav}>
            <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
              <Text>Home</Text>
            </Link>
            <Link to="/about" underlayColor="#f0f4f7" style={styles.navItem}>
              <Text>About</Text>
            </Link>
            <Link to="/topics" underlayColor="#f0f4f7" style={styles.navItem}>
              <Text>Topics</Text>
            </Link>
          </View>

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </View>
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
