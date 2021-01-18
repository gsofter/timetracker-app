/* tslint:disable */

import * as SchemaTypes from '@admin-layout/timetracker-module-core';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;






export const CreateTimeRecordDocument = gql`
    mutation CreateTimeRecord($request: TimeRecordRequest) {
  createTimeRecord(request: $request)
}
    `;
export type ICreateTimeRecordMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.ICreateTimeRecordMutation, SchemaTypes.ICreateTimeRecordMutationVariables>;
export type CreateTimeRecordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.ICreateTimeRecordMutation, SchemaTypes.ICreateTimeRecordMutationVariables>, 'mutation'>;

    export const CreateTimeRecordComponent = (props: CreateTimeRecordComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.ICreateTimeRecordMutation, SchemaTypes.ICreateTimeRecordMutationVariables> mutation={CreateTimeRecordDocument} {...props} />
    );
    

/**
 * __useCreateTimeRecordMutation__
 *
 * To run a mutation, you first call `useCreateTimeRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTimeRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTimeRecordMutation, { data, loading, error }] = useCreateTimeRecordMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateTimeRecordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.ICreateTimeRecordMutation, SchemaTypes.ICreateTimeRecordMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.ICreateTimeRecordMutation, SchemaTypes.ICreateTimeRecordMutationVariables>(CreateTimeRecordDocument, baseOptions);
      }
export type CreateTimeRecordMutationHookResult = ReturnType<typeof useCreateTimeRecordMutation>;
export type CreateTimeRecordMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.ICreateTimeRecordMutation>;
export type CreateTimeRecordMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.ICreateTimeRecordMutation, SchemaTypes.ICreateTimeRecordMutationVariables>;
export const RemoveTimeRecordDocument = gql`
    mutation RemoveTimeRecord($recordId: String) {
  removeTimeRecord(recordId: $recordId)
}
    `;
export type IRemoveTimeRecordMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IRemoveTimeRecordMutation, SchemaTypes.IRemoveTimeRecordMutationVariables>;
export type RemoveTimeRecordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IRemoveTimeRecordMutation, SchemaTypes.IRemoveTimeRecordMutationVariables>, 'mutation'>;

    export const RemoveTimeRecordComponent = (props: RemoveTimeRecordComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IRemoveTimeRecordMutation, SchemaTypes.IRemoveTimeRecordMutationVariables> mutation={RemoveTimeRecordDocument} {...props} />
    );
    

/**
 * __useRemoveTimeRecordMutation__
 *
 * To run a mutation, you first call `useRemoveTimeRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTimeRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTimeRecordMutation, { data, loading, error }] = useRemoveTimeRecordMutation({
 *   variables: {
 *      recordId: // value for 'recordId'
 *   },
 * });
 */
export function useRemoveTimeRecordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IRemoveTimeRecordMutation, SchemaTypes.IRemoveTimeRecordMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IRemoveTimeRecordMutation, SchemaTypes.IRemoveTimeRecordMutationVariables>(RemoveTimeRecordDocument, baseOptions);
      }
export type RemoveTimeRecordMutationHookResult = ReturnType<typeof useRemoveTimeRecordMutation>;
export type RemoveTimeRecordMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IRemoveTimeRecordMutation>;
export type RemoveTimeRecordMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IRemoveTimeRecordMutation, SchemaTypes.IRemoveTimeRecordMutationVariables>;
export const UpdateTimeRecordDocument = gql`
    mutation UpdateTimeRecord($recordId: String, $request: TimeRecordRequest) {
  updateTimeRecord(recordId: $recordId, request: $request)
}
    `;
export type IUpdateTimeRecordMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IUpdateTimeRecordMutation, SchemaTypes.IUpdateTimeRecordMutationVariables>;
export type UpdateTimeRecordComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IUpdateTimeRecordMutation, SchemaTypes.IUpdateTimeRecordMutationVariables>, 'mutation'>;

    export const UpdateTimeRecordComponent = (props: UpdateTimeRecordComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IUpdateTimeRecordMutation, SchemaTypes.IUpdateTimeRecordMutationVariables> mutation={UpdateTimeRecordDocument} {...props} />
    );
    

/**
 * __useUpdateTimeRecordMutation__
 *
 * To run a mutation, you first call `useUpdateTimeRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimeRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimeRecordMutation, { data, loading, error }] = useUpdateTimeRecordMutation({
 *   variables: {
 *      recordId: // value for 'recordId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateTimeRecordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IUpdateTimeRecordMutation, SchemaTypes.IUpdateTimeRecordMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IUpdateTimeRecordMutation, SchemaTypes.IUpdateTimeRecordMutationVariables>(UpdateTimeRecordDocument, baseOptions);
      }
export type UpdateTimeRecordMutationHookResult = ReturnType<typeof useUpdateTimeRecordMutation>;
export type UpdateTimeRecordMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IUpdateTimeRecordMutation>;
export type UpdateTimeRecordMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IUpdateTimeRecordMutation, SchemaTypes.IUpdateTimeRecordMutationVariables>;
export const GetTimeRecordsDocument = gql`
    query GetTimeRecords {
  getTimeRecords {
    id
    start
    end
    task
    tags
    projectId
    clientId
    totalTime
    isBillable
  }
}
    `;
export type GetTimeRecordsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.IGetTimeRecordsQuery, SchemaTypes.IGetTimeRecordsQueryVariables>, 'query'>;

    export const GetTimeRecordsComponent = (props: GetTimeRecordsComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.IGetTimeRecordsQuery, SchemaTypes.IGetTimeRecordsQueryVariables> query={GetTimeRecordsDocument} {...props} />
    );
    

/**
 * __useGetTimeRecordsQuery__
 *
 * To run a query within a React component, call `useGetTimeRecordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimeRecordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimeRecordsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTimeRecordsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetTimeRecordsQuery, SchemaTypes.IGetTimeRecordsQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetTimeRecordsQuery, SchemaTypes.IGetTimeRecordsQueryVariables>(GetTimeRecordsDocument, baseOptions);
      }
export function useGetTimeRecordsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetTimeRecordsQuery, SchemaTypes.IGetTimeRecordsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetTimeRecordsQuery, SchemaTypes.IGetTimeRecordsQueryVariables>(GetTimeRecordsDocument, baseOptions);
        }
export type GetTimeRecordsQueryHookResult = ReturnType<typeof useGetTimeRecordsQuery>;
export type GetTimeRecordsLazyQueryHookResult = ReturnType<typeof useGetTimeRecordsLazyQuery>;
export type GetTimeRecordsQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetTimeRecordsQuery, SchemaTypes.IGetTimeRecordsQueryVariables>;