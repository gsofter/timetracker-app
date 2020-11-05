import React, { useState , useEffect } from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import { AddTask  } from '../timetracker/AddTask';
import { ListTasks  } from '../timetracker/ListsTask';
import { resolvers } from './resolvers'
import DefaultClient from 'apollo-boost';


export interface ApolloProviderProps<TCache> {
    client: ApolloClient<TCache> | DefaultClient<TCache>;
    children: React.ReactNode | React.ReactNode[] | null;
}
export declare const ApolloProvider: React.FC<ApolloProviderProps<any>>;

const cache = new InMemoryCache({});

const client = new ApolloClient({
  cache: cache,
  clientState: {
    defaults: {
    timeEntriesList: [],
    isFetchingTimeEntriesList: false,
    currentTimer: null,
    timerTick: null,
    serverClientTimediff: 0,
    pagination: {
        page: 1,
        limit: 50,
        disabled: false,
    },
    },
    resolvers: resolvers,
  },
});

async function setupPersistence() {
  try {
    await persistCache({
      cache: cache,
      storage: window.localStorage,
    });
  } catch (err) {
    console.log(err);
  }
}

export const TimeTracker = () => {

    const [ hydrated, setHydrated ] = useState(false);

    useEffect(() => {
      setupPersistence()
        .finally(() => setHydrated(true));
    }, []);

    if (!hydrated) {
      return <p>loading our persisted cache...</p>
    }
    return (
        <ApolloProvider client={client}>
            <AddTask />
            <ListTasks />
        </ApolloProvider>
    );
};