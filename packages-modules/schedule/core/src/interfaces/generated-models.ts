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
  DateTime: any;
  AnyObject: any;
  Date: any;
  Time: any;
  JSON: any;
  JSONObject: any;
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
  addScheduleEvent?: Maybe<Scalars['Boolean']>;
  addTimelineEvent?: Maybe<Scalars['Boolean']>;
  addTimesheetEvent?: Maybe<Scalars['Boolean']>;
  dummy?: Maybe<Scalars['Int']>;
  removeScheduleEvent?: Maybe<Scalars['Boolean']>;
  removeTimelineEvent?: Maybe<Scalars['Boolean']>;
  removeTimesheetEvent?: Maybe<Scalars['Boolean']>;
  /**  sync cached counter with current value  */
  syncCachedCounter?: Maybe<Scalars['Boolean']>;
  updateScheduleEvent?: Maybe<Scalars['Boolean']>;
  updateTimelineEvent?: Maybe<Scalars['Boolean']>;
  updateTimesheetEvent?: Maybe<Scalars['Boolean']>;
};


export type IMutationaddCounterArgs = {
  amount?: Maybe<Scalars['Int']>;
};


export type IMutationaddMoleculerCounterArgs = {
  amount?: Maybe<Scalars['Int']>;
};


export type IMutationaddScheduleEventArgs = {
  request?: Maybe<IScheduleCreateRequest>;
};


export type IMutationaddTimelineEventArgs = {
  request?: Maybe<ITimelineCreateRequest>;
};


export type IMutationaddTimesheetEventArgs = {
  request?: Maybe<ITimesheetCreateRequest>;
};


export type IMutationremoveScheduleEventArgs = {
  eventId?: Maybe<Scalars['String']>;
};


export type IMutationremoveTimelineEventArgs = {
  eventId?: Maybe<Scalars['String']>;
};


export type IMutationremoveTimesheetEventArgs = {
  eventId?: Maybe<Scalars['String']>;
};


export type IMutationupdateScheduleEventArgs = {
  eventId?: Maybe<Scalars['String']>;
  request?: Maybe<IScheduleCreateRequest>;
};


export type IMutationupdateTimelineEventArgs = {
  eventId?: Maybe<Scalars['String']>;
  request?: Maybe<ITimelineCreateRequest>;
};


export type IMutationupdateTimesheetEventArgs = {
  eventId?: Maybe<Scalars['String']>;
  request?: Maybe<ITimesheetCreateRequest>;
};

export type IQuery = {
   __typename?: 'Query';
  /**  Counter  */
  counter?: Maybe<ICounter>;
  /**  Counter from Datasource  */
  counterCache?: Maybe<ICounter>;
  dummy?: Maybe<Scalars['Int']>;
  getScheduleEvents?: Maybe<Array<Maybe<ISchedule>>>;
  getTimelineEvents?: Maybe<Array<Maybe<ITimeline>>>;
  getTimesheetEvents?: Maybe<Array<Maybe<ITimesheet>>>;
  /**  Moleculer Counter  */
  moleculerCounter?: Maybe<ICounter>;
};


export type IQuerygetScheduleEventsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type IQuerygetTimelineEventsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type IQuerygetTimesheetEventsArgs = {
  userId?: Maybe<Scalars['String']>;
};

export type ISchedule = {
   __typename?: 'Schedule';
  allDay?: Maybe<Scalars['Boolean']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  isBillable?: Maybe<Scalars['Boolean']>;
  note?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  tooltip?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type IScheduleCreateRequest = {
  allDay?: Maybe<Scalars['Boolean']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['DateTime']>;
  isBillable?: Maybe<Scalars['Boolean']>;
  note?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  tooltip?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type ISubscription = {
   __typename?: 'Subscription';
  /**  Subscription fired when anyone increases counter  */
  counterUpdated?: Maybe<ICounter>;
  dummy?: Maybe<Scalars['Int']>;
  moleculerCounterUpdate?: Maybe<ICounter>;
};


export type ITimeline = {
   __typename?: 'Timeline';
  allDay?: Maybe<Scalars['Boolean']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  isBillable?: Maybe<Scalars['Boolean']>;
  note?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  tooltip?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type ITimelineCreateRequest = {
  allDay?: Maybe<Scalars['Boolean']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['DateTime']>;
  isBillable?: Maybe<Scalars['Boolean']>;
  note?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  tooltip?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type ITimesheet = {
   __typename?: 'Timesheet';
  allDay?: Maybe<Scalars['Boolean']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  isBillable?: Maybe<Scalars['Boolean']>;
  note?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  tooltip?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type ITimesheetCreateRequest = {
  allDay?: Maybe<Scalars['Boolean']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['DateTime']>;
  isBillable?: Maybe<Scalars['Boolean']>;
  note?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['DateTime']>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  tooltip?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type IAddScheduleEventMutationVariables = {
  request?: Maybe<IScheduleCreateRequest>;
};


export type IAddScheduleEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'addScheduleEvent'>
);

export type IAddTimelineEventMutationVariables = {
  request?: Maybe<ITimelineCreateRequest>;
};


export type IAddTimelineEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'addTimelineEvent'>
);

export type IAddTimesheetEventMutationVariables = {
  request?: Maybe<ITimesheetCreateRequest>;
};


export type IAddTimesheetEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'addTimesheetEvent'>
);

export type IRemoveScheduleEventMutationVariables = {
  eventId?: Maybe<Scalars['String']>;
};


export type IRemoveScheduleEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'removeScheduleEvent'>
);

export type IRemoveTimelineEventMutationVariables = {
  eventId?: Maybe<Scalars['String']>;
};


export type IRemoveTimelineEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'removeTimelineEvent'>
);

export type IRemoveTimesheetEventMutationVariables = {
  eventId?: Maybe<Scalars['String']>;
};


export type IRemoveTimesheetEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'removeTimesheetEvent'>
);

export type IUpdateScheduleEventMutationVariables = {
  eventId?: Maybe<Scalars['String']>;
  request?: Maybe<IScheduleCreateRequest>;
};


export type IUpdateScheduleEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'updateScheduleEvent'>
);

export type IUpdateTimelineEventMutationVariables = {
  eventId?: Maybe<Scalars['String']>;
  request?: Maybe<ITimelineCreateRequest>;
};


export type IUpdateTimelineEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'updateTimelineEvent'>
);

export type IUpdateTimesheetEventMutationVariables = {
  eventId?: Maybe<Scalars['String']>;
  request?: Maybe<ITimesheetCreateRequest>;
};


export type IUpdateTimesheetEventMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'updateTimesheetEvent'>
);

export type IGetScheduleEventsQueryVariables = {
  userId?: Maybe<Scalars['String']>;
};


export type IGetScheduleEventsQuery = (
  { __typename?: 'Query' }
  & { getScheduleEvents?: Maybe<Array<Maybe<(
    { __typename?: 'Schedule' }
    & Pick<ISchedule, 'id' | 'title' | 'allDay' | 'start' | 'end' | 'desc' | 'userId' | 'resourceId' | 'tooltip'>
  )>>> }
);

export type IGetTimelineEventsQueryVariables = {
  userId?: Maybe<Scalars['String']>;
};


export type IGetTimelineEventsQuery = (
  { __typename?: 'Query' }
  & { getTimelineEvents?: Maybe<Array<Maybe<(
    { __typename?: 'Timeline' }
    & Pick<ITimeline, 'id' | 'title' | 'allDay' | 'start' | 'end' | 'desc' | 'userId' | 'resourceId' | 'tooltip'>
  )>>> }
);

export type IGetTimesheetEventsQueryVariables = {
  userId?: Maybe<Scalars['String']>;
};


export type IGetTimesheetEventsQuery = (
  { __typename?: 'Query' }
  & { getTimesheetEvents?: Maybe<Array<Maybe<(
    { __typename?: 'Timesheet' }
    & Pick<ITimesheet, 'id' | 'title' | 'allDay' | 'start' | 'end' | 'userId' | 'projectId' | 'reason' | 'note' | 'tooltip'>
  )>>> }
);


