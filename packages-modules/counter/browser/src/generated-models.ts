/* tslint:disable */

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  Date: any;
  Time: any;
  DateTime: any;
  JSON: any;
  JSONObject: any;
};


export type ClientCounter = {
   __typename?: 'ClientCounter';
  counter?: Maybe<Scalars['Int']>;
};

/**  Database counter  */
export type Counter = {
   __typename?: 'Counter';
  /**  Current amount  */
  amount: Scalars['Int'];
};



export type FieldError = {
   __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};



export type Mutation = {
   __typename?: 'Mutation';
  /**  Increase counter value returns current counter amount  */
  addCounter?: Maybe<Counter>;
  addCounterState?: Maybe<ClientCounter>;
  /**  add Counter  */
  addMoleculerCounter?: Maybe<Counter>;
  dummy?: Maybe<Scalars['Int']>;
  /**  sync cached counter with current value  */
  syncCachedCounter?: Maybe<Scalars['Boolean']>;
};


export type MutationAddCounterArgs = {
  amount?: Maybe<Scalars['Int']>;
};


export type MutationAddCounterStateArgs = {
  amount: Scalars['Int'];
};


export type MutationAddMoleculerCounterArgs = {
  amount?: Maybe<Scalars['Int']>;
};

export type Query = {
   __typename?: 'Query';
  /**  Counter  */
  counter?: Maybe<Counter>;
  /**  Counter from Datasource  */
  counterCache?: Maybe<Counter>;
  counterState?: Maybe<ClientCounter>;
  dummy?: Maybe<Scalars['Int']>;
  /**  Moleculer Counter  */
  moleculerCounter?: Maybe<Counter>;
};

export type Subscription = {
   __typename?: 'Subscription';
  /**  Subscription fired when anyone increases counter  */
  counterUpdated?: Maybe<Counter>;
  dummy?: Maybe<Scalars['Int']>;
  moleculerCounterUpdate?: Maybe<Counter>;
};


export type AddCounterStateMutationVariables = {
  amount: Scalars['Int'];
};


export type AddCounterStateMutation = (
  { __typename?: 'Mutation' }
  & { addCounterState?: Maybe<(
    { __typename?: 'ClientCounter' }
    & Pick<ClientCounter, 'counter'>
  )> }
);

export type AddCounterMutationVariables = {
  amount: Scalars['Int'];
};


export type AddCounterMutation = (
  { __typename?: 'Mutation' }
  & { addCounter?: Maybe<(
    { __typename?: 'Counter' }
    & Pick<Counter, 'amount'>
  )> }
);

export type AddCounter_WsMutationVariables = {
  amount: Scalars['Int'];
};


export type AddCounter_WsMutation = (
  { __typename?: 'Mutation' }
  & { addCounter?: Maybe<(
    { __typename?: 'Counter' }
    & Pick<Counter, 'amount'>
  )> }
);

export type SyncCachedCounterMutationVariables = {};


export type SyncCachedCounterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'syncCachedCounter'>
);

export type CounterCacheQueryQueryVariables = {};


export type CounterCacheQueryQuery = (
  { __typename?: 'Query' }
  & { counterCache?: Maybe<(
    { __typename?: 'Counter' }
    & Pick<Counter, 'amount'>
  )> }
);

export type CounterStateQueryVariables = {};


export type CounterStateQuery = (
  { __typename?: 'Query' }
  & { counterState?: Maybe<(
    { __typename?: 'ClientCounter' }
    & Pick<ClientCounter, 'counter'>
  )> }
);

export type CounterQueryQueryVariables = {};


export type CounterQueryQuery = (
  { __typename?: 'Query' }
  & { counter?: Maybe<(
    { __typename?: 'Counter' }
    & Pick<Counter, 'amount'>
  )> }
);

export type OnCounterUpdatedSubscriptionVariables = {};


export type OnCounterUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { counterUpdated?: Maybe<(
    { __typename?: 'Counter' }
    & Pick<Counter, 'amount'>
  )> }
);



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
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Counter: ResolverTypeWrapper<Counter>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  ClientCounter: ResolverTypeWrapper<ClientCounter>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Subscription: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  AnyObject: ResolverTypeWrapper<Scalars['AnyObject']>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Time: ResolverTypeWrapper<Scalars['Time']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  JSON: ResolverTypeWrapper<Scalars['JSON']>,
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>,
  FieldError: ResolverTypeWrapper<FieldError>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Counter: Counter,
  Int: Scalars['Int'],
  ClientCounter: ClientCounter,
  Mutation: {},
  Boolean: Scalars['Boolean'],
  Subscription: {},
  String: Scalars['String'],
  AnyObject: Scalars['AnyObject'],
  Date: Scalars['Date'],
  Time: Scalars['Time'],
  DateTime: Scalars['DateTime'],
  JSON: Scalars['JSON'],
  JSONObject: Scalars['JSONObject'],
  FieldError: FieldError,
  ID: Scalars['ID'],
};

