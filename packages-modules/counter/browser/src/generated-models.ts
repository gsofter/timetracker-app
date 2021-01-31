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
  DateTime: any;
  Date: any;
  AnyObject: any;
  Time: any;
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
  addScheduleEvent?: Maybe<Scalars['Boolean']>;
  addTimelineEvent?: Maybe<Scalars['Boolean']>;
  createTimeRecord?: Maybe<Scalars['String']>;
  createTimesheet?: Maybe<Scalars['Boolean']>;
  dummy?: Maybe<Scalars['Int']>;
  removeScheduleEvent?: Maybe<Scalars['Boolean']>;
  removeTimeRecord?: Maybe<Scalars['Boolean']>;
  removeTimelineEvent?: Maybe<Scalars['Boolean']>;
  removeTimesheet?: Maybe<Scalars['Boolean']>;
  /**  sync cached counter with current value  */
  syncCachedCounter?: Maybe<Scalars['Boolean']>;
  updateScheduleEvent?: Maybe<Scalars['Boolean']>;
  updateTimeRecord?: Maybe<Scalars['Boolean']>;
  updateTimelineEvent?: Maybe<Scalars['Boolean']>;
  updateTimesheet?: Maybe<Scalars['Boolean']>;
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


export type MutationAddScheduleEventArgs = {
  request?: Maybe<ScheduleCreateRequest>;
};


export type MutationAddTimelineEventArgs = {
  request?: Maybe<TimelineCreateRequest>;
};


export type MutationCreateTimeRecordArgs = {
  request?: Maybe<TimeRecordRequest>;
};


export type MutationCreateTimesheetArgs = {
  request?: Maybe<TimesheetCreateRequest>;
};


export type MutationRemoveScheduleEventArgs = {
  eventId?: Maybe<Scalars['String']>;
};


export type MutationRemoveTimeRecordArgs = {
  recordId?: Maybe<Scalars['String']>;
};


export type MutationRemoveTimelineEventArgs = {
  eventId?: Maybe<Scalars['String']>;
};


export type MutationRemoveTimesheetArgs = {
  sheetId?: Maybe<Scalars['String']>;
};


export type MutationUpdateScheduleEventArgs = {
  eventId?: Maybe<Scalars['String']>;
  request?: Maybe<ScheduleCreateRequest>;
};


export type MutationUpdateTimeRecordArgs = {
  recordId?: Maybe<Scalars['String']>;
  request?: Maybe<TimeRecordRequest>;
};


export type MutationUpdateTimelineEventArgs = {
  eventId?: Maybe<Scalars['String']>;
  request?: Maybe<TimelineCreateRequest>;
};


export type MutationUpdateTimesheetArgs = {
  sheetId?: Maybe<Scalars['String']>;
  request?: Maybe<TimesheetCreateRequest>;
};

export type Query = {
   __typename?: 'Query';
  /**  Counter  */
  counter?: Maybe<Counter>;
  /**  Counter from Datasource  */
  counterCache?: Maybe<Counter>;
  counterState?: Maybe<ClientCounter>;
  dummy?: Maybe<Scalars['Int']>;
  getPlayingTimeRecord?: Maybe<TimeRecord>;
  getScheduleEvents?: Maybe<Array<Maybe<Schedule>>>;
  getTimeRecords?: Maybe<Array<Maybe<TimeRecord>>>;
  getTimelineEvents?: Maybe<Array<Maybe<Timeline>>>;
  getTimesheets?: Maybe<Array<Maybe<Timesheet>>>;
  /**  Moleculer Counter  */
  moleculerCounter?: Maybe<Counter>;
};


export type QueryGetScheduleEventsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetTimelineEventsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetTimesheetsArgs = {
  userId?: Maybe<Scalars['String']>;
};

export type Schedule = {
   __typename?: 'Schedule';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  allDay?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
  tooltip?: Maybe<Scalars['String']>;
  isBillable?: Maybe<Scalars['Boolean']>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  reason?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
};

export type ScheduleCreateRequest = {
  title?: Maybe<Scalars['String']>;
  allDay?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
  tooltip?: Maybe<Scalars['String']>;
  isBillable?: Maybe<Scalars['Boolean']>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  reason?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
};

export type Subscription = {
   __typename?: 'Subscription';
  /**  Subscription fired when anyone increases counter  */
  counterUpdated?: Maybe<Counter>;
  dummy?: Maybe<Scalars['Int']>;
  moleculerCounterUpdate?: Maybe<Counter>;
};