export const AddScheduleEventDocument = gql`
    mutation AddScheduleEvent($request: ScheduleCreateRequest) {
  addScheduleEvent(request: $request)
}
    `;
export type AddScheduleEventMutationResult = ApolloReactCommon.MutationResult<IAddScheduleEventMutation>;
export type AddScheduleEventMutationOptions = ApolloReactCommon.BaseMutationOptions<IAddScheduleEventMutation, IAddScheduleEventMutationVariables>;
export const AddTimelineEventDocument = gql`
    mutation AddTimelineEvent($request: TimelineCreateRequest) {
  addTimelineEvent(request: $request)
}
    `;
export type AddTimelineEventMutationResult = ApolloReactCommon.MutationResult<IAddTimelineEventMutation>;
export type AddTimelineEventMutationOptions = ApolloReactCommon.BaseMutationOptions<IAddTimelineEventMutation, IAddTimelineEventMutationVariables>;
export const AddTimesheetEventDocument = gql`
    mutation AddTimesheetEvent($request: TimesheetCreateRequest) {
  addTimesheetEvent(request: $request)
}
    `;
export type AddTimesheetEventMutationResult = ApolloReactCommon.MutationResult<IAddTimesheetEventMutation>;
export type AddTimesheetEventMutationOptions = ApolloReactCommon.BaseMutationOptions<IAddTimesheetEventMutation, IAddTimesheetEventMutationVariables>;
export const RemoveScheduleEventDocument = gql`
    mutation RemoveScheduleEvent($eventId: String) {
  removeScheduleEvent(eventId: $eventId)
}
    `;
export type RemoveScheduleEventMutationResult = ApolloReactCommon.MutationResult<IRemoveScheduleEventMutation>;
export type RemoveScheduleEventMutationOptions = ApolloReactCommon.BaseMutationOptions<IRemoveScheduleEventMutation, IRemoveScheduleEventMutationVariables>;
export const RemoveTimelineEventDocument = gql`
    mutation RemoveTimelineEvent($eventId: String) {
  removeTimelineEvent(eventId: $eventId)
}
    `;
export type RemoveTimelineEventMutationResult = ApolloReactCommon.MutationResult<IRemoveTimelineEventMutation>;
export type RemoveTimelineEventMutationOptions = ApolloReactCommon.BaseMutationOptions<IRemoveTimelineEventMutation, IRemoveTimelineEventMutationVariables>;
export const RemoveTimesheetEventDocument = gql`
    mutation RemoveTimesheetEvent($eventId: String) {
  removeTimesheetEvent(eventId: $eventId)
}
    `;
export type RemoveTimesheetEventMutationResult = ApolloReactCommon.MutationResult<IRemoveTimesheetEventMutation>;
export type RemoveTimesheetEventMutationOptions = ApolloReactCommon.BaseMutationOptions<IRemoveTimesheetEventMutation, IRemoveTimesheetEventMutationVariables>;
export const UpdateScheduleEventDocument = gql`
    mutation UpdateScheduleEvent($eventId: String, $request: ScheduleCreateRequest) {
  updateScheduleEvent(eventId: $eventId, request: $request)
}
    `;
export type UpdateScheduleEventMutationResult = ApolloReactCommon.MutationResult<IUpdateScheduleEventMutation>;
export type UpdateScheduleEventMutationOptions = ApolloReactCommon.BaseMutationOptions<IUpdateScheduleEventMutation, IUpdateScheduleEventMutationVariables>;
export const UpdateTimelineEventDocument = gql`
    mutation UpdateTimelineEvent($eventId: String, $request: TimelineCreateRequest) {
  updateTimelineEvent(eventId: $eventId, request: $request)
}
    `;