export interface AnyObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AnyObject'], any> {
  name: 'AnyObject'
}

export type ClientCounterResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClientCounter'] = ResolversParentTypes['ClientCounter']> = {
  counter?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CounterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Counter'] = ResolversParentTypes['Counter']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type FieldErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['FieldError'] = ResolversParentTypes['FieldError']> = {
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addCounter?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType, RequireFields<MutationAddCounterArgs, never>>,
  addCounterState?: Resolver<Maybe<ResolversTypes['ClientCounter']>, ParentType, ContextType, RequireFields<MutationAddCounterStateArgs, 'amount'>>,
  addMoleculerCounter?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType, RequireFields<MutationAddMoleculerCounterArgs, never>>,
  dummy?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  syncCachedCounter?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  counter?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType>,
  counterCache?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType>,
  counterState?: Resolver<Maybe<ResolversTypes['ClientCounter']>, ParentType, ContextType>,
  dummy?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  moleculerCounter?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  counterUpdated?: SubscriptionResolver<Maybe<ResolversTypes['Counter']>, "counterUpdated", ParentType, ContextType>,
  dummy?: SubscriptionResolver<Maybe<ResolversTypes['Int']>, "dummy", ParentType, ContextType>,
  moleculerCounterUpdate?: SubscriptionResolver<Maybe<ResolversTypes['Counter']>, "moleculerCounterUpdate", ParentType, ContextType>,
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time'
}

export type Resolvers<ContextType = any> = {
  AnyObject?: GraphQLScalarType,
  ClientCounter?: ClientCounterResolvers<ContextType>,
  Counter?: CounterResolvers<ContextType>,
  Date?: GraphQLScalarType,
  DateTime?: GraphQLScalarType,
  FieldError?: FieldErrorResolvers<ContextType>,
  JSON?: GraphQLScalarType,
  JSONObject?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  Time?: GraphQLScalarType,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;


export const AddCounterStateDocument = gql`
    mutation addCounterState($amount: Int!) {
  addCounterState(amount: $amount) @client {
    counter
  }
}
    `;
export type AddCounterStateMutationResult = ApolloReactCommon.MutationResult<AddCounterStateMutation>;
export type AddCounterStateMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCounterStateMutation, AddCounterStateMutationVariables>;
export const AddCounterDocument = gql`
    mutation addCounter($amount: Int!) {
  addCounter(amount: $amount) {
    amount
  }
}
    `;
export type AddCounterMutationResult = ApolloReactCommon.MutationResult<AddCounterMutation>;
export type AddCounterMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCounterMutation, AddCounterMutationVariables>;
export const AddCounter_WsDocument = gql`
    mutation AddCounter_WS($amount: Int!) {
  addCounter(amount: $amount) {
    amount
  }
}
    `;
export type AddCounter_WsMutationResult = ApolloReactCommon.MutationResult<AddCounter_WsMutation>;
export type AddCounter_WsMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCounter_WsMutation, AddCounter_WsMutationVariables>;
export const SyncCachedCounterDocument = gql`
    mutation SyncCachedCounter {
  syncCachedCounter
}
    `;
export type SyncCachedCounterMutationResult = ApolloReactCommon.MutationResult<SyncCachedCounterMutation>;
export type SyncCachedCounterMutationOptions = ApolloReactCommon.BaseMutationOptions<SyncCachedCounterMutation, SyncCachedCounterMutationVariables>;
export const CounterCacheQueryDocument = gql`
    query counterCacheQuery {
  counterCache {
    amount
  }
}
    `;
export type CounterCacheQueryQueryResult = ApolloReactCommon.QueryResult<CounterCacheQueryQuery, CounterCacheQueryQueryVariables>;
export const CounterStateDocument = gql`
    query CounterState {
  counterState @client {
    counter
  }
}
    `;
export type CounterStateQueryResult = ApolloReactCommon.QueryResult<CounterStateQuery, CounterStateQueryVariables>;
export const CounterQueryDocument = gql`
    query counterQuery {
  counter {
    amount
  }
}
    `;
export type CounterQueryQueryResult = ApolloReactCommon.QueryResult<CounterQueryQuery, CounterQueryQueryVariables>;
export const OnCounterUpdatedDocument = gql`
    subscription onCounterUpdated {
  counterUpdated {
    amount
  }
}
    `;
export type OnCounterUpdatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnCounterUpdatedSubscription>;