import { Observable, of } from 'rxjs';
import { ApolloClient } from 'apollo-client';
import { CdmLogger } from '@cdm-logger/core';
import system from 'desktop-idle';

function* checkIdle() {
    const idleTime = system.getIdleTime();
    const idleState = yeild;
}
export const onLocationChangedToOrganiationEpic = (
    action$: Observable<any>,
    state$: Observable<any>,
    { apolloClient, routes, logger }: { apolloClient: ApolloClient<any>; routes: any; logger: CdmLogger.ILogger },
) => {

    
};
