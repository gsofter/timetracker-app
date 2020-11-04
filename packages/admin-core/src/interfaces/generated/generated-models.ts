/* tslint:disable */

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../apollo-context';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AnyObject: any;
  JSON: any;
  JSONObject: any;
};


export const enum IClientCacheTypeNames {
  Context = 'Context'
};

export type IContext = {
   __typename?: 'Context';
  orgName?: Maybe<Scalars['String']>;
};

/**  Database counter  */
export type ICounter = {
   __typename?: 'Counter';
  /**  Current amount  */
  amount: Scalars['Int'];
};

export type IFieldError = {
   __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};



export type IMutation = {
   __typename?: 'Mutation';
  /**  Increase counter value returns current counter amount  */
  addCounter?: Maybe<ICounter>;
  /**  add Counter  */
  addMoleculerCounter?: Maybe<ICounter>;
  dummy?: Maybe<Scalars['Int']>;
  /**  sync cached counter with current value  */
  syncCachedCounter?: Maybe<Scalars['Boolean']>;
  toggleSidebar?: Maybe<Scalars['Boolean']>;
};


export type IMutationaddCounterArgs = {
  amount?: Maybe<Scalars['Int']>;
};


export type IMutationaddMoleculerCounterArgs = {
  amount?: Maybe<Scalars['Int']>;
};


export type IMutationtoggleSidebarArgs = {
  state: Scalars['Boolean'];
};

export type IQuery = {
   __typename?: 'Query';
  /**  Counter  */
  counter?: Maybe<ICounter>;
  /**  Counter from Datasource  */
  counterCache?: Maybe<ICounter>;
  dummy?: Maybe<Scalars['Int']>;
  getContextProperty?: Maybe<Scalars['AnyObject']>;
  getOrgNameFromContext?: Maybe<IContext>;
  /**  Moleculer Counter  */
  moleculerCounter?: Maybe<ICounter>;
  sidebarState?: Maybe<Scalars['Boolean']>;
};


export type IQuerygetContextPropertyArgs = {
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ISubscription = {
   __typename?: 'Subscription';
  /**  Subscription fired when anyone increases counter  */
  counterUpdated?: Maybe<ICounter>;
  dummy?: Maybe<Scalars['Int']>;
  moleculerCounterUpdate?: Maybe<ICounter>;
};

export type IOrgNameInContextFragment = (
  { __typename?: 'Context' }
  & Pick<IContext, 'orgName'>
);

export type ItoggleSidebarMutationVariables = {
  state: Scalars['Boolean'];
};


export type ItoggleSidebarMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'toggleSidebar'>
);

export type IGetOrgNameFromContextQueryVariables = {};


export type IGetOrgNameFromContextQuery = (
  { __typename?: 'Query' }
  & { getOrgNameFromContext?: Maybe<(
    { __typename?: 'Context' }
    & IOrgNameInContextFragment
  )> }
);

export type IsidebarStateQueryVariables = {};


export type IsidebarStateQuery = (
  { __typename?: 'Query' }
  & Pick<IQuery, 'sidebarState'>
);

export const OrgNameInContextFragmentDoc = gql`
    fragment OrgNameInContext on Context {
  orgName
}
    `;
export const toggleSidebarDocument = gql`
    mutation toggleSidebar($state: Boolean!) {
  toggleSidebar(state: $state) @client
}
    `;
export type toggleSidebarMutationResult = ApolloReactCommon.MutationResult<ItoggleSidebarMutation>;
export type toggleSidebarMutationOptions = ApolloReactCommon.BaseMutationOptions<ItoggleSidebarMutation, ItoggleSidebarMutationVariables>;
export const GetOrgNameFromContextDocument = gql`
    query GetOrgNameFromContext {
  getOrgNameFromContext @client {
    ...OrgNameInContext
  }
}
    ${OrgNameInContextFragmentDoc}`;
export type GetOrgNameFromContextQueryResult = ApolloReactCommon.QueryResult<IGetOrgNameFromContextQuery, IGetOrgNameFromContextQueryVariables>;
export const sidebarStateDocument = gql`
    query sidebarState {
  sidebarState @client
}
    `;
export type sidebarStateQueryResult = ApolloReactCommon.QueryResult<IsidebarStateQuery, IsidebarStateQueryVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Counter: ResolverTypeWrapper<ICounter>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  AnyObject: ResolverTypeWrapper<Scalars['AnyObject']>,
  Context: ResolverTypeWrapper<IContext>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Mutation: ResolverTypeWrapper<{}>,
  Subscription: ResolverTypeWrapper<{}>,
  JSON: ResolverTypeWrapper<Scalars['JSON']>,
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>,
  FieldError: ResolverTypeWrapper<IFieldError>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  ClientCacheTypeNames: IClientCacheTypeNames,
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {},
  Counter: ICounter,
  Int: Scalars['Int'],
  String: Scalars['String'],
  AnyObject: Scalars['AnyObject'],
  Context: IContext,
  Boolean: Scalars['Boolean'],
  Mutation: {},
  Subscription: {},
  JSON: Scalars['JSON'],
  JSONObject: Scalars['JSONObject'],
  FieldError: IFieldError,
  ID: Scalars['ID'],
  ClientCacheTypeNames: IClientCacheTypeNames,
};

export interface IAnyObjectScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['AnyObject'], any> {
  name: 'AnyObject'
}

export type IContextResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Context'] = IResolversParentTypes['Context']> = {
  orgName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ICounterResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Counter'] = IResolversParentTypes['Counter']> = {
  amount?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IFieldErrorResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['FieldError'] = IResolversParentTypes['FieldError']> = {
  field?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  message?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface IJSONScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['JSON'], any> {
  name: 'JSON'
}

export interface IJSONObjectScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['JSONObject'], any> {
  name: 'JSONObject'
}

export type IMutationResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  addCounter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType, RequireFields<IMutationaddCounterArgs, never>>,
  addMoleculerCounter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType, RequireFields<IMutationaddMoleculerCounterArgs, never>>,
  dummy?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  syncCachedCounter?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  toggleSidebar?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationtoggleSidebarArgs, 'state'>>,
};

export type IQueryResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  counter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
  counterCache?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
  dummy?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  getContextProperty?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType, RequireFields<IQuerygetContextPropertyArgs, never>>,
  getOrgNameFromContext?: Resolver<Maybe<IResolversTypes['Context']>, ParentType, ContextType>,
  moleculerCounter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
  sidebarState?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type ISubscriptionResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Subscription'] = IResolversParentTypes['Subscription']> = {
  counterUpdated?: SubscriptionResolver<Maybe<IResolversTypes['Counter']>, "counterUpdated", ParentType, ContextType>,
  dummy?: SubscriptionResolver<Maybe<IResolversTypes['Int']>, "dummy", ParentType, ContextType>,
  moleculerCounterUpdate?: SubscriptionResolver<Maybe<IResolversTypes['Counter']>, "moleculerCounterUpdate", ParentType, ContextType>,
};

export type IResolvers<ContextType = MyContext> = {
  AnyObject?: GraphQLScalarType,
  Context?: IContextResolvers<ContextType>,
  Counter?: ICounterResolvers<ContextType>,
  FieldError?: IFieldErrorResolvers<ContextType>,
  JSON?: GraphQLScalarType,
  JSONObject?: GraphQLScalarType,
  Mutation?: IMutationResolvers<ContextType>,
  Query?: IQueryResolvers<ContextType>,
  Subscription?: ISubscriptionResolvers<ContextType>,
};


