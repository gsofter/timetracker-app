import { Feature } from '@common-stack/client-react';

import { interfaces } from 'inversify';
import { ApolloClient } from 'apollo-client';
import { ClientTypes as BrowserTypes } from '@common-stack/client-core';
import { platformModule } from './inversify-containers';
import { resolvers, dataIdFromObject, schema, defaults } from './graphql';

const platformServiceGen = (container: interfaces.Container) => ({
    apolloClient: container.get<ApolloClient<any>>(BrowserTypes.ApolloClient),
    cache: container.get<any>(BrowserTypes.InMemoryCache),
    utility: container.get(BrowserTypes.UtilityClass),
});
export default new Feature({
    dataIdFromObject,
    createContainerFunc: platformModule,
    createServiceFunc: platformServiceGen,
    clientStateParams: { resolvers: resolvers, typeDefs: schema, defaults }
});
