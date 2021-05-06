import React, { useState } from 'react';
import { Header, Left, Right, Body, Text, Icon } from 'native-base';
import { useHistory } from 'react-router-native';

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
        <Icon style={{ color: '#fff' }} name="home" onPress={() => history.push('/')} />
      </Right>
    </Header>
  );
};

export default MainHeader;
