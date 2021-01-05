/* tslint:disable */

import * as SchemaTypes from '@admin-layout/schedule-module-core';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;




export const AddScheduleDocument = gql`
    mutation AddSchedule($request: ScheduleCreateRequest) {
  addSchedule(request: $request)
}
    `;
export type IAddScheduleMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IAddScheduleMutation, SchemaTypes.IAddScheduleMutationVariables>;
export type AddScheduleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IAddScheduleMutation, SchemaTypes.IAddScheduleMutationVariables>, 'mutation'>;

    export const AddScheduleComponent = (props: AddScheduleComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IAddScheduleMutation, SchemaTypes.IAddScheduleMutationVariables> mutation={AddScheduleDocument} {...props} />
    );
    

/**
 * __useAddScheduleMutation__
 *
 * To run a mutation, you first call `useAddScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addScheduleMutation, { data, loading, error }] = useAddScheduleMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useAddScheduleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IAddScheduleMutation, SchemaTypes.IAddScheduleMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IAddScheduleMutation, SchemaTypes.IAddScheduleMutationVariables>(AddScheduleDocument, baseOptions);
      }
export type AddScheduleMutationHookResult = ReturnType<typeof useAddScheduleMutation>;
export type AddScheduleMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IAddScheduleMutation>;
export type AddScheduleMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IAddScheduleMutation, SchemaTypes.IAddScheduleMutationVariables>;
export const GetScheduleEventsDocument = gql`
    query GetScheduleEvents($userId: String) {
  getScheduleEvents(userId: $userId) {
    title
    allDay
    start
    end
    desc
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