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



export type IMember = {
   __typename?: 'Member';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type IMutation = {
   __typename?: 'Mutation';
  /**  Increase counter value returns current counter amount  */
  addCounter?: Maybe<ICounter>;
  /**  add Counter  */
  addMoleculerCounter?: Maybe<ICounter>;
  addScheduleEvent?: Maybe<Scalars['Boolean']>;
  addTimelineEvent?: Maybe<Scalars['Boolean']>;
  createTimeRecord?: Maybe<Scalars['String']>;
  createTimesheet?: Maybe<Scalars['Boolean']>;
  dummy?: Maybe<Scalars['Int']>;
  removeDurationTimeRecords?: Maybe<Scalars['Boolean']>;
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
  updateTimesheetStatus?: Maybe<Scalars['Boolean']>;
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


export type IMutationcreateTimeRecordArgs = {
  request?: Maybe<ITimeRecordRequest>;
};


export type IMutationcreateTimesheetArgs = {
  request?: Maybe<ITimesheetCreateRequest>;
};


export type IMutationremoveDurationTimeRecordsArgs = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  projectId?: Maybe<Scalars['String']>;
};


export type IMutationremoveScheduleEventArgs = {
  eventId?: Maybe<Scalars['String']>;
};


export type IMutationremoveTimeRecordArgs = {
  recordId?: Maybe<Scalars['String']>;
};


export type IMutationremoveTimelineEventArgs = {
  eventId?: Maybe<Scalars['String']>;
};


export type IMutationremoveTimesheetArgs = {
  sheetId?: Maybe<Scalars['String']>;
};


export type IMutationupdateScheduleEventArgs = {
  eventId?: Maybe<Scalars['String']>;
  request?: Maybe<IScheduleCreateRequest>;
};


export type IMutationupdateTimeRecordArgs = {
  recordId?: Maybe<Scalars['String']>;
  request?: Maybe<ITimeRecordRequest>;
};


export type IMutationupdateTimelineEventArgs = {
  eventId?: Maybe<Scalars['String']>;
  request?: Maybe<ITimelineCreateRequest>;
};


export type IMutationupdateTimesheetArgs = {
  sheetId?: Maybe<Scalars['String']>;
  request?: Maybe<ITimesheetCreateRequest>;
};


export type IMutationupdateTimesheetStatusArgs = {
  request?: Maybe<ITimesheetCreateRequest>;
};

export type IProject = {
   __typename?: 'Project';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  clientId?: Maybe<Array<Maybe<Scalars['String']>>>;
  orgName?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Maybe<Scalars['String']>>>;
  tasks?: Maybe<Array<Maybe<ITask>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type IQuery = {
   __typename?: 'Query';
  /**  Counter  */
  counter?: Maybe<ICounter>;
  /**  Counter from Datasource  */
  counterCache?: Maybe<ICounter>;
  dummy?: Maybe<Scalars['Int']>;
  getDurationTimeRecords?: Maybe<Array<Maybe<ITimeRecord>>>;
  getMembers?: Maybe<Array<Maybe<IMember>>>;
  getPlayingTimeRecord?: Maybe<ITimeRecord>;
  getProjects?: Maybe<Array<Maybe<IProject>>>;
  getScheduleEvents?: Maybe<Array<Maybe<ISchedule>>>;
  getTags?: Maybe<Array<Maybe<ITag>>>;
  getTimeRecords?: Maybe<Array<Maybe<ITimeRecord>>>;
  getTimelineEvents?: Maybe<Array<Maybe<ITimeline>>>;
  getTimesheets?: Maybe<Array<Maybe<ITimesheet>>>;
  /**  Moleculer Counter  */
  moleculerCounter?: Maybe<ICounter>;
};


export type IQuerygetDurationTimeRecordsArgs = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
};


export type IQuerygetScheduleEventsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type IQuerygetTimelineEventsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type IQuerygetTimesheetsArgs = {
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

export type ITag = {
   __typename?: 'Tag';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type ITask = {
   __typename?: 'Task';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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

export type ITimeRecord = {
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

export type ITimeRecordRequest = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  taskName?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  isBillable?: Maybe<Scalars['Boolean']>;
  projectId?: Maybe<Scalars['String']>;
  clientId?: Maybe<Scalars['String']>;
};

export type ITimesheet = {
   __typename?: 'Timesheet';
  id?: Maybe<Scalars['ID']>;
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  state?: Maybe<ITimesheetState>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
  updatedOn?: Maybe<Scalars['DateTime']>;
};

export type ITimesheetCreateRequest = {
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  state?: Maybe<ITimesheetState>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
  updatedOn?: Maybe<Scalars['DateTime']>;
};

export const enum ITimesheetState {
  APPROVED_PENDING = 'APPROVED_PENDING',
  APPROVED = 'APPROVED',
  APPROVED_FINALIZED = 'APPROVED_FINALIZED',
  DENYED = 'DENYED',
  SUBMITTED = 'SUBMITTED',
  DENYED_FINALIZED = 'DENYED_FINALIZED'
};

export type ITimeTracker = {
   __typename?: 'TimeTracker';
  userId?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['String']>;
  timeRecords?: Maybe<Array<Maybe<ITimeRecord>>>;
  timesheets?: Maybe<Array<Maybe<ITimesheet>>>;
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
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  TimeRecord: ResolverTypeWrapper<ITimeRecord>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Member: ResolverTypeWrapper<IMember>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Project: ResolverTypeWrapper<IProject>,
  Task: ResolverTypeWrapper<ITask>,
  Schedule: ResolverTypeWrapper<ISchedule>,
  Tag: ResolverTypeWrapper<ITag>,
  Timeline: ResolverTypeWrapper<ITimeline>,
  Timesheet: ResolverTypeWrapper<ITimesheet>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  TimesheetState: ITimesheetState,
  Mutation: ResolverTypeWrapper<{}>,
  ScheduleCreateRequest: IScheduleCreateRequest,
  TimelineCreateRequest: ITimelineCreateRequest,
  TimeRecordRequest: ITimeRecordRequest,
  TimesheetCreateRequest: ITimesheetCreateRequest,
  Subscription: ResolverTypeWrapper<{}>,
  AnyObject: ResolverTypeWrapper<Scalars['AnyObject']>,
  Time: ResolverTypeWrapper<Scalars['Time']>,
  JSON: ResolverTypeWrapper<Scalars['JSON']>,
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>,
  FieldError: ResolverTypeWrapper<IFieldError>,
  TimeTracker: ResolverTypeWrapper<ITimeTracker>,
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {},
  Counter: ICounter,
  Int: Scalars['Int'],
  DateTime: Scalars['DateTime'],
  TimeRecord: ITimeRecord,
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Member: IMember,
  ID: Scalars['ID'],
  Project: IProject,
  Task: ITask,
  Schedule: ISchedule,
  Tag: ITag,
  Timeline: ITimeline,
  Timesheet: ITimesheet,
  Date: Scalars['Date'],
  TimesheetState: ITimesheetState,
  Mutation: {},
  ScheduleCreateRequest: IScheduleCreateRequest,
  TimelineCreateRequest: ITimelineCreateRequest,
  TimeRecordRequest: ITimeRecordRequest,
  TimesheetCreateRequest: ITimesheetCreateRequest,
  Subscription: {},
  AnyObject: Scalars['AnyObject'],
  Time: Scalars['Time'],
  JSON: Scalars['JSON'],
  JSONObject: Scalars['JSONObject'],
  FieldError: IFieldError,
  TimeTracker: ITimeTracker,
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

export type IMemberResolvers<ContextType = any, ParentType extends IResolversParentTypes['Member'] = IResolversParentTypes['Member']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  addCounter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType, RequireFields<IMutationaddCounterArgs, never>>,
  addMoleculerCounter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType, RequireFields<IMutationaddMoleculerCounterArgs, never>>,
  addScheduleEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationaddScheduleEventArgs, never>>,
  addTimelineEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationaddTimelineEventArgs, never>>,
  createTimeRecord?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType, RequireFields<IMutationcreateTimeRecordArgs, never>>,
  createTimesheet?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationcreateTimesheetArgs, never>>,
  dummy?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  removeDurationTimeRecords?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveDurationTimeRecordsArgs, never>>,
  removeScheduleEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveScheduleEventArgs, never>>,
  removeTimeRecord?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveTimeRecordArgs, never>>,
  removeTimelineEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveTimelineEventArgs, never>>,
  removeTimesheet?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveTimesheetArgs, never>>,
  syncCachedCounter?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  updateScheduleEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateScheduleEventArgs, never>>,
  updateTimeRecord?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateTimeRecordArgs, never>>,
  updateTimelineEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateTimelineEventArgs, never>>,
  updateTimesheet?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateTimesheetArgs, never>>,
  updateTimesheetStatus?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateTimesheetStatusArgs, never>>,
};

export type IProjectResolvers<ContextType = any, ParentType extends IResolversParentTypes['Project'] = IResolversParentTypes['Project']> = {
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  clientId?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  teams?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  tasks?: Resolver<Maybe<Array<Maybe<IResolversTypes['Task']>>>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  counter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
  counterCache?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
  dummy?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  getDurationTimeRecords?: Resolver<Maybe<Array<Maybe<IResolversTypes['TimeRecord']>>>, ParentType, ContextType, RequireFields<IQuerygetDurationTimeRecordsArgs, never>>,
  getMembers?: Resolver<Maybe<Array<Maybe<IResolversTypes['Member']>>>, ParentType, ContextType>,
  getPlayingTimeRecord?: Resolver<Maybe<IResolversTypes['TimeRecord']>, ParentType, ContextType>,
  getProjects?: Resolver<Maybe<Array<Maybe<IResolversTypes['Project']>>>, ParentType, ContextType>,
  getScheduleEvents?: Resolver<Maybe<Array<Maybe<IResolversTypes['Schedule']>>>, ParentType, ContextType, RequireFields<IQuerygetScheduleEventsArgs, never>>,
  getTags?: Resolver<Maybe<Array<Maybe<IResolversTypes['Tag']>>>, ParentType, ContextType>,
  getTimeRecords?: Resolver<Maybe<Array<Maybe<IResolversTypes['TimeRecord']>>>, ParentType, ContextType>,
  getTimelineEvents?: Resolver<Maybe<Array<Maybe<IResolversTypes['Timeline']>>>, ParentType, ContextType, RequireFields<IQuerygetTimelineEventsArgs, never>>,
  getTimesheets?: Resolver<Maybe<Array<Maybe<IResolversTypes['Timesheet']>>>, ParentType, ContextType, RequireFields<IQuerygetTimesheetsArgs, never>>,
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

export type ITagResolvers<ContextType = any, ParentType extends IResolversParentTypes['Tag'] = IResolversParentTypes['Tag']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ITaskResolvers<ContextType = any, ParentType extends IResolversParentTypes['Task'] = IResolversParentTypes['Task']> = {
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
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

export type ITimeRecordResolvers<ContextType = any, ParentType extends IResolversParentTypes['TimeRecord'] = IResolversParentTypes['TimeRecord']> = {
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  startTime?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  endTime?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  taskId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  taskName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  tags?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  isBillable?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  projectId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  clientId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ITimesheetResolvers<ContextType = any, ParentType extends IResolversParentTypes['Timesheet'] = IResolversParentTypes['Timesheet']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  startDate?: Resolver<Maybe<IResolversTypes['Date']>, ParentType, ContextType>,
  endDate?: Resolver<Maybe<IResolversTypes['Date']>, ParentType, ContextType>,
  state?: Resolver<Maybe<IResolversTypes['TimesheetState']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  approvedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  updatedBy?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  updatedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ITimeTrackerResolvers<ContextType = any, ParentType extends IResolversParentTypes['TimeTracker'] = IResolversParentTypes['TimeTracker']> = {
  userId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  orgId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  timeRecords?: Resolver<Maybe<Array<Maybe<IResolversTypes['TimeRecord']>>>, ParentType, ContextType>,
  timesheets?: Resolver<Maybe<Array<Maybe<IResolversTypes['Timesheet']>>>, ParentType, ContextType>,
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
  Member?: IMemberResolvers<ContextType>,
  Mutation?: IMutationResolvers<ContextType>,
  Project?: IProjectResolvers<ContextType>,
  Query?: IQueryResolvers<ContextType>,
  Schedule?: IScheduleResolvers<ContextType>,
  Subscription?: ISubscriptionResolvers<ContextType>,
  Tag?: ITagResolvers<ContextType>,
  Task?: ITaskResolvers<ContextType>,
  Time?: GraphQLScalarType,
  Timeline?: ITimelineResolvers<ContextType>,
  TimeRecord?: ITimeRecordResolvers<ContextType>,
  Timesheet?: ITimesheetResolvers<ContextType>,
  TimeTracker?: ITimeTrackerResolvers<ContextType>,
};


