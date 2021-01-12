/* tslint:disable */

import * as SchemaTypes from '@admin-layout/schedule-module-core';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;














export const AddScheduleEventDocument = gql`
    mutation AddScheduleEvent($request: ScheduleCreateRequest) {
  addScheduleEvent(request: $request)
}
    `;
export type IAddScheduleEventMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IAddScheduleEventMutation, SchemaTypes.IAddScheduleEventMutationVariables>;
export type AddScheduleEventComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IAddScheduleEventMutation, SchemaTypes.IAddScheduleEventMutationVariables>, 'mutation'>;

    export const AddScheduleEventComponent = (props: AddScheduleEventComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IAddScheduleEventMutation, SchemaTypes.IAddScheduleEventMutationVariables> mutation={AddScheduleEventDocument} {...props} />
    );
    

/**
 * __useAddScheduleEventMutation__
 *
 * To run a mutation, you first call `useAddScheduleEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddScheduleEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addScheduleEventMutation, { data, loading, error }] = useAddScheduleEventMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddScheduleEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IAddScheduleEventMutation, SchemaTypes.IAddScheduleEventMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IAddScheduleEventMutation, SchemaTypes.IAddScheduleEventMutationVariables>(AddScheduleEventDocument, baseOptions);
      }
export type AddScheduleEventMutationHookResult = ReturnType<typeof useAddScheduleEventMutation>;
export type AddScheduleEventMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IAddScheduleEventMutation>;
export type AddScheduleEventMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IAddScheduleEventMutation, SchemaTypes.IAddScheduleEventMutationVariables>;
export const AddTimelineEventDocument = gql`
    mutation AddTimelineEvent($request: TimelineCreateRequest) {
  addTimelineEvent(request: $request)
}
    `;
export type IAddTimelineEventMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IAddTimelineEventMutation, SchemaTypes.IAddTimelineEventMutationVariables>;
export type AddTimelineEventComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IAddTimelineEventMutation, SchemaTypes.IAddTimelineEventMutationVariables>, 'mutation'>;

    export const AddTimelineEventComponent = (props: AddTimelineEventComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IAddTimelineEventMutation, SchemaTypes.IAddTimelineEventMutationVariables> mutation={AddTimelineEventDocument} {...props} />
    );
    

/**
 * __useAddTimelineEventMutation__
 *
 * To run a mutation, you first call `useAddTimelineEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTimelineEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTimelineEventMutation, { data, loading, error }] = useAddTimelineEventMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddTimelineEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IAddTimelineEventMutation, SchemaTypes.IAddTimelineEventMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IAddTimelineEventMutation, SchemaTypes.IAddTimelineEventMutationVariables>(AddTimelineEventDocument, baseOptions);
      }
export type AddTimelineEventMutationHookResult = ReturnType<typeof useAddTimelineEventMutation>;
export type AddTimelineEventMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IAddTimelineEventMutation>;
export type AddTimelineEventMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IAddTimelineEventMutation, SchemaTypes.IAddTimelineEventMutationVariables>;
export const AddTimesheetEventDocument = gql`
    mutation AddTimesheetEvent($request: TimesheetCreateRequest) {
  addTimesheetEvent(request: $request)
}
    `;
export type IAddTimesheetEventMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IAddTimesheetEventMutation, SchemaTypes.IAddTimesheetEventMutationVariables>;
export type AddTimesheetEventComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IAddTimesheetEventMutation, SchemaTypes.IAddTimesheetEventMutationVariables>, 'mutation'>;

    export const AddTimesheetEventComponent = (props: AddTimesheetEventComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IAddTimesheetEventMutation, SchemaTypes.IAddTimesheetEventMutationVariables> mutation={AddTimesheetEventDocument} {...props} />
    );
    

/**
 * __useAddTimesheetEventMutation__
 *
 * To run a mutation, you first call `useAddTimesheetEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTimesheetEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTimesheetEventMutation, { data, loading, error }] = useAddTimesheetEventMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddTimesheetEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IAddTimesheetEventMutation, SchemaTypes.IAddTimesheetEventMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IAddTimesheetEventMutation, SchemaTypes.IAddTimesheetEventMutationVariables>(AddTimesheetEventDocument, baseOptions);
      }
export type AddTimesheetEventMutationHookResult = ReturnType<typeof useAddTimesheetEventMutation>;
export type AddTimesheetEventMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IAddTimesheetEventMutation>;
export type AddTimesheetEventMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IAddTimesheetEventMutation, SchemaTypes.IAddTimesheetEventMutationVariables>;
export const RemoveScheduleEventDocument = gql`
    mutation RemoveScheduleEvent($eventId: String) {
  removeScheduleEvent(eventId: $eventId)
}
    `;
export type IRemoveScheduleEventMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IRemoveScheduleEventMutation, SchemaTypes.IRemoveScheduleEventMutationVariables>;
export type RemoveScheduleEventComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IRemoveScheduleEventMutation, SchemaTypes.IRemoveScheduleEventMutationVariables>, 'mutation'>;

    export const RemoveScheduleEventComponent = (props: RemoveScheduleEventComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IRemoveScheduleEventMutation, SchemaTypes.IRemoveScheduleEventMutationVariables> mutation={RemoveScheduleEventDocument} {...props} />
    );
    

/**
 * __useRemoveScheduleEventMutation__
 *
 * To run a mutation, you first call `useRemoveScheduleEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveScheduleEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeScheduleEventMutation, { data, loading, error }] = useRemoveScheduleEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useRemoveScheduleEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IRemoveScheduleEventMutation, SchemaTypes.IRemoveScheduleEventMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IRemoveScheduleEventMutation, SchemaTypes.IRemoveScheduleEventMutationVariables>(RemoveScheduleEventDocument, baseOptions);
      }
export type RemoveScheduleEventMutationHookResult = ReturnType<typeof useRemoveScheduleEventMutation>;
export type RemoveScheduleEventMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IRemoveScheduleEventMutation>;
export type RemoveScheduleEventMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IRemoveScheduleEventMutation, SchemaTypes.IRemoveScheduleEventMutationVariables>;
export const RemoveTimelineEventDocument = gql`
    mutation RemoveTimelineEvent($eventId: String) {
  removeTimelineEvent(eventId: $eventId)
}
    `;
export type IRemoveTimelineEventMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IRemoveTimelineEventMutation, SchemaTypes.IRemoveTimelineEventMutationVariables>;
export type RemoveTimelineEventComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IRemoveTimelineEventMutation, SchemaTypes.IRemoveTimelineEventMutationVariables>, 'mutation'>;

    export const RemoveTimelineEventComponent = (props: RemoveTimelineEventComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IRemoveTimelineEventMutation, SchemaTypes.IRemoveTimelineEventMutationVariables> mutation={RemoveTimelineEventDocument} {...props} />
    );
    

/**
 * __useRemoveTimelineEventMutation__
 *
 * To run a mutation, you first call `useRemoveTimelineEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTimelineEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTimelineEventMutation, { data, loading, error }] = useRemoveTimelineEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useRemoveTimelineEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IRemoveTimelineEventMutation, SchemaTypes.IRemoveTimelineEventMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IRemoveTimelineEventMutation, SchemaTypes.IRemoveTimelineEventMutationVariables>(RemoveTimelineEventDocument, baseOptions);
      }
export type RemoveTimelineEventMutationHookResult = ReturnType<typeof useRemoveTimelineEventMutation>;
export type RemoveTimelineEventMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IRemoveTimelineEventMutation>;
export type RemoveTimelineEventMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IRemoveTimelineEventMutation, SchemaTypes.IRemoveTimelineEventMutationVariables>;
export const RemoveTimesheetEventDocument = gql`
    mutation RemoveTimesheetEvent($eventId: String) {
  removeTimesheetEvent(eventId: $eventId)
}
    `;
export type IRemoveTimesheetEventMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IRemoveTimesheetEventMutation, SchemaTypes.IRemoveTimesheetEventMutationVariables>;
export type RemoveTimesheetEventComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IRemoveTimesheetEventMutation, SchemaTypes.IRemoveTimesheetEventMutationVariables>, 'mutation'>;

    export const RemoveTimesheetEventComponent = (props: RemoveTimesheetEventComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IRemoveTimesheetEventMutation, SchemaTypes.IRemoveTimesheetEventMutationVariables> mutation={RemoveTimesheetEventDocument} {...props} />
    );
    

/**
 * __useRemoveTimesheetEventMutation__
 *
 * To run a mutation, you first call `useRemoveTimesheetEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTimesheetEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTimesheetEventMutation, { data, loading, error }] = useRemoveTimesheetEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useRemoveTimesheetEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IRemoveTimesheetEventMutation, SchemaTypes.IRemoveTimesheetEventMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IRemoveTimesheetEventMutation, SchemaTypes.IRemoveTimesheetEventMutationVariables>(RemoveTimesheetEventDocument, baseOptions);
      }
export type RemoveTimesheetEventMutationHookResult = ReturnType<typeof useRemoveTimesheetEventMutation>;
export type RemoveTimesheetEventMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IRemoveTimesheetEventMutation>;
export type RemoveTimesheetEventMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IRemoveTimesheetEventMutation, SchemaTypes.IRemoveTimesheetEventMutationVariables>;
export const UpdateScheduleEventDocument = gql`
    mutation UpdateScheduleEvent($eventId: String, $request: ScheduleCreateRequest) {
  updateScheduleEvent(eventId: $eventId, request: $request)
}
    `;
export type IUpdateScheduleEventMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IUpdateScheduleEventMutation, SchemaTypes.IUpdateScheduleEventMutationVariables>;
export type UpdateScheduleEventComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IUpdateScheduleEventMutation, SchemaTypes.IUpdateScheduleEventMutationVariables>, 'mutation'>;

    export const UpdateScheduleEventComponent = (props: UpdateScheduleEventComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IUpdateScheduleEventMutation, SchemaTypes.IUpdateScheduleEventMutationVariables> mutation={UpdateScheduleEventDocument} {...props} />
    );
    

/**
 * __useUpdateScheduleEventMutation__
 *
 * To run a mutation, you first call `useUpdateScheduleEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateScheduleEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateScheduleEventMutation, { data, loading, error }] = useUpdateScheduleEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateScheduleEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IUpdateScheduleEventMutation, SchemaTypes.IUpdateScheduleEventMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IUpdateScheduleEventMutation, SchemaTypes.IUpdateScheduleEventMutationVariables>(UpdateScheduleEventDocument, baseOptions);
      }
export type UpdateScheduleEventMutationHookResult = ReturnType<typeof useUpdateScheduleEventMutation>;
export type UpdateScheduleEventMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IUpdateScheduleEventMutation>;
export type UpdateScheduleEventMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IUpdateScheduleEventMutation, SchemaTypes.IUpdateScheduleEventMutationVariables>;
export const UpdateTimelineEventDocument = gql`
    mutation UpdateTimelineEvent($eventId: String, $request: TimelineCreateRequest) {
  updateTimelineEvent(eventId: $eventId, request: $request)
}
    `;
export type IUpdateTimelineEventMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IUpdateTimelineEventMutation, SchemaTypes.IUpdateTimelineEventMutationVariables>;
export type UpdateTimelineEventComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IUpdateTimelineEventMutation, SchemaTypes.IUpdateTimelineEventMutationVariables>, 'mutation'>;

    export const UpdateTimelineEventComponent = (props: UpdateTimelineEventComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IUpdateTimelineEventMutation, SchemaTypes.IUpdateTimelineEventMutationVariables> mutation={UpdateTimelineEventDocument} {...props} />
    );
    

/**
 * __useUpdateTimelineEventMutation__
 *
 * To run a mutation, you first call `useUpdateTimelineEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimelineEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimelineEventMutation, { data, loading, error }] = useUpdateTimelineEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateTimelineEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IUpdateTimelineEventMutation, SchemaTypes.IUpdateTimelineEventMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IUpdateTimelineEventMutation, SchemaTypes.IUpdateTimelineEventMutationVariables>(UpdateTimelineEventDocument, baseOptions);
      }
export type UpdateTimelineEventMutationHookResult = ReturnType<typeof useUpdateTimelineEventMutation>;
export type UpdateTimelineEventMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IUpdateTimelineEventMutation>;
export type UpdateTimelineEventMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IUpdateTimelineEventMutation, SchemaTypes.IUpdateTimelineEventMutationVariables>;
export const UpdateTimesheetEventDocument = gql`
    mutation UpdateTimesheetEvent($eventId: String, $request: TimesheetCreateRequest) {
  updateTimesheetEvent(eventId: $eventId, request: $request)
}
    `;
export type IUpdateTimesheetEventMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IUpdateTimesheetEventMutation, SchemaTypes.IUpdateTimesheetEventMutationVariables>;
export type UpdateTimesheetEventComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IUpdateTimesheetEventMutation, SchemaTypes.IUpdateTimesheetEventMutationVariables>, 'mutation'>;

    export const UpdateTimesheetEventComponent = (props: UpdateTimesheetEventComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IUpdateTimesheetEventMutation, SchemaTypes.IUpdateTimesheetEventMutationVariables> mutation={UpdateTimesheetEventDocument} {...props} />
    );
    

/**
 * __useUpdateTimesheetEventMutation__
 *
 * To run a mutation, you first call `useUpdateTimesheetEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimesheetEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimesheetEventMutation, { data, loading, error }] = useUpdateTimesheetEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateTimesheetEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IUpdateTimesheetEventMutation, SchemaTypes.IUpdateTimesheetEventMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IUpdateTimesheetEventMutation, SchemaTypes.IUpdateTimesheetEventMutationVariables>(UpdateTimesheetEventDocument, baseOptions);
      }
export type UpdateTimesheetEventMutationHookResult = ReturnType<typeof useUpdateTimesheetEventMutation>;
export type UpdateTimesheetEventMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IUpdateTimesheetEventMutation>;
export type UpdateTimesheetEventMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IUpdateTimesheetEventMutation, SchemaTypes.IUpdateTimesheetEventMutationVariables>;
export const GetScheduleEventsDocument = gql`
    query GetScheduleEvents($userId: String) {
  getScheduleEvents(userId: $userId) {
    id
    title
    allDay
    start
    end
    desc
    userId
    resourceId
    tooltip
  }
}
    `;
export type GetScheduleEventsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.IGetScheduleEventsQuery, SchemaTypes.IGetScheduleEventsQueryVariables>, 'query'>;

    export const GetScheduleEventsComponent = (props: GetScheduleEventsComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.IGetScheduleEventsQuery, SchemaTypes.IGetScheduleEventsQueryVariables> query={GetScheduleEventsDocument} {...props} />
    );
    

/**
 * __useGetScheduleEventsQuery__
 *
 * To run a query within a React component, call `useGetScheduleEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScheduleEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScheduleEventsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetScheduleEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetScheduleEventsQuery, SchemaTypes.IGetScheduleEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetScheduleEventsQuery, SchemaTypes.IGetScheduleEventsQueryVariables>(GetScheduleEventsDocument, baseOptions);
      }
export function useGetScheduleEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetScheduleEventsQuery, SchemaTypes.IGetScheduleEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetScheduleEventsQuery, SchemaTypes.IGetScheduleEventsQueryVariables>(GetScheduleEventsDocument, baseOptions);
        }
export type GetScheduleEventsQueryHookResult = ReturnType<typeof useGetScheduleEventsQuery>;
export type GetScheduleEventsLazyQueryHookResult = ReturnType<typeof useGetScheduleEventsLazyQuery>;
export type GetScheduleEventsQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetScheduleEventsQuery, SchemaTypes.IGetScheduleEventsQueryVariables>;
export const GetTimelineEventsDocument = gql`
    query GetTimelineEvents($userId: String) {
  getTimelineEvents(userId: $userId) {
    id
    title
    allDay
    start
    end
    desc
    userId
    resourceId
    tooltip
  }
}
    `;
export type GetTimelineEventsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.IGetTimelineEventsQuery, SchemaTypes.IGetTimelineEventsQueryVariables>, 'query'>;

    export const GetTimelineEventsComponent = (props: GetTimelineEventsComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.IGetTimelineEventsQuery, SchemaTypes.IGetTimelineEventsQueryVariables> query={GetTimelineEventsDocument} {...props} />
    );
    

/**
 * __useGetTimelineEventsQuery__
 *
 * To run a query within a React component, call `useGetTimelineEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimelineEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimelineEventsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetTimelineEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetTimelineEventsQuery, SchemaTypes.IGetTimelineEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetTimelineEventsQuery, SchemaTypes.IGetTimelineEventsQueryVariables>(GetTimelineEventsDocument, baseOptions);
      }
export function useGetTimelineEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetTimelineEventsQuery, SchemaTypes.IGetTimelineEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetTimelineEventsQuery, SchemaTypes.IGetTimelineEventsQueryVariables>(GetTimelineEventsDocument, baseOptions);
        }
export type GetTimelineEventsQueryHookResult = ReturnType<typeof useGetTimelineEventsQuery>;
export type GetTimelineEventsLazyQueryHookResult = ReturnType<typeof useGetTimelineEventsLazyQuery>;
export type GetTimelineEventsQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetTimelineEventsQuery, SchemaTypes.IGetTimelineEventsQueryVariables>;
export const GetTimesheetEventsDocument = gql`
    query GetTimesheetEvents($userId: String) {
  getTimesheetEvents(userId: $userId) {
    id
    title
    allDay
    start
    end
    userId
    projectId
    reason
    note
    tooltip
  }
}
    `;
export type GetTimesheetEventsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.IGetTimesheetEventsQuery, SchemaTypes.IGetTimesheetEventsQueryVariables>, 'query'>;

    export const GetTimesheetEventsComponent = (props: GetTimesheetEventsComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.IGetTimesheetEventsQuery, SchemaTypes.IGetTimesheetEventsQueryVariables> query={GetTimesheetEventsDocument} {...props} />
    );
    

/**
 * __useGetTimesheetEventsQuery__
 *
 * To run a query within a React component, call `useGetTimesheetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimesheetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimesheetEventsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetTimesheetEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetTimesheetEventsQuery, SchemaTypes.IGetTimesheetEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetTimesheetEventsQuery, SchemaTypes.IGetTimesheetEventsQueryVariables>(GetTimesheetEventsDocument, baseOptions);
      }
export function useGetTimesheetEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetTimesheetEventsQuery, SchemaTypes.IGetTimesheetEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetTimesheetEventsQuery, SchemaTypes.IGetTimesheetEventsQueryVariables>(GetTimesheetEventsDocument, baseOptions);
        }
export type GetTimesheetEventsQueryHookResult = ReturnType<typeof useGetTimesheetEventsQuery>;
export type GetTimesheetEventsLazyQueryHookResult = ReturnType<typeof useGetTimesheetEventsLazyQuery>;
export type GetTimesheetEventsQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetTimesheetEventsQuery, SchemaTypes.IGetTimesheetEventsQueryVariables>;