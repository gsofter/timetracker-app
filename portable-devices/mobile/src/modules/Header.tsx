/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { Header, Left, Right, Body, Text, Icon } from 'native-base';
import { useHistory } from 'react-router-native';
import {auth0} from "../constants/auth0"

const MainHeader = (props: any) => {
  const[isToggle, setIsToggle] = useState(false);

  const toggle = () => {
    if(isToggle){
      props.drawerRef?.current?._root?.close();
    } else{
      props.drawerRef?.current?._root?.open();
    }
    setIsToggle(!isToggle)
  }

  const logout = () => {
    auth0.webAuth.clearSession()
    .then(res => console.log(res))
    .catch(error => console.log(error));
  }

  const history = useHistory();
  return (
    <Header style={{ backgroundColor: '#1f1f1f' }}>
      <Left>
        <Icon style={{ color: '#fff' }} name="menu" onPress={() => toggle()} />
      </Left>
      <Body>
        <Text style={{ color: '#fff' }}>{props.title}</Text>
      </Body>
      <Right>
        <Icon style={{ color: '#fff' }} name="exit-outline" onPress={() => logout()} />
      </Right>
    </Header>
  );
};

export default MainHeader;
