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

// console.log('---CONFIG--new-', config, env);
export default function App() {
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
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});
