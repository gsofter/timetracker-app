/* tslint:disable */

import * as SchemaTypes from '../interfaces';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';



















export const TimeRecordFragmentDoc = gql`
    fragment TimeRecord on TimeRecord {
  id
  startTime
  endTime
  taskId
  taskName
  description
  tags
  isBillable
  projectId
  clientId
  userId
  orgId
  timesheetId
  editable
}
    `;
export const CreateTimeRecordDocument = gql`
    mutation CreateTimeRecord($request: TimeRecordRequest) {
  createTimeRecord(request: $request)
}
    `;

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
    mutation RemoveTimeRecord($recordId: String!) {
  removeTimeRecord(recordId: $recordId)
}
    `;

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
    mutation UpdateTimeRecord($recordId: String!, $request: TimeRecordRequest) {
  updateTimeRecord(recordId: $recordId, request: $request)
}
    `;

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
export const UpdateTimesheetStatusDocument = gql`
    mutation UpdateTimesheetStatus($sheetId: String, $state: TimesheetState) {
  updateTimesheetStatus(sheetId: $sheetId, state: $state)
}
    `;

/**
 * __useUpdateTimesheetStatusMutation__
 *
 * To run a mutation, you first call `useUpdateTimesheetStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimesheetStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimesheetStatusMutation, { data, loading, error }] = useUpdateTimesheetStatusMutation({
 *   variables: {
 *      sheetId: // value for 'sheetId'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useUpdateTimesheetStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.IUpdateTimesheetStatusMutation, SchemaTypes.IUpdateTimesheetStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.IUpdateTimesheetStatusMutation, SchemaTypes.IUpdateTimesheetStatusMutationVariables>(UpdateTimesheetStatusDocument, baseOptions);
      }
export type UpdateTimesheetStatusMutationHookResult = ReturnType<typeof useUpdateTimesheetStatusMutation>;
export type UpdateTimesheetStatusMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.IUpdateTimesheetStatusMutation>;
export type UpdateTimesheetStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.IUpdateTimesheetStatusMutation, SchemaTypes.IUpdateTimesheetStatusMutationVariables>;
export const GetDurationTimeRecordsDocument = gql`
    query GetDurationTimeRecords($startTime: DateTime, $endTime: DateTime, $userId: String) {
  getDurationTimeRecords(startTime: $startTime, endTime: $endTime, userId: $userId) {
    id
    startTime
    endTime
    taskName
    description
    tags
    projectId
    isBillable
    userId
    timesheetId
  }
}
    `;

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
 *      userId: // value for 'userId'
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
export const GetDurationTimesheetsDocument = gql`
    query GetDurationTimesheets($start: DateTime, $end: DateTime) {
  getDurationTimesheets(start: $start, end: $end) {
    userId
    startDate
    endDate
    state
  }
}
    `;

/**
 * __useGetDurationTimesheetsQuery__
 *
 * To run a query within a React component, call `useGetDurationTimesheetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDurationTimesheetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDurationTimesheetsQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetDurationTimesheetsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetDurationTimesheetsQuery, SchemaTypes.IGetDurationTimesheetsQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetDurationTimesheetsQuery, SchemaTypes.IGetDurationTimesheetsQueryVariables>(GetDurationTimesheetsDocument, baseOptions);
      }
export function useGetDurationTimesheetsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetDurationTimesheetsQuery, SchemaTypes.IGetDurationTimesheetsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetDurationTimesheetsQuery, SchemaTypes.IGetDurationTimesheetsQueryVariables>(GetDurationTimesheetsDocument, baseOptions);
        }
export type GetDurationTimesheetsQueryHookResult = ReturnType<typeof useGetDurationTimesheetsQuery>;
export type GetDurationTimesheetsLazyQueryHookResult = ReturnType<typeof useGetDurationTimesheetsLazyQuery>;
export type GetDurationTimesheetsQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetDurationTimesheetsQuery, SchemaTypes.IGetDurationTimesheetsQueryVariables>;
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
    description
    tags
    projectId
    userId
    isBillable
  }
}
    `;

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
    query GetTimeRecords($userId: String) {
  getTimeRecords(userId: $userId) {
    id
    startTime
    endTime
    taskName
    description
    tags
    projectId
    isBillable
    userId
    timesheetId
  }
}
    `;

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
 *      userId: // value for 'userId'
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
    query GetTimesheets($userId: String, $withTotalHours: Boolean) {
  getTimesheets(userId: $userId, withTotalHours: $withTotalHours) {
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
    totalDuration
  }
}
    `;

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
 *      withTotalHours: // value for 'withTotalHours'
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
export const SubscribeToTimeTrackerDocument = gql`
    subscription SubscribeToTimeTracker($orgName: String, $userId: String) {
  SubscribeToTimeTracker(orgName: $orgName, userId: $userId) {
    mutation
    timeRecord {
      ...TimeRecord
    }
  }
}
    ${TimeRecordFragmentDoc}`;

/**
 * __useSubscribeToTimeTrackerSubscription__
 *
 * To run a query within a React component, call `useSubscribeToTimeTrackerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToTimeTrackerSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToTimeTrackerSubscription({
 *   variables: {
 *      orgName: // value for 'orgName'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSubscribeToTimeTrackerSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SchemaTypes.ISubscribeToTimeTrackerSubscription, SchemaTypes.ISubscribeToTimeTrackerSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SchemaTypes.ISubscribeToTimeTrackerSubscription, SchemaTypes.ISubscribeToTimeTrackerSubscriptionVariables>(SubscribeToTimeTrackerDocument, baseOptions);
      }
export type SubscribeToTimeTrackerSubscriptionHookResult = ReturnType<typeof useSubscribeToTimeTrackerSubscription>;
export type SubscribeToTimeTrackerSubscriptionResult = ApolloReactCommon.SubscriptionResult<SchemaTypes.ISubscribeToTimeTrackerSubscription>;