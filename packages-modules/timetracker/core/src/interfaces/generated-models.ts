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
  endTime?: Maybe<Scalars['DateTime']>;
  projectId?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
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
  request?: Maybe<ITimesheetCreateRequest>;
  sheetId?: Maybe<Scalars['String']>;
};


export type IMutationupdateTimesheetStatusArgs = {
  request?: Maybe<ITimesheetCreateRequest>;
};

export type IProject = {
   __typename?: 'Project';
  clientId?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  tasks?: Maybe<Array<Maybe<ITask>>>;
  teams?: Maybe<Array<Maybe<Scalars['String']>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IQuery = {
   __typename?: 'Query';
  /**  Counter  */
  counter?: Maybe<ICounter>;
  /**  Counter from Datasource  */
  counterCache?: Maybe<ICounter>;
  dummy?: Maybe<Scalars['Int']>;
  getDurationTimeRecords?: Maybe<Array<Maybe<ITimeRecord>>>;
  getDurationTimesheet?: Maybe<ITimesheet>;
  getMembers?: Maybe<Array<Maybe<IMember>>>;
  getPlayingTimeRecord?: Maybe<ITimeRecord>;
  getProjects?: Maybe<Array<Maybe<IProject>>>;
  getScheduleEvents?: Maybe<Array<Maybe<ISchedule>>>;
  getSettings?: Maybe<ISettings>;
  getTags?: Maybe<Array<Maybe<ITag>>>;
  getTimeRecords?: Maybe<Array<Maybe<ITimeRecord>>>;
  getTimelineEvents?: Maybe<Array<Maybe<ITimeline>>>;
  getTimesheets?: Maybe<Array<Maybe<ITimesheet>>>;
  /**  Moleculer Counter  */
  moleculerCounter?: Maybe<ICounter>;
};


export type IQuerygetDurationTimeRecordsArgs = {
  endTime?: Maybe<Scalars['DateTime']>;
  startTime?: Maybe<Scalars['DateTime']>;
};


export type IQuerygetDurationTimesheetArgs = {
  end?: Maybe<Scalars['DateTime']>;
  start?: Maybe<Scalars['DateTime']>;
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

export type IScheduleCreateRequest = {
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

export type ISettings = {
   __typename?: 'Settings';
  startWeekDay?: Maybe<Scalars['Int']>;
  startYearWeek?: Maybe<IStartYearWeekType>;
};

export const enum IStartYearWeekType {
  FIRST_DAY_WEEK = 'FIRST_DAY_WEEK',
  FIRST_FOURDAY_WEEK = 'FIRST_FOURDAY_WEEK',
  FIRST_FULL_WEEK = 'FIRST_FULL_WEEK'
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

export type ITimelineCreateRequest = {
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

export type ITimeRecord = {
   __typename?: 'TimeRecord';
  clientId?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  isBillable?: Maybe<Scalars['Boolean']>;
  projectId?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  taskId?: Maybe<Scalars['String']>;
  taskName?: Maybe<Scalars['String']>;
};

export type ITimeRecordRequest = {
  clientId?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['DateTime']>;
  isBillable?: Maybe<Scalars['Boolean']>;
  projectId?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  taskName?: Maybe<Scalars['String']>;
};

export type ITimesheet = {
   __typename?: 'Timesheet';
  approvedOn?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  startDate?: Maybe<Scalars['DateTime']>;
  state?: Maybe<ITimesheetState>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
  updatedOn?: Maybe<Scalars['DateTime']>;
};

export type ITimesheetCreateRequest = {
  approvedOn?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  startDate?: Maybe<Scalars['DateTime']>;
  state?: Maybe<ITimesheetState>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
  updatedOn?: Maybe<Scalars['DateTime']>;
};

export const enum ITimesheetState {
  APPROVED = 'APPROVED',
  APPROVED_FINALIZED = 'APPROVED_FINALIZED',
  APPROVED_PENDING = 'APPROVED_PENDING',
  DENYED = 'DENYED',
  DENYED_FINALIZED = 'DENYED_FINALIZED',
  OPEN = 'OPEN',
  SUBMITTED = 'SUBMITTED'
};

export type ITimeTracker = {
   __typename?: 'TimeTracker';
  orgId?: Maybe<Scalars['String']>;
  timeRecords?: Maybe<Array<Maybe<ITimeRecord>>>;
  timesheets?: Maybe<Array<Maybe<ITimesheet>>>;
  userId?: Maybe<Scalars['String']>;
};

export type IGetMembersQueryVariables = {};


export type IGetMembersQuery = (
  { __typename?: 'Query' }
  & { getMembers?: Maybe<Array<Maybe<(
    { __typename?: 'Member' }
    & Pick<IMember, 'id' | 'name'>
  )>>> }
);

export type IGetProjectsQueryVariables = {};


export type IGetProjectsQuery = (
  { __typename?: 'Query' }
  & { getProjects?: Maybe<Array<Maybe<(
    { __typename?: 'Project' }
    & Pick<IProject, 'id' | 'name' | 'clientId' | 'teams'>
    & { tasks?: Maybe<Array<Maybe<(
      { __typename?: 'Task' }
      & Pick<ITask, 'id' | 'name'>
    )>>> }
  )>>> }
);

export type IGetSettingsQueryVariables = {};


export type IGetSettingsQuery = (
  { __typename?: 'Query' }
  & { getSettings?: Maybe<(
    { __typename?: 'Settings' }
    & Pick<ISettings, 'startWeekDay' | 'startYearWeek'>
  )> }
);

export type IGetTagsQueryVariables = {};


export type IGetTagsQuery = (
  { __typename?: 'Query' }
  & { getTags?: Maybe<Array<Maybe<(
    { __typename?: 'Tag' }
    & Pick<ITag, 'id' | 'name'>
  )>>> }
);

export type ICreateTimeRecordMutationVariables = {
  request?: Maybe<ITimeRecordRequest>;
};


export type ICreateTimeRecordMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'createTimeRecord'>
);

export type ICreateTimesheetMutationVariables = {
  request?: Maybe<ITimesheetCreateRequest>;
};


export type ICreateTimesheetMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'createTimesheet'>
);

export type IRemoveDurationTimeRecordsMutationVariables = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  projectId?: Maybe<Scalars['String']>;
};


export type IRemoveDurationTimeRecordsMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'removeDurationTimeRecords'>
);

export type IRemoveTimeRecordMutationVariables = {
  recordId?: Maybe<Scalars['String']>;
};


export type IRemoveTimeRecordMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'removeTimeRecord'>
);

