import { Feature } from '@common-stack/client-react';
import TimeTracker from './timetracker/module';
import ApolloClient from './apollo-client'

export default new Feature(TimeTracker, ApolloClient);


