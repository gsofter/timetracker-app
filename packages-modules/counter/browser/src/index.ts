import { Feature } from '@common-stack/client-react';
import Common from './common';
import Account from './account';
import ApolloCounter from './apollo-server-n-client';
import ConnectedReactRouter from './connected-react-router';
import Organization from './organization';
import Fela from './fela';
import { ElectronTrayModule, ElectronMainModule } from './connected-react-router/index.electron';

export default new Feature(
    // Common,
    //  ConnectedReactRouter, 
    //  ApolloCounter, 
    //  Fela, 
    //  Account,
    Organization
);