export type Timeline = {
   __typename?: 'Timeline';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  allDay?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
  tooltip?: Maybe<Scalars['String']>;
  isBillable?: Maybe<Scalars['Boolean']>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  reason?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
};

export type TimelineCreateRequest = {
  title?: Maybe<Scalars['String']>;
  allDay?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
  desc?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  resourceId?: Maybe<Scalars['String']>;
  tooltip?: Maybe<Scalars['String']>;
  isBillable?: Maybe<Scalars['Boolean']>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  reason?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
};

export type TimeRecord = {
   __typename?: 'TimeRecord';
  id?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  taskId?: Maybe<Scalars['String']>;
  taskName?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  isBillable?: Maybe<Scalars['Boolean']>;
  projectId?: Maybe<Scalars['String']>;
  clientId?: Maybe<Scalars['String']>;
};

export type TimeRecordRequest = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  taskName?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  isBillable?: Maybe<Scalars['Boolean']>;
  projectId?: Maybe<Scalars['String']>;
  clientId?: Maybe<Scalars['String']>;
};

export type Timesheet = {
   __typename?: 'Timesheet';
  id?: Maybe<Scalars['ID']>;
  dateRange?: Maybe<TimesheetDateRange>;
  state?: Maybe<TimesheetState>;
  submittedOn?: Maybe<Scalars['Date']>;
  approvedOn?: Maybe<Scalars['Date']>;
  updatedBy?: Maybe<Scalars['String']>;
  updatedOn?: Maybe<Scalars['Date']>;
};

export type TimesheetCreateRequest = {
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  state?: Maybe<TimesheetState>;
  submittedOn?: Maybe<Scalars['Date']>;
  approvedOn?: Maybe<Scalars['Date']>;
  updatedBy?: Maybe<Scalars['String']>;
  updatedOn?: Maybe<Scalars['Date']>;
};

export type TimesheetDateRange = {
   __typename?: 'TimesheetDateRange';
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
};

export enum TimesheetState {
  ApprovedPending = 'APPROVED_PENDING',
  Approved = 'APPROVED',
  ApprovedFinalized = 'APPROVED_FINALIZED',
  Denyed = 'DENYED',
  Submitted = 'SUBMITTED',
  DenyedFinalized = 'DENYED_FINALIZED'
}

