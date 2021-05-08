import React, { useState } from 'react';
import { Container, View, Text, List, ListItem, Left, Right, Icon, Drawer } from 'native-base';
import { Link } from 'react-router-native';

const SideBar = ({ matchUrl }: any) => {
  const [icon, setIcon] = useState('chevron-down-outline');
  const [isToggle, setToggle] = useState(false);

  const toggle = () => {
    if (isToggle) {
      setIcon('chevron-down-outline');
      setToggle(false);
    } else {
      setIcon('chevron-up-outline');
      setToggle(true)
    }
  }
  return (
    <Container style={{ backgroundColor: '#1f1f1f' }}>
      <List>
        <ListItem onPress={() => toggle()}>
          <Left>
            <Icon style={{ color: isToggle ? '#fff': '#a1a1a1' }} name="document-outline" />
            <Text style={{ color: isToggle ? '#fff': '#a1a1a1' }}>Time Tracker</Text>
          </Left>
          <Right>
            <Icon name={icon} />
          </Right>
        </ListItem>
        {isToggle && (
          <List>
            <ListItem>
              <Left>
                <Link to={`${matchUrl}/timer`} underlayColor="#f0f4f7">
                  <Text style={{ color: '#a1a1a1' }}>Timer</Text>
                </Link>
              </Left>
            </ListItem>
            <ListItem>
              <Left>
                <Link to={`${matchUrl}/timesheet`} underlayColor="#f0f4f7">
                  <Text style={{ color: '#a1a1a1' }}>TimeSheet</Text>
                </Link>
              </Left>
            </ListItem>
          </List>
        )}
      </List>
    </Container>
  );
};

export default SideBar;