export type IRemoveTimesheetMutationVariables = {
  sheetId?: Maybe<Scalars['String']>;
};


export type IRemoveTimesheetMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'removeTimesheet'>
);

export type IUpdateTimeRecordMutationVariables = {
  recordId?: Maybe<Scalars['String']>;
  request?: Maybe<ITimeRecordRequest>;
};


export type IUpdateTimeRecordMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'updateTimeRecord'>
);

export type IUpdateTimesheetMutationVariables = {
  sheetId?: Maybe<Scalars['String']>;
  request?: Maybe<ITimesheetCreateRequest>;
};


export type IUpdateTimesheetMutation = (
  { __typename?: 'Mutation' }
  & Pick<IMutation, 'updateTimesheet'>
);

export type IGetDurationTimeRecordsQueryVariables = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
};


export type IGetDurationTimeRecordsQuery = (
  { __typename?: 'Query' }
  & { getDurationTimeRecords?: Maybe<Array<Maybe<(
    { __typename?: 'TimeRecord' }
    & Pick<ITimeRecord, 'id' | 'startTime' | 'endTime' | 'taskName' | 'tags' | 'projectId' | 'isBillable'>
  )>>> }
);

export type IGetDurationTimesheetQueryVariables = {
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
};


export type IGetDurationTimesheetQuery = (
  { __typename?: 'Query' }
  & { getDurationTimesheet?: Maybe<(
    { __typename?: 'Timesheet' }
    & Pick<ITimesheet, 'startDate' | 'endDate' | 'state'>
  )> }
);

export type IGetPlayingTimeRecordQueryVariables = {};


export type IGetPlayingTimeRecordQuery = (
  { __typename?: 'Query' }
  & { getPlayingTimeRecord?: Maybe<(
    { __typename?: 'TimeRecord' }
    & Pick<ITimeRecord, 'id' | 'startTime' | 'endTime' | 'taskName' | 'tags' | 'projectId' | 'isBillable'>
  )> }
);

export type IGetTimeRecordsQueryVariables = {};


