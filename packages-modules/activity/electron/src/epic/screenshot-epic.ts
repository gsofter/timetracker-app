


export const onScreenshotEpic = (
    action$: Observable<any>,
    state$: Observable<any>,
    { apolloClient, routes, logger }
) => {
    return action$
        .pipe(
            ofType(),
            mergeMap(),
            
        )
}