export type TimeTracker = {
   __typename?: 'TimeTracker';
  userId?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['String']>;
  timeRecords?: Maybe<Array<Maybe<TimeRecord>>>;
  timesheets?: Maybe<Array<Maybe<Timesheet>>>;
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
  TimeRecord: ResolverTypeWrapper<TimeRecord>,
  String: ResolverTypeWrapper<Scalars['String']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Schedule: ResolverTypeWrapper<Schedule>,
  Timeline: ResolverTypeWrapper<Timeline>,
  Timesheet: ResolverTypeWrapper<Timesheet>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  TimesheetDateRange: ResolverTypeWrapper<TimesheetDateRange>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  TimesheetState: TimesheetState,
  Mutation: ResolverTypeWrapper<{}>,
  ScheduleCreateRequest: ScheduleCreateRequest,
  TimelineCreateRequest: TimelineCreateRequest,
  TimeRecordRequest: TimeRecordRequest,
  TimesheetCreateRequest: TimesheetCreateRequest,
  Subscription: ResolverTypeWrapper<{}>,
  AnyObject: ResolverTypeWrapper<Scalars['AnyObject']>,
  Time: ResolverTypeWrapper<Scalars['Time']>,
  JSON: ResolverTypeWrapper<Scalars['JSON']>,
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>,
  FieldError: ResolverTypeWrapper<FieldError>,
  TimeTracker: ResolverTypeWrapper<TimeTracker>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Counter: Counter,
  Int: Scalars['Int'],
  ClientCounter: ClientCounter,
  TimeRecord: TimeRecord,
  String: Scalars['String'],
  DateTime: Scalars['DateTime'],
  Boolean: Scalars['Boolean'],
  Schedule: Schedule,
  Timeline: Timeline,
  Timesheet: Timesheet,
  ID: Scalars['ID'],
  TimesheetDateRange: TimesheetDateRange,
  Date: Scalars['Date'],
  TimesheetState: TimesheetState,
  Mutation: {},
  ScheduleCreateRequest: ScheduleCreateRequest,
  TimelineCreateRequest: TimelineCreateRequest,
  TimeRecordRequest: TimeRecordRequest,
  TimesheetCreateRequest: TimesheetCreateRequest,
  Subscription: {},
  AnyObject: Scalars['AnyObject'],
  Time: Scalars['Time'],
  JSON: Scalars['JSON'],
  JSONObject: Scalars['JSONObject'],
  FieldError: FieldError,
  TimeTracker: TimeTracker,
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
  addScheduleEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddScheduleEventArgs, never>>,
  addTimelineEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddTimelineEventArgs, never>>,
  createTimeRecord?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateTimeRecordArgs, never>>,
  createTimesheet?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreateTimesheetArgs, never>>,
  dummy?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  removeScheduleEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveScheduleEventArgs, never>>,
  removeTimeRecord?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveTimeRecordArgs, never>>,
  removeTimelineEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveTimelineEventArgs, never>>,
  removeTimesheet?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveTimesheetArgs, never>>,
  syncCachedCounter?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  updateScheduleEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateScheduleEventArgs, never>>,
  updateTimeRecord?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateTimeRecordArgs, never>>,
  updateTimelineEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateTimelineEventArgs, never>>,
  updateTimesheet?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateTimesheetArgs, never>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  counter?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType>,
  counterCache?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType>,
  counterState?: Resolver<Maybe<ResolversTypes['ClientCounter']>, ParentType, ContextType>,
  dummy?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  getPlayingTimeRecord?: Resolver<Maybe<ResolversTypes['TimeRecord']>, ParentType, ContextType>,
  getScheduleEvents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Schedule']>>>, ParentType, ContextType, RequireFields<QueryGetScheduleEventsArgs, never>>,
  getTimeRecords?: Resolver<Maybe<Array<Maybe<ResolversTypes['TimeRecord']>>>, ParentType, ContextType>,
  getTimelineEvents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Timeline']>>>, ParentType, ContextType, RequireFields<QueryGetTimelineEventsArgs, never>>,
  getTimesheets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Timesheet']>>>, ParentType, ContextType, RequireFields<QueryGetTimesheetsArgs, never>>,
  moleculerCounter?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType>,
};

export type ScheduleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Schedule'] = ResolversParentTypes['Schedule']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  allDay?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  start?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  end?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  desc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  resourceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tooltip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  isBillable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  approvedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  counterUpdated?: SubscriptionResolver<Maybe<ResolversTypes['Counter']>, "counterUpdated", ParentType, ContextType>,
  dummy?: SubscriptionResolver<Maybe<ResolversTypes['Int']>, "dummy", ParentType, ContextType>,
  moleculerCounterUpdate?: SubscriptionResolver<Maybe<ResolversTypes['Counter']>, "moleculerCounterUpdate", ParentType, ContextType>,
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time'
}

export type TimelineResolvers<ContextType = any, ParentType extends ResolversParentTypes['Timeline'] = ResolversParentTypes['Timeline']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  allDay?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  start?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  end?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  desc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  resourceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tooltip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  isBillable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  approvedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TimeRecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimeRecord'] = ResolversParentTypes['TimeRecord']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  startTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  endTime?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  taskId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  taskName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  isBillable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  projectId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  clientId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TimesheetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Timesheet'] = ResolversParentTypes['Timesheet']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  dateRange?: Resolver<Maybe<ResolversTypes['TimesheetDateRange']>, ParentType, ContextType>,
  state?: Resolver<Maybe<ResolversTypes['TimesheetState']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  approvedOn?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedOn?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TimesheetDateRangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimesheetDateRange'] = ResolversParentTypes['TimesheetDateRange']> = {
  startDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  endDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TimeTrackerResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimeTracker'] = ResolversParentTypes['TimeTracker']> = {
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  orgId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  timeRecords?: Resolver<Maybe<Array<Maybe<ResolversTypes['TimeRecord']>>>, ParentType, ContextType>,
  timesheets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Timesheet']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

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
  Schedule?: ScheduleResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  Time?: GraphQLScalarType,
  Timeline?: TimelineResolvers<ContextType>,
  TimeRecord?: TimeRecordResolvers<ContextType>,
  Timesheet?: TimesheetResolvers<ContextType>,
  TimesheetDateRange?: TimesheetDateRangeResolvers<ContextType>,
  TimeTracker?: TimeTrackerResolvers<ContextType>,
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