/* tslint:disable */

import * as SchemaTypes from '@admin-layout/schedule-module-core';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;




export const AddScheduleDocument = gql`
    mutation AddSchedule($request: ScheduleCreateRequest) {
  addSchedule(request: $request)
}
    `;
export type AddScheduleMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.AddScheduleMutation, SchemaTypes.AddScheduleMutationVariables>;
export type AddScheduleComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.AddScheduleMutation, SchemaTypes.AddScheduleMutationVariables>, 'mutation'>;

    export const AddScheduleComponent = (props: AddScheduleComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.AddScheduleMutation, SchemaTypes.AddScheduleMutationVariables> mutation={AddScheduleDocument} {...props} />
    );
    
export type AddScheduleProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<SchemaTypes.AddScheduleMutation, SchemaTypes.AddScheduleMutationVariables>
    } & TChildProps;
export function withAddSchedule<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SchemaTypes.AddScheduleMutation,
  SchemaTypes.AddScheduleMutationVariables,
  AddScheduleProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SchemaTypes.AddScheduleMutation, SchemaTypes.AddScheduleMutationVariables, AddScheduleProps<TChildProps, TDataName>>(AddScheduleDocument, {
      alias: 'addSchedule',
      ...operationOptions
    });
};

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
export function useAddScheduleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.AddScheduleMutation, SchemaTypes.AddScheduleMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.AddScheduleMutation, SchemaTypes.AddScheduleMutationVariables>(AddScheduleDocument, baseOptions);
      }
export type AddScheduleMutationHookResult = ReturnType<typeof useAddScheduleMutation>;
export type AddScheduleMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.AddScheduleMutation>;
export type AddScheduleMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.AddScheduleMutation, SchemaTypes.AddScheduleMutationVariables>;
export const GetScheduleEventsDocument = gql`
    query GetScheduleEvents($userId: String!) {
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
export type GetScheduleEventsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.GetScheduleEventsQuery, SchemaTypes.GetScheduleEventsQueryVariables>, 'query'> & ({ variables: SchemaTypes.GetScheduleEventsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetScheduleEventsComponent = (props: GetScheduleEventsComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.GetScheduleEventsQuery, SchemaTypes.GetScheduleEventsQueryVariables> query={GetScheduleEventsDocument} {...props} />
    );
    
export type GetScheduleEventsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<SchemaTypes.GetScheduleEventsQuery, SchemaTypes.GetScheduleEventsQueryVariables>
    } & TChildProps;
export function withGetScheduleEvents<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SchemaTypes.GetScheduleEventsQuery,
  SchemaTypes.GetScheduleEventsQueryVariables,
  GetScheduleEventsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, SchemaTypes.GetScheduleEventsQuery, SchemaTypes.GetScheduleEventsQueryVariables, GetScheduleEventsProps<TChildProps, TDataName>>(GetScheduleEventsDocument, {
      alias: 'getScheduleEvents',
      ...operationOptions
    });
};

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
export function useGetScheduleEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.GetScheduleEventsQuery, SchemaTypes.GetScheduleEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.GetScheduleEventsQuery, SchemaTypes.GetScheduleEventsQueryVariables>(GetScheduleEventsDocument, baseOptions);
      }
export function useGetScheduleEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.GetScheduleEventsQuery, SchemaTypes.GetScheduleEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.GetScheduleEventsQuery, SchemaTypes.GetScheduleEventsQueryVariables>(GetScheduleEventsDocument, baseOptions);
        }
export type GetScheduleEventsQueryHookResult = ReturnType<typeof useGetScheduleEventsQuery>;
export type GetScheduleEventsLazyQueryHookResult = ReturnType<typeof useGetScheduleEventsLazyQuery>;
export type GetScheduleEventsQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.GetScheduleEventsQuery, SchemaTypes.GetScheduleEventsQueryVariables>;