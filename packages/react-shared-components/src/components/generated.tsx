/* tslint:disable */

import * as SchemaTypes from '@admin-layout/core';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';



export const OrgNameInContextFragmentDoc: DocumentNode = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrgNameInContext"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Context"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orgName"},"arguments":[],"directives":[]}]}}]};
export const GetOrgNameFromContextDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrgNameFromContext"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOrgNameFromContext"},"arguments":[],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"},"arguments":[]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrgNameInContext"},"directives":[]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrgNameInContext"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Context"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orgName"},"arguments":[],"directives":[]}]}}]};

/**
 * __useGetOrgNameFromContextQuery__
 *
 * To run a query within a React component, call `useGetOrgNameFromContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgNameFromContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgNameFromContextQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrgNameFromContextQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SchemaTypes.IGetOrgNameFromContextQuery, SchemaTypes.IGetOrgNameFromContextQueryVariables>) {
        return ApolloReactHooks.useQuery<SchemaTypes.IGetOrgNameFromContextQuery, SchemaTypes.IGetOrgNameFromContextQueryVariables>(GetOrgNameFromContextDocument, baseOptions);
      }
export function useGetOrgNameFromContextLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SchemaTypes.IGetOrgNameFromContextQuery, SchemaTypes.IGetOrgNameFromContextQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SchemaTypes.IGetOrgNameFromContextQuery, SchemaTypes.IGetOrgNameFromContextQueryVariables>(GetOrgNameFromContextDocument, baseOptions);
        }
export type GetOrgNameFromContextQueryHookResult = ReturnType<typeof useGetOrgNameFromContextQuery>;
export type GetOrgNameFromContextLazyQueryHookResult = ReturnType<typeof useGetOrgNameFromContextLazyQuery>;
export type GetOrgNameFromContextQueryResult = ApolloReactCommon.QueryResult<SchemaTypes.IGetOrgNameFromContextQuery, SchemaTypes.IGetOrgNameFromContextQueryVariables>;