export type UpdateTimelineEventMutationResult = ApolloReactCommon.MutationResult<IUpdateTimelineEventMutation>;
export type UpdateTimelineEventMutationOptions = ApolloReactCommon.BaseMutationOptions<IUpdateTimelineEventMutation, IUpdateTimelineEventMutationVariables>;
export const UpdateTimesheetEventDocument = gql`
    mutation UpdateTimesheetEvent($eventId: String, $request: TimesheetCreateRequest) {
  updateTimesheetEvent(eventId: $eventId, request: $request)
}
    `;
export type UpdateTimesheetEventMutationResult = ApolloReactCommon.MutationResult<IUpdateTimesheetEventMutation>;
export type UpdateTimesheetEventMutationOptions = ApolloReactCommon.BaseMutationOptions<IUpdateTimesheetEventMutation, IUpdateTimesheetEventMutationVariables>;
export const GetScheduleEventsDocument = gql`
    query GetScheduleEvents($userId: String) {
  getScheduleEvents(userId: $userId) {
    id
    title
    allDay
    start
    end
    desc
    userId
    resourceId
    tooltip
  }
}
    `;
export type GetScheduleEventsQueryResult = ApolloReactCommon.QueryResult<IGetScheduleEventsQuery, IGetScheduleEventsQueryVariables>;
export const GetTimelineEventsDocument = gql`
    query GetTimelineEvents($userId: String) {
  getTimelineEvents(userId: $userId) {
    id
    title
    allDay
    start
    end
    desc
    userId
    resourceId
    tooltip
  }
}
    `;
export type GetTimelineEventsQueryResult = ApolloReactCommon.QueryResult<IGetTimelineEventsQuery, IGetTimelineEventsQueryVariables>;
export const GetTimesheetEventsDocument = gql`
    query GetTimesheetEvents($userId: String) {
  getTimesheetEvents(userId: $userId) {
    id
    title
    allDay
    start
    end
    userId
    projectId
    reason
    note
    tooltip
  }
}
    `;
export type GetTimesheetEventsQueryResult = ApolloReactCommon.QueryResult<IGetTimesheetEventsQuery, IGetTimesheetEventsQueryVariables>;


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
  Schedule: ResolverTypeWrapper<ISchedule>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  Timeline: ResolverTypeWrapper<ITimeline>,
  Timesheet: ResolverTypeWrapper<ITimesheet>,
  Mutation: ResolverTypeWrapper<{}>,
  ScheduleCreateRequest: IScheduleCreateRequest,
  TimelineCreateRequest: ITimelineCreateRequest,
  TimesheetCreateRequest: ITimesheetCreateRequest,
  Subscription: ResolverTypeWrapper<{}>,
  AnyObject: ResolverTypeWrapper<Scalars['AnyObject']>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Time: ResolverTypeWrapper<Scalars['Time']>,
  JSON: ResolverTypeWrapper<Scalars['JSON']>,
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>,
  FieldError: ResolverTypeWrapper<IFieldError>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {},
  Counter: ICounter,
  Int: Scalars['Int'],
  String: Scalars['String'],
  Schedule: ISchedule,
  Boolean: Scalars['Boolean'],
  DateTime: Scalars['DateTime'],
  Timeline: ITimeline,
  Timesheet: ITimesheet,
  Mutation: {},
  ScheduleCreateRequest: IScheduleCreateRequest,
  TimelineCreateRequest: ITimelineCreateRequest,
  TimesheetCreateRequest: ITimesheetCreateRequest,
  Subscription: {},
  AnyObject: Scalars['AnyObject'],
  Date: Scalars['Date'],
  Time: Scalars['Time'],
  JSON: Scalars['JSON'],
  JSONObject: Scalars['JSONObject'],
  FieldError: IFieldError,
  ID: Scalars['ID'],
};

export interface IAnyObjectScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['AnyObject'], any> {
  name: 'AnyObject'
}

