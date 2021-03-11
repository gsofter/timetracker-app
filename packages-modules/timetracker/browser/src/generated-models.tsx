/* tslint:disable */

import * as SchemaTypes from '@admin-layout/timetracker-core';

import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;


















export const GetTagsDocument = gql`
    query GetTags {
  getTags @client {
    id
    name
  }
}
    `;
export type GetTagsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.IGetTagsQuery, SchemaTypes.IGetTagsQueryVariables>, 'query'>;

    export const GetTagsComponent = (props: GetTagsComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.IGetTagsQuery, SchemaTypes.IGetTagsQueryVariables> query={GetTagsDocument} {...props} />
    );
    

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetTagsQuery, SchemaTypes.IGetTagsQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetTagsQuery, SchemaTypes.IGetTagsQueryVariables>(GetTagsDocument, baseOptions);
      }
export function useGetTagsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetTagsQuery, SchemaTypes.IGetTagsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetTagsQuery, SchemaTypes.IGetTagsQueryVariables>(GetTagsDocument, baseOptions);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetTagsQuery, SchemaTypes.IGetTagsQueryVariables>;
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
export const RemoveDurationTimeRecordsDocument = gql`
    mutation RemoveDurationTimeRecords($startTime: DateTime, $endTime: DateTime, $projectId: String) {
  removeDurationTimeRecords(startTime: $startTime, endTime: $endTime, projectId: $projectId)
}
    `;
export type IRemoveDurationTimeRecordsMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IRemoveDurationTimeRecordsMutation, SchemaTypes.IRemoveDurationTimeRecordsMutationVariables>;
export type RemoveDurationTimeRecordsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IRemoveDurationTimeRecordsMutation, SchemaTypes.IRemoveDurationTimeRecordsMutationVariables>, 'mutation'>;

    export const RemoveDurationTimeRecordsComponent = (props: RemoveDurationTimeRecordsComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IRemoveDurationTimeRecordsMutation, SchemaTypes.IRemoveDurationTimeRecordsMutationVariables> mutation={RemoveDurationTimeRecordsDocument} {...props} />
    );
    

/**
 * __useRemoveDurationTimeRecordsMutation__
 *
 * To run a mutation, you first call `useRemoveDurationTimeRecordsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDurationTimeRecordsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDurationTimeRecordsMutation, { data, loading, error }] = useRemoveDurationTimeRecordsMutation({
 *   variables: {
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useRemoveDurationTimeRecordsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IRemoveDurationTimeRecordsMutation, SchemaTypes.IRemoveDurationTimeRecordsMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IRemoveDurationTimeRecordsMutation, SchemaTypes.IRemoveDurationTimeRecordsMutationVariables>(RemoveDurationTimeRecordsDocument, baseOptions);
      }
export type RemoveDurationTimeRecordsMutationHookResult = ReturnType<typeof useRemoveDurationTimeRecordsMutation>;
export type RemoveDurationTimeRecordsMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IRemoveDurationTimeRecordsMutation>;
export type RemoveDurationTimeRecordsMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IRemoveDurationTimeRecordsMutation, SchemaTypes.IRemoveDurationTimeRecordsMutationVariables>;
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
export const UpdateTimesheetDocument = gql`
    mutation UpdateTimesheet($sheetId: String, $request: TimesheetCreateRequest) {
  updateTimesheet(sheetId: $sheetId, request: $request)
}
    `;
export type IUpdateTimesheetMutationFn = ApolloReactCommon.MutationFunction<SchemaTypes.IUpdateTimesheetMutation, SchemaTypes.IUpdateTimesheetMutationVariables>;
export type UpdateTimesheetComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SchemaTypes.IUpdateTimesheetMutation, SchemaTypes.IUpdateTimesheetMutationVariables>, 'mutation'>;

    export const UpdateTimesheetComponent = (props: UpdateTimesheetComponentProps) => (
      <ApolloReactComponents.Mutation<SchemaTypes.IUpdateTimesheetMutation, SchemaTypes.IUpdateTimesheetMutationVariables> mutation={UpdateTimesheetDocument} {...props} />
    );
    

/**
 * __useUpdateTimesheetMutation__
 *
 * To run a mutation, you first call `useUpdateTimesheetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimesheetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimesheetMutation, { data, loading, error }] = useUpdateTimesheetMutation({
 *   variables: {
 *      sheetId: // value for 'sheetId'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useUpdateTimesheetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IUpdateTimesheetMutation, SchemaTypes.IUpdateTimesheetMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IUpdateTimesheetMutation, SchemaTypes.IUpdateTimesheetMutationVariables>(UpdateTimesheetDocument, baseOptions);
      }
export type UpdateTimesheetMutationHookResult = ReturnType<typeof useUpdateTimesheetMutation>;
export type UpdateTimesheetMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IUpdateTimesheetMutation>;
export type UpdateTimesheetMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IUpdateTimesheetMutation, SchemaTypes.IUpdateTimesheetMutationVariables>;
export const GetDurationTimeRecordsDocument = gql`
    query GetDurationTimeRecords($startTime: DateTime, $endTime: DateTime) {
  getDurationTimeRecords(startTime: $startTime, endTime: $endTime) {
    id
    startTime
    endTime
    taskName
    tags
    projectId
    isBillable
  }
}
    `;
export type GetDurationTimeRecordsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.IGetDurationTimeRecordsQuery, SchemaTypes.IGetDurationTimeRecordsQueryVariables>, 'query'>;

    export const GetDurationTimeRecordsComponent = (props: GetDurationTimeRecordsComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.IGetDurationTimeRecordsQuery, SchemaTypes.IGetDurationTimeRecordsQueryVariables> query={GetDurationTimeRecordsDocument} {...props} />
    );
    

/**
 * __useGetDurationTimeRecordsQuery__
 *
 * To run a query within a React component, call `useGetDurationTimeRecordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDurationTimeRecordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDurationTimeRecordsQuery({
 *   variables: {
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *   },
 * });
 */
export function useGetDurationTimeRecordsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetDurationTimeRecordsQuery, SchemaTypes.IGetDurationTimeRecordsQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetDurationTimeRecordsQuery, SchemaTypes.IGetDurationTimeRecordsQueryVariables>(GetDurationTimeRecordsDocument, baseOptions);
      }
export function useGetDurationTimeRecordsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetDurationTimeRecordsQuery, SchemaTypes.IGetDurationTimeRecordsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetDurationTimeRecordsQuery, SchemaTypes.IGetDurationTimeRecordsQueryVariables>(GetDurationTimeRecordsDocument, baseOptions);
        }
export type GetDurationTimeRecordsQueryHookResult = ReturnType<typeof useGetDurationTimeRecordsQuery>;
export type GetDurationTimeRecordsLazyQueryHookResult = ReturnType<typeof useGetDurationTimeRecordsLazyQuery>;
export type GetDurationTimeRecordsQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetDurationTimeRecordsQuery, SchemaTypes.IGetDurationTimeRecordsQueryVariables>;
export const GetDurationTimesheetDocument = gql`
    query GetDurationTimesheet($start: DateTime, $end: DateTime) {
  getDurationTimesheet(start: $start, end: $end) {
    startDate
    endDate
    state
  }
}
    `;
export type GetDurationTimesheetComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.IGetDurationTimesheetQuery, SchemaTypes.IGetDurationTimesheetQueryVariables>, 'query'>;

    export const GetDurationTimesheetComponent = (props: GetDurationTimesheetComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.IGetDurationTimesheetQuery, SchemaTypes.IGetDurationTimesheetQueryVariables> query={GetDurationTimesheetDocument} {...props} />
    );
    

/**
 * __useGetDurationTimesheetQuery__
 *
 * To run a query within a React component, call `useGetDurationTimesheetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDurationTimesheetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDurationTimesheetQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetDurationTimesheetQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetDurationTimesheetQuery, SchemaTypes.IGetDurationTimesheetQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetDurationTimesheetQuery, SchemaTypes.IGetDurationTimesheetQueryVariables>(GetDurationTimesheetDocument, baseOptions);
      }
export function useGetDurationTimesheetLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetDurationTimesheetQuery, SchemaTypes.IGetDurationTimesheetQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetDurationTimesheetQuery, SchemaTypes.IGetDurationTimesheetQueryVariables>(GetDurationTimesheetDocument, baseOptions);
        }
export type GetDurationTimesheetQueryHookResult = ReturnType<typeof useGetDurationTimesheetQuery>;
export type GetDurationTimesheetLazyQueryHookResult = ReturnType<typeof useGetDurationTimesheetLazyQuery>;
export type GetDurationTimesheetQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetDurationTimesheetQuery, SchemaTypes.IGetDurationTimesheetQueryVariables>;
export const GetOrganizationMembersDocument = gql`
    query GetOrganizationMembers {
  getOrganizationMembers {
    _id
    userId
    role
    name
    teamNames
  }
}
    `;
export type GetOrganizationMembersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.IGetOrganizationMembersQuery, SchemaTypes.IGetOrganizationMembersQueryVariables>, 'query'>;

    export const GetOrganizationMembersComponent = (props: GetOrganizationMembersComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.IGetOrganizationMembersQuery, SchemaTypes.IGetOrganizationMembersQueryVariables> query={GetOrganizationMembersDocument} {...props} />
    );
    

/**
 * __useGetOrganizationMembersQuery__
 *
 * To run a query within a React component, call `useGetOrganizationMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrganizationMembersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetOrganizationMembersQuery, SchemaTypes.IGetOrganizationMembersQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetOrganizationMembersQuery, SchemaTypes.IGetOrganizationMembersQueryVariables>(GetOrganizationMembersDocument, baseOptions);
      }
export function useGetOrganizationMembersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetOrganizationMembersQuery, SchemaTypes.IGetOrganizationMembersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetOrganizationMembersQuery, SchemaTypes.IGetOrganizationMembersQueryVariables>(GetOrganizationMembersDocument, baseOptions);
        }
export type GetOrganizationMembersQueryHookResult = ReturnType<typeof useGetOrganizationMembersQuery>;
export type GetOrganizationMembersLazyQueryHookResult = ReturnType<typeof useGetOrganizationMembersLazyQuery>;
export type GetOrganizationMembersQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetOrganizationMembersQuery, SchemaTypes.IGetOrganizationMembersQueryVariables>;
export const GetPlayingTimeRecordDocument = gql`
    query GetPlayingTimeRecord {
  getPlayingTimeRecord {
    id
    startTime
    endTime
    taskName
    tags
    projectId
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
export const GetProjectsDocument = gql`
    query GetProjects {
  getProjects {
    id
    name
    clientId
    teams
    status
    orgName
  }
}
    `;
export type GetProjectsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.IGetProjectsQuery, SchemaTypes.IGetProjectsQueryVariables>, 'query'>;

    export const GetProjectsComponent = (props: GetProjectsComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.IGetProjectsQuery, SchemaTypes.IGetProjectsQueryVariables> query={GetProjectsDocument} {...props} />
    );
    

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetProjectsQuery, SchemaTypes.IGetProjectsQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetProjectsQuery, SchemaTypes.IGetProjectsQueryVariables>(GetProjectsDocument, baseOptions);
      }
export function useGetProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetProjectsQuery, SchemaTypes.IGetProjectsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetProjectsQuery, SchemaTypes.IGetProjectsQueryVariables>(GetProjectsDocument, baseOptions);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetProjectsQuery, SchemaTypes.IGetProjectsQueryVariables>;
export const GetTimeRecordsDocument = gql`
    query GetTimeRecords {
  getTimeRecords {
    id
    startTime
    endTime
    taskName
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
    userId
    orgId
    startDate
    endDate
    state
    submittedOn
    approvedOn
    updatedBy
    updatedOn
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
export const GetMembersDocument = gql`
    query GetMembers {
  getOrganizationMembers {
    userId
    role
    name
    teamNames
  }
}
    `;
export type GetMembersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SchemaTypes.IGetMembersQuery, SchemaTypes.IGetMembersQueryVariables>, 'query'>;

    export const GetMembersComponent = (props: GetMembersComponentProps) => (
      <ApolloReactComponents.Query<SchemaTypes.IGetMembersQuery, SchemaTypes.IGetMembersQueryVariables> query={GetMembersDocument} {...props} />
    );
    

/**
 * __useGetMembersQuery__
 *
 * To run a query within a React component, call `useGetMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMembersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetMembersQuery, SchemaTypes.IGetMembersQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetMembersQuery, SchemaTypes.IGetMembersQueryVariables>(GetMembersDocument, baseOptions);
      }
export function useGetMembersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetMembersQuery, SchemaTypes.IGetMembersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetMembersQuery, SchemaTypes.IGetMembersQueryVariables>(GetMembersDocument, baseOptions);
        }
export type GetMembersQueryHookResult = ReturnType<typeof useGetMembersQuery>;
export type GetMembersLazyQueryHookResult = ReturnType<typeof useGetMembersLazyQuery>;
export type GetMembersQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetMembersQuery, SchemaTypes.IGetMembersQueryVariables>;