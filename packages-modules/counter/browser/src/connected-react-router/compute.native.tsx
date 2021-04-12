/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import { IMenuPosition } from '@common-stack/client-react';
import { Container, View, Text, List, ListItem, Left, Right, Icon, Drawer } from 'native-base';
import { Link } from 'react-router-dom';
import { Hello } from './components/Hello.native';
import { Counter } from './components/Counter.native';
// import { Dashboard } from '../common/components/Dashboard';
import { getFilteredRoutes } from '../utils';
import { CONNECTED_REACT_ROUTER_ROUTES_TYPES } from './constants';

const ExpandList = ({ route }) => {
  console.log('---ExpandList---', route);

  return (
    <Container>
      {route.routes.map((childRoute: any) => (
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
      ))}
    </Container>
  );
};
export const counterPageStore: any[] = [
  {
    exact: false,
    icon: 'export',
    position: IMenuPosition.MIDDLE,
    name: 'Connected React Router',
    component: ExpandList,
    key: CONNECTED_REACT_ROUTER_ROUTES_TYPES.HOME,
    path: CONNECTED_REACT_ROUTER_ROUTES_TYPES.HOME,
  },
  {
    exact: true,
    icon: 'export',
    name: 'Hello',
    component: Hello,
    position: IMenuPosition.MIDDLE,
    key: CONNECTED_REACT_ROUTER_ROUTES_TYPES.HELLO,
    path: CONNECTED_REACT_ROUTER_ROUTES_TYPES.HELLO,
  },
  {
    exact: true,
    icon: 'export',
    name: 'Counter',
    component: Counter,
    position: IMenuPosition.MIDDLE,
    key: CONNECTED_REACT_ROUTER_ROUTES_TYPES.COUNTER,
    path: CONNECTED_REACT_ROUTER_ROUTES_TYPES.COUNTER,
  },
];

const selectedRoutesAndMenus = [
  CONNECTED_REACT_ROUTER_ROUTES_TYPES.HOME,
  CONNECTED_REACT_ROUTER_ROUTES_TYPES.HELLO,
  CONNECTED_REACT_ROUTER_ROUTES_TYPES.COUNTER,
];

// get routes
const filteredRoutes = getFilteredRoutes(counterPageStore, selectedRoutesAndMenus);

export { filteredRoutes };
