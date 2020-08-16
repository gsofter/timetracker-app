/* tslint:disable */

import * as SchemaTypes from '@admin-layout/core';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';




export const toggleSidebarDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleSidebar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleSidebar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"},"arguments":[]}]}]}}]};

/**
 * __usetoggleSidebarMutation__
 *
 * To run a mutation, you first call `usetoggleSidebarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usetoggleSidebarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleSidebarMutation, { data, loading, error }] = usetoggleSidebarMutation({
 *   variables: {
 *      state: // value for 'state'
 *   },
 * });
 */
export function usetoggleSidebarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SchemaTypes.ItoggleSidebarMutation, SchemaTypes.ItoggleSidebarMutationVariables>) {
        return ApolloReactHooks.useMutation<SchemaTypes.ItoggleSidebarMutation, SchemaTypes.ItoggleSidebarMutationVariables>(toggleSidebarDocument, baseOptions);
      }
export type toggleSidebarMutationHookResult = ReturnType<typeof usetoggleSidebarMutation>;
export type toggleSidebarMutationResult = ApolloReactCommon.MutationResult<SchemaTypes.ItoggleSidebarMutation>;
export type toggleSidebarMutationOptions = ApolloReactCommon.BaseMutationOptions<SchemaTypes.ItoggleSidebarMutation, SchemaTypes.ItoggleSidebarMutationVariables>;
export const sidebarStateDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"sidebarState"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sidebarState"},"arguments":[],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"},"arguments":[]}]}]}}]};

/**
 * __usesidebarStateQuery__
 *
 * To run a query within a React component, call `usesidebarStateQuery` and pass it any options that fit your needs.
 * When your component renders, `usesidebarStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usesidebarStateQuery({
 *   variables: {
 *   },
 * });
 */
export function usesidebarStateQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IsidebarStateQuery, SchemaTypes.IsidebarStateQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IsidebarStateQuery, SchemaTypes.IsidebarStateQueryVariables>(sidebarStateDocument, baseOptions);
      }
export function usesidebarStateLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IsidebarStateQuery, SchemaTypes.IsidebarStateQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IsidebarStateQuery, SchemaTypes.IsidebarStateQueryVariables>(sidebarStateDocument, baseOptions);
        }
export type sidebarStateQueryHookResult = ReturnType<typeof usesidebarStateQuery>;
export type sidebarStateLazyQueryHookResult = ReturnType<typeof usesidebarStateLazyQuery>;
export type sidebarStateQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IsidebarStateQuery, SchemaTypes.IsidebarStateQueryVariables>;