/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Route, Link } from 'react-router-native';
import Body from '../modules/Body';
import MainHeader from '../modules/Header';

export const Topics = ({ match }: any) => (
  <View>
    <MainHeader title="Hello" />
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

    <Route path={`${match.path}/:topicId`} component={Body} />
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
