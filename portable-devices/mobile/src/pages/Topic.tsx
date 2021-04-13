/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';

import { NativeRouter, Route, Link } from 'react-router-native';

export const Home = () => <Text style={styles.header}>Home</Text>;

export const About = () => <Text style={styles.header}>About</Text>;

export const Topic = ({ match }) => <Text style={styles.topic}>{match.params.topicId}</Text>;

export const Topics = ({ match }) => (
  <View>
    <Text style={styles.header}>Topics</Text>
    <View>
      <Link to={`${match.url}/rendering`} style={styles.subNavItem} underlayColor="#f0f4f7">
        <Text>Rendering with React</Text>
      </Link>
      <Link to={`${match.url}/components`} style={styles.subNavItem} underlayColor="#f0f4f7">
        <Text>Components</Text>
      </Link>
      <Link to={`${match.url}/props-v-state`} style={styles.subNavItem} underlayColor="#f0f4f7">
        <Text>Props v. State</Text>
      </Link>
    </View>

    <Route path={`${match.path}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.path}
      render={() => <Text style={styles.topic}>Please select a topic.</Text>}
    />
  </View>
);

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
