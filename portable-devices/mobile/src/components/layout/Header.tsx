import React, { useState } from 'react';
import { Header, Left, Right, Body, Text, Icon } from 'native-base';
import {TouchableHighlight, StyleSheet} from 'react-native'
import { useHistory } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import { MobileRoutes } from '../../constants/routes';

const MainHeader = (props: any) => {
  const[isToggle, setIsToggle] = useState(false);
  const user = useSelector((state: any) => state?.user)

  const toggle = () => {
    if(isToggle){
      props.drawerRef?.current?._root?.close();
    } else{
      props.drawerRef?.current?._root?.open();
    }
    setIsToggle(!isToggle)
  }

  const logout = () => {
    if (user.auth0UserId) {
      history.push(MobileRoutes.Logout);
    }
  }

  const history = useHistory();
  return (
    <Header style={{ backgroundColor: '#fff' }}>
      <Left>
        <TouchableHighlight style={styles.container} underlayColor='#eff0f1' onPress={() => toggle()}>
        <Icon name="menu" />
        </TouchableHighlight>
      </Left>
      <Body>
        <Text>{props.title}</Text>
      </Body>
      <Right>
        <Icon name="exit-outline" onPress={() => logout()} />
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
  }
})

export default MainHeader;
