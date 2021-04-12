/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { Container, View, Text, List, ListItem, Left, Right, Icon, Drawer } from 'native-base';
import { Link } from 'react-router-dom';

const SideBar = ({ route }: any) => {
  const [icon, setIcon] = useState('arrow-forward');
  const [toggle, setToggle] = useState(false);
  const expand = () => {
    if (icon === 'arrow-forward') {
      setIcon('arrow-down');
      // setToggle(true);
    } else {
      setIcon('arrow-forward');
      setToggle(false);
    }
  };
  return (
    <Container>
      {route.routes.map((childRoute: any) =>
        childRoute.routes ? (
          childRoute.routes.map((grandChildRoute: any) => (
            <List key={grandChildRoute.key}>
              <Link key={grandChildRoute.key} to={grandChildRoute.path}>
                <ListItem key={grandChildRoute.key}>
                  <Left>
                    <Text>{grandChildRoute.name}</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              </Link>
            </List>
          ))
        ) : (
          <List key={childRoute.key}>
            <Link key={childRoute.key} to={childRoute.path}>
              <ListItem key={childRoute.key}>
                <Left>
                  <Text>{childRoute.name}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            </Link>
          </List>
        ),
      )}
    </Container>
  );
};

export default SideBar;