export type IGetTimeRecordsQuery = (
  { __typename?: 'Query' }
  & { getTimeRecords?: Maybe<Array<Maybe<(
    { __typename?: 'TimeRecord' }
    & Pick<ITimeRecord, 'id' | 'startTime' | 'endTime' | 'taskName' | 'tags' | 'projectId' | 'isBillable'>
  )>>> }
);

export type IGetTimesheetsQueryVariables = {
  userId?: Maybe<Scalars['String']>;
};


export type IGetTimesheetsQuery = (
  { __typename?: 'Query' }
  & { getTimesheets?: Maybe<Array<Maybe<(
    { __typename?: 'Timesheet' }
    & Pick<ITimesheet, 'id' | 'startDate' | 'endDate' | 'state' | 'submittedOn' | 'approvedOn' | 'updatedBy' | 'updatedOn'>
  )>>> }
);


export const GetMembersDocument = gql`
    query GetMembers {
  getMembers @client {
    id
    name
  }
}
    `;
export type GetMembersQueryResult = ApolloReactCommon.QueryResult<IGetMembersQuery, IGetMembersQueryVariables>;
export const GetProjectsDocument = gql`
    query GetProjects {
  getProjects @client {
    id
    name
    clientId
    teams
    tasks {
      id
      name
    }
  }
}
    `;
export type GetProjectsQueryResult = ApolloReactCommon.QueryResult<IGetProjectsQuery, IGetProjectsQueryVariables>;
export const GetSettingsDocument = gql`
    query GetSettings {
  getSettings @client {
    startWeekDay
    startYearWeek
  }
}
    `;
export type GetSettingsQueryResult = ApolloReactCommon.QueryResult<IGetSettingsQuery, IGetSettingsQueryVariables>;
export const GetTagsDocument = gql`
    query GetTags {
  getTags @client {
    id
    name
  }
}
    `;
export type GetTagsQueryResult = ApolloReactCommon.QueryResult<IGetTagsQuery, IGetTagsQueryVariables>;
export const CreateTimeRecordDocument = gql`
    mutation CreateTimeRecord($request: TimeRecordRequest) {
  createTimeRecord(request: $request)
}
    `;
export type CreateTimeRecordMutationResult = ApolloReactCommon.MutationResult<ICreateTimeRecordMutation>;
export type CreateTimeRecordMutationOptions = ApolloReactCommon.BaseMutationOptions<ICreateTimeRecordMutation, ICreateTimeRecordMutationVariables>;
export const CreateTimesheetDocument = gql`
    mutation CreateTimesheet($request: TimesheetCreateRequest) {
  createTimesheet(request: $request)
}
    `;
export type CreateTimesheetMutationResult = ApolloReactCommon.MutationResult<ICreateTimesheetMutation>;
export type CreateTimesheetMutationOptions = ApolloReactCommon.BaseMutationOptions<ICreateTimesheetMutation, ICreateTimesheetMutationVariables>;
export const RemoveDurationTimeRecordsDocument = gql`
    mutation RemoveDurationTimeRecords($startTime: DateTime, $endTime: DateTime, $projectId: String) {
  removeDurationTimeRecords(startTime: $startTime, endTime: $endTime, projectId: $projectId)
}
    `;
export type RemoveDurationTimeRecordsMutationResult = ApolloReactCommon.MutationResult<IRemoveDurationTimeRecordsMutation>;
export type RemoveDurationTimeRecordsMutationOptions = ApolloReactCommon.BaseMutationOptions<IRemoveDurationTimeRecordsMutation, IRemoveDurationTimeRecordsMutationVariables>;
export const RemoveTimeRecordDocument = gql`
    mutation RemoveTimeRecord($recordId: String) {
  removeTimeRecord(recordId: $recordId)
}
    `;
export type RemoveTimeRecordMutationResult = ApolloReactCommon.MutationResult<IRemoveTimeRecordMutation>;
export type RemoveTimeRecordMutationOptions = ApolloReactCommon.BaseMutationOptions<IRemoveTimeRecordMutation, IRemoveTimeRecordMutationVariables>;
export const RemoveTimesheetDocument = gql`
    mutation RemoveTimesheet($sheetId: String) {
  removeTimesheet(sheetId: $sheetId)
}
    `;
export type RemoveTimesheetMutationResult = ApolloReactCommon.MutationResult<IRemoveTimesheetMutation>;
export type RemoveTimesheetMutationOptions = ApolloReactCommon.BaseMutationOptions<IRemoveTimesheetMutation, IRemoveTimesheetMutationVariables>;
export const UpdateTimeRecordDocument = gql`
    mutation UpdateTimeRecord($recordId: String, $request: TimeRecordRequest) {
  updateTimeRecord(recordId: $recordId, request: $request)
}
    `;
