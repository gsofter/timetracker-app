/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { Container, View, Text, List, ListItem, Left, Right, Icon, Drawer } from 'native-base';
import { Link } from 'react-router-native';

const SideBar = ({ matchUrl }: any) => {
  const [icon, setIcon] = useState('arrow-forward');
  return (
    <Container>
      <List>
        <ListItem>
          <Left>
            <Link to={`${matchUrl}/timer`} underlayColor="#f0f4f7">
              <Text>Timer</Text>
            </Link>
          </Left>
          <Right>
            <Icon name={icon} />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Link to={`${matchUrl}/calendar`} underlayColor="#f0f4f7">
              <Text>Calendar</Text>
            </Link>
          </Left>
          <Right>
            <Icon name={icon} />
          </Right>
        </ListItem>
      </List>
    </Container>
  );
};

export default SideBar;
