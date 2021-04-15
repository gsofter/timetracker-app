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
import { Header } from 'react-native-elements';
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
    <Header
      placement="left"
      leftComponent={{
        icon: 'menu',
        color: '#fff',
        onPress: () => toggle(),
      }}
      centerComponent={{
        text: props.title,
        style: { color: '#fff' },
      }}
      rightComponent={{
        icon: 'home',
        color: '#fff',
        onPress: () => history.push('/'),
      }}
    />
  );
};

export default MainHeader;
