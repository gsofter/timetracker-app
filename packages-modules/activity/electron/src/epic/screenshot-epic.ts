import { Observable, of } from 'rxjs';

export const onScreenshotEpic = (action$: Observable<any>, state$: Observable<any>, { apolloClient, routes, logger }) =>
    action$.pipe(ofType(), mergeMap());
