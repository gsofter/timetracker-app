/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Footer } from 'native-base';

const TimerScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.text}>Timer Screen</Text>
        </View>
      </ScrollView>
      <Footer style={styles.footer}>
        <View>
          <Text>Footer will be here</Text>
        </View>
      </Footer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    paddingTop: 30,
    textAlign: 'center',
  },
  footer: {
    borderTopColor: '#1f1f1f',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'red',
  },
});
export default TimerScreen;
