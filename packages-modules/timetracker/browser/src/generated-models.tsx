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
export const CreateTimesheetDocument = gql`
    mutation CreateTimesheet($request: TimesheetCreateRequest) {
  createTimesheet(request: $request)
}
    `;
export type ICreateTimesheetMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.ICreateTimesheetMutation, SchemaTypes.ICreateTimesheetMutationVariables>;
export type CreateTimesheetComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.ICreateTimesheetMutation, SchemaTypes.ICreateTimesheetMutationVariables>, 'mutation'>;

    export const CreateTimesheetComponent = (props: CreateTimesheetComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.ICreateTimesheetMutation, SchemaTypes.ICreateTimesheetMutationVariables> mutation={CreateTimesheetDocument} {...props} />
    );
    

/**
 * __useCreateTimesheetMutation__
 *
 * To run a mutation, you first call `useCreateTimesheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTimesheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTimesheetMutation, { data, loading, error }] = useCreateTimesheetMutation({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useCreateTimesheetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.ICreateTimesheetMutation, SchemaTypes.ICreateTimesheetMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.ICreateTimesheetMutation, SchemaTypes.ICreateTimesheetMutationVariables>(CreateTimesheetDocument, baseOptions);
      }
export type CreateTimesheetMutationHookResult = ReturnType<typeof useCreateTimesheetMutation>;
export type CreateTimesheetMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.ICreateTimesheetMutation>;
export type CreateTimesheetMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.ICreateTimesheetMutation, SchemaTypes.ICreateTimesheetMutationVariables>;
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
export const RemoveTimesheetDocument = gql`
    mutation RemoveTimesheet($sheetId: String) {
  removeTimesheet(sheetId: $sheetId)
}
    `;
export type IRemoveTimesheetMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IRemoveTimesheetMutation, SchemaTypes.IRemoveTimesheetMutationVariables>;
export type RemoveTimesheetComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IRemoveTimesheetMutation, SchemaTypes.IRemoveTimesheetMutationVariables>, 'mutation'>;

    export const RemoveTimesheetComponent = (props: RemoveTimesheetComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IRemoveTimesheetMutation, SchemaTypes.IRemoveTimesheetMutationVariables> mutation={RemoveTimesheetDocument} {...props} />
    );
    

/**
 * __useRemoveTimesheetMutation__
 *
 * To run a mutation, you first call `useRemoveTimesheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTimesheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTimesheetMutation, { data, loading, error }] = useRemoveTimesheetMutation({
 *   variables: {
 *      sheetId: // value for 'sheetId'
 *   },
 * });
 */
export function useRemoveTimesheetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IRemoveTimesheetMutation, SchemaTypes.IRemoveTimesheetMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IRemoveTimesheetMutation, SchemaTypes.IRemoveTimesheetMutationVariables>(RemoveTimesheetDocument, baseOptions);
      }
export type RemoveTimesheetMutationHookResult = ReturnType<typeof useRemoveTimesheetMutation>;
export type RemoveTimesheetMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IRemoveTimesheetMutation>;
export type RemoveTimesheetMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IRemoveTimesheetMutation, SchemaTypes.IRemoveTimesheetMutationVariables>;
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
export const UpdateTimeSheetDocument = gql`
    mutation UpdateTimeSheet($sheetId: String, $request: TimesheetCreateRequest) {
  updateTimesheet(sheetId: $sheetId, request: $request)
}
    `;
export type IUpdateTimeSheetMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IUpdateTimeSheetMutation, SchemaTypes.IUpdateTimeSheetMutationVariables>;
export type UpdateTimeSheetComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IUpdateTimeSheetMutation, SchemaTypes.IUpdateTimeSheetMutationVariables>, 'mutation'>;

    export const UpdateTimeSheetComponent = (props: UpdateTimeSheetComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IUpdateTimeSheetMutation, SchemaTypes.IUpdateTimeSheetMutationVariables> mutation={UpdateTimeSheetDocument} {...props} />
    );
    

