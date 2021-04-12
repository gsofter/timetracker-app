/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { Header } from 'react-native-elements';

const MainHeader = (props: any) => {
  return (
    <Header
      placement="left"
      leftComponent={{
        icon: 'menu',
        color: '#fff',
        // onPress: () => navigation.dispatch(DrawerActions.toggleDrawer()),
      }}
      centerComponent={{
        text: props.title,
        style: { color: '#fff' },
      }}
    />
  );
};

export default MainHeader;