export type UpdateTimeRecordMutationResult = ApolloReactCommon.MutationResult<IUpdateTimeRecordMutation>;
export type UpdateTimeRecordMutationOptions = ApolloReactCommon.BaseMutationOptions<IUpdateTimeRecordMutation, IUpdateTimeRecordMutationVariables>;
export const UpdateTimesheetDocument = gql`
    mutation UpdateTimesheet($sheetId: String, $request: TimesheetCreateRequest) {
  updateTimesheet(sheetId: $sheetId, request: $request)
}
    `;
export type UpdateTimesheetMutationResult = ApolloReactCommon.MutationResult<IUpdateTimesheetMutation>;
export type UpdateTimesheetMutationOptions = ApolloReactCommon.BaseMutationOptions<IUpdateTimesheetMutation, IUpdateTimesheetMutationVariables>;
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
export type GetDurationTimeRecordsQueryResult = ApolloReactCommon.QueryResult<IGetDurationTimeRecordsQuery, IGetDurationTimeRecordsQueryVariables>;
export const GetDurationTimesheetDocument = gql`
    query GetDurationTimesheet($start: DateTime, $end: DateTime) {
  getDurationTimesheet(start: $start, end: $end) {
    startDate
    endDate
    state
  }
}
    `;
export type GetDurationTimesheetQueryResult = ApolloReactCommon.QueryResult<IGetDurationTimesheetQuery, IGetDurationTimesheetQueryVariables>;
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
export type GetPlayingTimeRecordQueryResult = ApolloReactCommon.QueryResult<IGetPlayingTimeRecordQuery, IGetPlayingTimeRecordQueryVariables>;
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
export type GetTimeRecordsQueryResult = ApolloReactCommon.QueryResult<IGetTimeRecordsQuery, IGetTimeRecordsQueryVariables>;
export const GetTimesheetsDocument = gql`
    query GetTimesheets($userId: String) {
  getTimesheets(userId: $userId) {
    id
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
export type GetTimesheetsQueryResult = ApolloReactCommon.QueryResult<IGetTimesheetsQuery, IGetTimesheetsQueryVariables>;


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
  Timesheet: ResolverTypeWrapper<ITimesheet>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  TimesheetState: ITimesheetState,
  Member: ResolverTypeWrapper<IMember>,
  Project: ResolverTypeWrapper<IProject>,
  Task: ResolverTypeWrapper<ITask>,
  Schedule: ResolverTypeWrapper<ISchedule>,
  Settings: ResolverTypeWrapper<ISettings>,
  StartYearWeekType: IStartYearWeekType,
  Tag: ResolverTypeWrapper<ITag>,
  Timeline: ResolverTypeWrapper<ITimeline>,
  Mutation: ResolverTypeWrapper<{}>,
  ScheduleCreateRequest: IScheduleCreateRequest,
  TimelineCreateRequest: ITimelineCreateRequest,
  TimeRecordRequest: ITimeRecordRequest,
  TimesheetCreateRequest: ITimesheetCreateRequest,
  Subscription: ResolverTypeWrapper<{}>,
  AnyObject: ResolverTypeWrapper<Scalars['AnyObject']>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
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
  Timesheet: ITimesheet,
  ID: Scalars['ID'],
  TimesheetState: ITimesheetState,
  Member: IMember,
  Project: IProject,
  Task: ITask,
  Schedule: ISchedule,
  Settings: ISettings,
  StartYearWeekType: IStartYearWeekType,
  Tag: ITag,
  Timeline: ITimeline,
  Mutation: {},
  ScheduleCreateRequest: IScheduleCreateRequest,
  TimelineCreateRequest: ITimelineCreateRequest,
  TimeRecordRequest: ITimeRecordRequest,
  TimesheetCreateRequest: ITimesheetCreateRequest,
  Subscription: {},
  AnyObject: Scalars['AnyObject'],
  Date: Scalars['Date'],
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
  clientId?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  tasks?: Resolver<Maybe<Array<Maybe<IResolversTypes['Task']>>>, ParentType, ContextType>,
  teams?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  counter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
  counterCache?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
  dummy?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  getDurationTimeRecords?: Resolver<Maybe<Array<Maybe<IResolversTypes['TimeRecord']>>>, ParentType, ContextType, RequireFields<IQuerygetDurationTimeRecordsArgs, never>>,
  getDurationTimesheet?: Resolver<Maybe<IResolversTypes['Timesheet']>, ParentType, ContextType, RequireFields<IQuerygetDurationTimesheetArgs, never>>,
  getMembers?: Resolver<Maybe<Array<Maybe<IResolversTypes['Member']>>>, ParentType, ContextType>,
  getPlayingTimeRecord?: Resolver<Maybe<IResolversTypes['TimeRecord']>, ParentType, ContextType>,
  getProjects?: Resolver<Maybe<Array<Maybe<IResolversTypes['Project']>>>, ParentType, ContextType>,
  getScheduleEvents?: Resolver<Maybe<Array<Maybe<IResolversTypes['Schedule']>>>, ParentType, ContextType, RequireFields<IQuerygetScheduleEventsArgs, never>>,
  getSettings?: Resolver<Maybe<IResolversTypes['Settings']>, ParentType, ContextType>,
  getTags?: Resolver<Maybe<Array<Maybe<IResolversTypes['Tag']>>>, ParentType, ContextType>,
  getTimeRecords?: Resolver<Maybe<Array<Maybe<IResolversTypes['TimeRecord']>>>, ParentType, ContextType>,
  getTimelineEvents?: Resolver<Maybe<Array<Maybe<IResolversTypes['Timeline']>>>, ParentType, ContextType, RequireFields<IQuerygetTimelineEventsArgs, never>>,
  getTimesheets?: Resolver<Maybe<Array<Maybe<IResolversTypes['Timesheet']>>>, ParentType, ContextType, RequireFields<IQuerygetTimesheetsArgs, never>>,
  moleculerCounter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
};

export type IScheduleResolvers<ContextType = any, ParentType extends IResolversParentTypes['Schedule'] = IResolversParentTypes['Schedule']> = {
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  allDay?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  start?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  end?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  desc?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  resourceId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  tooltip?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  isBillable?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  reason?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  note?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  approvedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ISettingsResolvers<ContextType = any, ParentType extends IResolversParentTypes['Settings'] = IResolversParentTypes['Settings']> = {
  startWeekDay?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  startYearWeek?: Resolver<Maybe<IResolversTypes['StartYearWeekType']>, ParentType, ContextType>,
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
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  allDay?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  start?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  end?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  desc?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  resourceId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  tooltip?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  isBillable?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  reason?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  note?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  approvedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ITimeRecordResolvers<ContextType = any, ParentType extends IResolversParentTypes['TimeRecord'] = IResolversParentTypes['TimeRecord']> = {
  clientId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  endTime?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  isBillable?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  projectId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  startTime?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  tags?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  taskId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  taskName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ITimesheetResolvers<ContextType = any, ParentType extends IResolversParentTypes['Timesheet'] = IResolversParentTypes['Timesheet']> = {
  approvedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  endDate?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  startDate?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  state?: Resolver<Maybe<IResolversTypes['TimesheetState']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  updatedBy?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  updatedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ITimeTrackerResolvers<ContextType = any, ParentType extends IResolversParentTypes['TimeTracker'] = IResolversParentTypes['TimeTracker']> = {
  orgId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  timeRecords?: Resolver<Maybe<Array<Maybe<IResolversTypes['TimeRecord']>>>, ParentType, ContextType>,
  timesheets?: Resolver<Maybe<Array<Maybe<IResolversTypes['Timesheet']>>>, ParentType, ContextType>,
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
  Member?: IMemberResolvers<ContextType>,
  Mutation?: IMutationResolvers<ContextType>,
  Project?: IProjectResolvers<ContextType>,
  Query?: IQueryResolvers<ContextType>,
  Schedule?: IScheduleResolvers<ContextType>,
  Settings?: ISettingsResolvers<ContextType>,
  Subscription?: ISubscriptionResolvers<ContextType>,
  Tag?: ITagResolvers<ContextType>,
  Task?: ITaskResolvers<ContextType>,
  Time?: GraphQLScalarType,
  Timeline?: ITimelineResolvers<ContextType>,
  TimeRecord?: ITimeRecordResolvers<ContextType>,
  Timesheet?: ITimesheetResolvers<ContextType>,
  TimeTracker?: ITimeTrackerResolvers<ContextType>,
};