/**
 * __useUpdateTimeSheetMutation__
 *
 * To run a mutation, you first call `useUpdateTimeSheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimeSheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimeSheetMutation, { data, loading, error }] = useUpdateTimeSheetMutation({
 *   variables: {
 *      sheetId: // value for 'sheetId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateTimeSheetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IUpdateTimeSheetMutation, SchemaTypes.IUpdateTimeSheetMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IUpdateTimeSheetMutation, SchemaTypes.IUpdateTimeSheetMutationVariables>(UpdateTimeSheetDocument, baseOptions);
      }
export type UpdateTimeSheetMutationHookResult = ReturnType<typeof useUpdateTimeSheetMutation>;
export type UpdateTimeSheetMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IUpdateTimeSheetMutation>;
export type UpdateTimeSheetMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IUpdateTimeSheetMutation, SchemaTypes.IUpdateTimeSheetMutationVariables>;
export const GetPlayingTimeRecordDocument = gql`
    query GetPlayingTimeRecord {
  getPlayingTimeRecord {
    id
    startTime
    endTime
    task
    tags
    projectId
    clientId
    totalTime
    isBillable
  }
}
    `;
export type GetPlayingTimeRecordComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.IGetPlayingTimeRecordQuery, SchemaTypes.IGetPlayingTimeRecordQueryVariables>, 'query'>;

    export const GetPlayingTimeRecordComponent = (props: GetPlayingTimeRecordComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.IGetPlayingTimeRecordQuery, SchemaTypes.IGetPlayingTimeRecordQueryVariables> query={GetPlayingTimeRecordDocument} {...props} />
    );
    

/**
 * __useGetPlayingTimeRecordQuery__
 *
 * To run a query within a React component, call `useGetPlayingTimeRecordQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayingTimeRecordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayingTimeRecordQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlayingTimeRecordQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetPlayingTimeRecordQuery, SchemaTypes.IGetPlayingTimeRecordQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetPlayingTimeRecordQuery, SchemaTypes.IGetPlayingTimeRecordQueryVariables>(GetPlayingTimeRecordDocument, baseOptions);
      }
export function useGetPlayingTimeRecordLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetPlayingTimeRecordQuery, SchemaTypes.IGetPlayingTimeRecordQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetPlayingTimeRecordQuery, SchemaTypes.IGetPlayingTimeRecordQueryVariables>(GetPlayingTimeRecordDocument, baseOptions);
        }
export type GetPlayingTimeRecordQueryHookResult = ReturnType<typeof useGetPlayingTimeRecordQuery>;
export type GetPlayingTimeRecordLazyQueryHookResult = ReturnType<typeof useGetPlayingTimeRecordLazyQuery>;
export type GetPlayingTimeRecordQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetPlayingTimeRecordQuery, SchemaTypes.IGetPlayingTimeRecordQueryVariables>;
export const GetTimeRecordsDocument = gql`
    query GetTimeRecords {
  getTimeRecords {
    id
    startTime
    endTime
    task
    tags
    projectId
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
export const GetTimesheetsDocument = gql`
    query GetTimesheets($userId: String) {
  getTimesheets(userId: $userId) {
    id
    dateRange {
      startDate
      endDate
    }
  }
}
    `;
export type GetTimesheetsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.IGetTimesheetsQuery, SchemaTypes.IGetTimesheetsQueryVariables>, 'query'>;

    export const GetTimesheetsComponent = (props: GetTimesheetsComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.IGetTimesheetsQuery, SchemaTypes.IGetTimesheetsQueryVariables> query={GetTimesheetsDocument} {...props} />
    );
    

/**
 * __useGetTimesheetsQuery__
 *
 * To run a query within a React component, call `useGetTimesheetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimesheetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimesheetsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetTimesheetsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetTimesheetsQuery, SchemaTypes.IGetTimesheetsQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetTimesheetsQuery, SchemaTypes.IGetTimesheetsQueryVariables>(GetTimesheetsDocument, baseOptions);
      }
export function useGetTimesheetsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetTimesheetsQuery, SchemaTypes.IGetTimesheetsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetTimesheetsQuery, SchemaTypes.IGetTimesheetsQueryVariables>(GetTimesheetsDocument, baseOptions);
        }
export type GetTimesheetsQueryHookResult = ReturnType<typeof useGetTimesheetsQuery>;
export type GetTimesheetsLazyQueryHookResult = ReturnType<typeof useGetTimesheetsLazyQuery>;
export type GetTimesheetsQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetTimesheetsQuery, SchemaTypes.IGetTimesheetsQueryVariables>;