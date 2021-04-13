import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { Footer, Content } from 'native-base';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-native';
import CounterScreen from './counter';
interface Style {
  container: ViewStyle;
}
const HelloScreen = (props) => {
  console.log('---HELLO PROPS', props);
  return (
    <View style={styles.container}>
      <Content>
        <Text>Hello Value</Text>
        <Link to="/home/counter">Menu</Link>
      </Content>
      <Footer style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <View>
          <Text>Footer will be here</Text>
        </View>
      </Footer>
      <Route path="/home/counter" component={CounterScreen} />
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    textAlign: 'center',
  },
});

const Hello = connect((state: any) => {
  return {
    settings: state.settings,
    location: state?.route?.location,
  };
})(HelloScreen);

export default Hello;