export type ICounterResolvers<ContextType = any, ParentType extends IResolversParentTypes['Counter'] = IResolversParentTypes['Counter']> = {
  amount?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface IDateScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['Date'], any> {
  name: 'Date'
}

export interface IDateTimeScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type IFieldErrorResolvers<ContextType = any, ParentType extends IResolversParentTypes['FieldError'] = IResolversParentTypes['FieldError']> = {
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

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  addCounter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType, RequireFields<IMutationaddCounterArgs, never>>,
  addMoleculerCounter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType, RequireFields<IMutationaddMoleculerCounterArgs, never>>,
  addScheduleEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationaddScheduleEventArgs, never>>,
  addTimelineEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationaddTimelineEventArgs, never>>,
  addTimesheetEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationaddTimesheetEventArgs, never>>,
  dummy?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  removeScheduleEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveScheduleEventArgs, never>>,
  removeTimelineEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveTimelineEventArgs, never>>,
  removeTimesheetEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveTimesheetEventArgs, never>>,
  syncCachedCounter?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  updateScheduleEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateScheduleEventArgs, never>>,
  updateTimelineEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateTimelineEventArgs, never>>,
  updateTimesheetEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateTimesheetEventArgs, never>>,
};

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  counter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
  counterCache?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
  dummy?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  getScheduleEvents?: Resolver<Maybe<Array<Maybe<IResolversTypes['Schedule']>>>, ParentType, ContextType, RequireFields<IQuerygetScheduleEventsArgs, never>>,
  getTimelineEvents?: Resolver<Maybe<Array<Maybe<IResolversTypes['Timeline']>>>, ParentType, ContextType, RequireFields<IQuerygetTimelineEventsArgs, never>>,
  getTimesheetEvents?: Resolver<Maybe<Array<Maybe<IResolversTypes['Timesheet']>>>, ParentType, ContextType, RequireFields<IQuerygetTimesheetEventsArgs, never>>,
  moleculerCounter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
};

export type IScheduleResolvers<ContextType = any, ParentType extends IResolversParentTypes['Schedule'] = IResolversParentTypes['Schedule']> = {
  allDay?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  approvedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  desc?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  end?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  isBillable?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  note?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  reason?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  resourceId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  start?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  title?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  tooltip?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ISubscriptionResolvers<ContextType = any, ParentType extends IResolversParentTypes['Subscription'] = IResolversParentTypes['Subscription']> = {
  counterUpdated?: SubscriptionResolver<Maybe<IResolversTypes['Counter']>, "counterUpdated", ParentType, ContextType>,
  dummy?: SubscriptionResolver<Maybe<IResolversTypes['Int']>, "dummy", ParentType, ContextType>,
  moleculerCounterUpdate?: SubscriptionResolver<Maybe<IResolversTypes['Counter']>, "moleculerCounterUpdate", ParentType, ContextType>,
};

export interface ITimeScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['Time'], any> {
  name: 'Time'
}

export type ITimelineResolvers<ContextType = any, ParentType extends IResolversParentTypes['Timeline'] = IResolversParentTypes['Timeline']> = {
  allDay?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  approvedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  desc?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  end?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  isBillable?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  note?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  reason?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  resourceId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  start?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  title?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  tooltip?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ITimesheetResolvers<ContextType = any, ParentType extends IResolversParentTypes['Timesheet'] = IResolversParentTypes['Timesheet']> = {
  allDay?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  approvedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  desc?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  end?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  isBillable?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  note?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  projectId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  reason?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  resourceId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  start?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  title?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  tooltip?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IResolvers<ContextType = any> = {
  AnyObject?: GraphQLScalarType,
  Counter?: ICounterResolvers<ContextType>,
  Date?: GraphQLScalarType,
  DateTime?: GraphQLScalarType,
  FieldError?: IFieldErrorResolvers<ContextType>,
  JSON?: GraphQLScalarType,
  JSONObject?: GraphQLScalarType,
  Mutation?: IMutationResolvers<ContextType>,
  Query?: IQueryResolvers<ContextType>,
  Schedule?: IScheduleResolvers<ContextType>,
  Subscription?: ISubscriptionResolvers<ContextType>,
  Time?: GraphQLScalarType,
  Timeline?: ITimelineResolvers<ContextType>,
  Timesheet?: ITimesheetResolvers<ContextType>,
};


