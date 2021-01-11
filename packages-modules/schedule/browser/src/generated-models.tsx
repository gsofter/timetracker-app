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