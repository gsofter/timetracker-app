/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { Footer, Content } from 'native-base';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-native';
import CounterScreen from './counter';
interface Style {
  container: ViewStyle;
  text: TextStyle;
  link: TextStyle;
}
const HelloScreen = (props: any) => {
  console.log('---HELLO PROPS', props);
  return (
    <View style={styles.container}>
      <Content>
        <View>
          <Text style={styles.text}>Hello Screen</Text>
          <Link to="/topics/rendering" underlayColor="#f0f4f7">
            <Text style={styles.link}>Click here to go to Menu</Text>
          </Link>
        </View>
      </Content>
      <Footer style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <View>
          <Text>Footer will be here</Text>
        </View>
      </Footer>
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
  text: {
    paddingTop: 30,
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    color: 'red',
  },
});

// const Hello = connect((state: any) => {
//   return {
//     settings: state.settings,
//     location: state?.route?.location,
//   };
// })(HelloScreen);

// export default Hello;
export default HelloScreen;
