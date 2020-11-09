import { Feature } from '@common-stack/client-react';
import Common from './common';
import Account from './account';
import ApolloCounter from './apollo-server-n-client';
import ConnectedReactRouter from './connected-react-router';
import Fela from './fela';
import timetracker from './timetracker';

export default new Feature(Common, ConnectedReactRouter, ApolloCounter, Fela, Account, timetracker);


