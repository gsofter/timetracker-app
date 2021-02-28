/* tslint:disable */

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../apollo-context';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AnyObject: any;
  URI: any;
  URIInput: any;
  DateTime: any;
  Date: any;
  Time: any;
  JSON: any;
  JSONObject: any;
};






/**  all input for the `acceptInvitationToTeam` mutation. */
export type IAcceptInvitationToTeam_Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  code?: Maybe<Scalars['String']>;
  invitationId: Scalars['String'];
};

export type IAccessRole = IDefaultRole | IOrganizationRole | IResourceRole | IApplicationRolePermission;

/**
 * Teams are groups of organization members that reflect yoru company or group's structure
 * with cascading access permissions and mentions.
 * @property
 * name: The name of the team
 * @property
 * description: Description of the team.
 * @property
 * orgId: The organization to which the team belongs.
 * @property
 * parentTeam: The parent team of the team.
 * @property
 * tags: Arbitrary tags that the team uses.
 * @property
 * invitations: The outstanding invitations to join the team.
 * @property
 * teamMembers: Team members.
 */
export type IAccountTeam = {
   __typename?: 'AccountTeam';
  _id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  invitations?: Maybe<Array<Maybe<ITeamInvitation>>>;
  name?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  parentTeam?: Maybe<IAccountTeam>;
  settingsUri?: Maybe<Scalars['URI']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  teamMembers?: Maybe<Array<Maybe<ITeamMember>>>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type IAccountTeam_Input = {
  _id?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  invitations?: Maybe<Array<Maybe<ITeamInvitation_Input>>>;
  name?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  parentTeam?: Maybe<IAccountTeam_Input>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  teamMembers?: Maybe<Array<Maybe<ITeamMember_Input>>>;
};


export type IApplicationPolicy = IIConfigurationModel & {
   __typename?: 'ApplicationPolicy';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IApplicationRolePermission = IIConfigurationModel & {
   __typename?: 'ApplicationRolePermission';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export const enum IApplicationRoles {
  ADMIN = 'ADMIN',
  CONTRIBUTORS = 'CONTRIBUTORS',
  GUEST = 'GUEST',
  MEMBER = 'MEMBER',
  /**  organization member  */
  ORGANIZATION_MANAGER = 'ORGANIZATION_MANAGER',
  OWNER = 'OWNER',
  PROJECT_ADMIN = 'PROJECT_ADMIN',
  PROJECT_VIEWER = 'PROJECT_VIEWER',
  TEAM_MAINTAINER = 'TEAM_MAINTAINER',
  TEAM_MEMBER = 'TEAM_MEMBER'
};

export type IAsanaConnection = {
   __typename?: 'AsanaConnection';
  asana?: Maybe<IAsanaConnectionState>;
};

export type IAsanaConnectionState = {
   __typename?: 'AsanaConnectionState';
  status?: Maybe<Scalars['String']>;
  user?: Maybe<IAsanaUser>;
};

export type IAsanaUser = {
   __typename?: 'AsanaUser';
  user_id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type IAuthProvider = {
  auth0?: Maybe<IIdToken>;
};

export type IAuthUser = IIUser & {
   __typename?: 'AuthUser';
  id: Scalars['ID'];
  auth0UserId?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

export type IAuthUser_Input = {
  auth0UserId?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

/** AuthUser fields based on JSON Web Token extraction. */
export type IAuthUserRaw = IIAuthUser & {
   __typename?: 'AuthUserRaw';
  given_name?: Maybe<Scalars['String']>;
  family_name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  picture?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  iss?: Maybe<Scalars['String']>;
  sub?: Maybe<Scalars['String']>;
  aud?: Maybe<Scalars['String']>;
  iat?: Maybe<Scalars['Int']>;
  exp?: Maybe<Scalars['Int']>;
  at_hash?: Maybe<Scalars['String']>;
  nonce?: Maybe<Scalars['String']>;
};

export type IClient = {
   __typename?: 'Client';
  clientPhone?: Maybe<IClientPhone>;
  companyName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  currency: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  orgName?: Maybe<Scalars['String']>;
  socialConnect?: Maybe<ISocialConnect>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  website?: Maybe<Scalars['String']>;
};

export type IClientAddRequest = {
  clientPhone?: Maybe<IClientPhone_Input>;
  companyName?: Maybe<Scalars['String']>;
  currency: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  orgName?: Maybe<Scalars['String']>;
  socialConnect?: Maybe<ISocialConnect_Input>;
  website?: Maybe<Scalars['String']>;
};

export const enum IClientCacheTypeNames {
  Context = 'Context'
};

export type IClientPhone = {
   __typename?: 'ClientPhone';
  mobile?: Maybe<Scalars['String']>;
  workPhone?: Maybe<Scalars['String']>;
};

export type IClientPhone_Input = {
  mobile?: Maybe<Scalars['String']>;
  workPhone?: Maybe<Scalars['String']>;
};

export const enum IClientTypes {
  Business = 'Business',
  Individuals = 'Individuals'
};

export type IClientUpdateRequest = {
  id?: Maybe<Scalars['String']>;
  payload?: Maybe<IUpdatedClient_Input>;
};

export const enum IConfigCollectionName {
  accounts = 'accounts',
  organizations = 'organizations',
  workspaces = 'workspaces',
  teams = 'teams',
  projects = 'projects',
  clients = 'clients'
};

export const enum IConfigFragmentName {
  resources = 'resources',
  settings = 'settings',
  policies = 'policies',
  applicationPolicies = 'applicationPolicies',
  roles = 'roles',
  contributionRoles = 'contributionRoles',
  /**  Team Members Document with role value  */
  teamMembers = 'teamMembers',
  /**  Organization Members Document with role value  */
  orgMembers = 'orgMembers'
};

export type IConfiguration = IDefaultConfiguration | IUserConfiguration | IOrganizationConfiguration | IOrganizationResourceConfiguration;

export type IConfigurationData = {
   __typename?: 'ConfigurationData';
  defaults?: Maybe<IIConfigurationModel>;
  user?: Maybe<IIConfigurationModel>;
  organization?: Maybe<IIConfigurationModel>;
  resources?: Maybe<Array<Maybe<IIConfigurationModel>>>;
  isComplete?: Maybe<Scalars['Boolean']>;
};

export type IConfigurationExtensionInfo = {
   __typename?: 'ConfigurationExtensionInfo';
  id?: Maybe<Scalars['String']>;
};

export type IConfigurationInput = {
  target: Scalars['Int'];
  resource?: Maybe<Scalars['URIInput']>;
};

export type IConfigurationModel = {
   __typename?: 'ConfigurationModel';
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IConfigurationOverrides = {
   __typename?: 'ConfigurationOverrides';
  resource?: Maybe<Scalars['URI']>;
  overrideIdentifier?: Maybe<Scalars['String']>;
};

export type IConfigurationOverrides_Input = {
  resource?: Maybe<Scalars['URI']>;
  overrideIdentifier?: Maybe<Scalars['String']>;
};

export type IConfigurationPolicy = IDefaultPolicy | IOrganizationPolicy | IResourcePolicy | IApplicationPolicy;

/**
 * A configuration settings can have one of the following possible scopes.
 * Configuration scopes determine when a settings is available to the user through the Settings editor and
 * whether the setting is applicable. If no scope is declared, the default is `window`.
 */
export const enum IConfigurationScope {
  /** Application specific configuration, which can be configured only in local user settings. */
  APPLICATION = 'APPLICATION',
  /** Machine specific configuration, which can be configured only in local and remote user settings. */
  MACHINE = 'MACHINE',
  /** Window specific configuration, which can be configured in the user or organization settings. */
  WINDOW = 'WINDOW',
  /** Resource specific configuration, which can be configured in the user, organization or workspace settings. */
  RESOURCE = 'RESOURCE'
};

export const enum IConfigurationTarget {
  /** Targets the user configuration file for writing. */
  USER = 'USER',
  USER_LOCAL = 'USER_LOCAL',
  USER_REMOTE = 'USER_REMOTE',
  /** Targets the organization configuration file for writing. This only works if a organization is opened. */
  ORGANIZATION = 'ORGANIZATION',
  /** Targets the resource configuration file for writing. This only works if a organization is opened. */
  ORGANIZATION_RESOURCE = 'ORGANIZATION_RESOURCE',
  DEFAULT = 'DEFAULT',
  MEMORY = 'MEMORY'
};

export type IConfigurationUpdateEvent = {
   __typename?: 'ConfigurationUpdateEvent';
  resource: Scalars['URI'];
  contents?: Maybe<Scalars['AnyObject']>;
  overrides?: Maybe<IConfigurationOverrides>;
  target?: Maybe<Scalars['Int']>;
};

export type IContext = {
   __typename?: 'Context';
  orgName?: Maybe<Scalars['String']>;
};

/** Contributed Roles added by the user to customize the role's permissions */
export type IContributionRoles = {
   __typename?: 'ContributionRoles';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  permissions?: Maybe<IAccessRole>;
};

export type IContributionSettings = {
   __typename?: 'ContributionSettings';
  /**  name of the settings */
  name?: Maybe<Scalars['String']>;
  range?: Maybe<IRange>;
  key?: Maybe<Scalars['String']>;
  keyRange?: Maybe<IRange>;
  /**  @deprecated  */
  default?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['AnyObject']>;
  valueRange?: Maybe<IRange>;
  description?: Maybe<Array<Maybe<Scalars['String']>>>;
  descriptionIsMarkdown?: Maybe<Scalars['Boolean']>;
  descriptionRanges?: Maybe<Array<Maybe<IRange>>>;
  overrides?: Maybe<Array<Maybe<IContributionSettings>>>;
  overrideOf?: Maybe<IContributionSettings>;
  deprecationMessage?: Maybe<Scalars['String']>;
  scope?: Maybe<IConfigurationScope>;
  type?: Maybe<Array<Maybe<Scalars['String']>>>;
  enum?: Maybe<Array<Maybe<Scalars['String']>>>;
  enumDescriptions?: Maybe<Array<Maybe<Scalars['String']>>>;
  enumDescriptionsAreMarkdown?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  extensionInfo?: Maybe<IConfigurationExtensionInfo>;
};

/**  Database counter  */
export type ICounter = {
   __typename?: 'Counter';
  /**  Current amount  */
  amount: Scalars['Int'];
};



export type IDefaultConfiguration = IIConfigurationModel & {
   __typename?: 'DefaultConfiguration';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /** The URL to the user's settings. */
  resource: Scalars['URI'];
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IDefaultPolicy = IIConfigurationModel & {
   __typename?: 'DefaultPolicy';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IDefaultRole = IIConfigurationModel & {
   __typename?: 'DefaultRole';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IDefaultSettings = IISettingsSubject & {
   __typename?: 'DefaultSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<ISettings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings. */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: ISettingsCascade;
};

/**
 * A basic environment service that can be used in various processes,
 * such as main, renderer and shared process. Use subclasses of this
 * service for specific environment.
 */
export type IEnvironment = {
   __typename?: 'Environment';
  args?: Maybe<Scalars['AnyObject']>;
};

export type IEnvironmentPayload = {
  args?: Maybe<Scalars['AnyObject']>;
};

export type IFieldError = {
   __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type IGlobalSettings = IISettingsSubject & {
   __typename?: 'GlobalSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<ISettings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings.  */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: ISettingsCascade;
};

/** Profile based on Auth0Profile */
export type IIAuth0UserProfile = {
  name: Scalars['String'];
  nickname: Scalars['String'];
  picture: Scalars['String'];
  user_id: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  family_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  clientID: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
  sub: Scalars['String'];
  user_metadata?: Maybe<Scalars['AnyObject']>;
  app_metadata?: Maybe<Scalars['AnyObject']>;
};

export type IIAuthUser = {
  given_name?: Maybe<Scalars['String']>;
  family_name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  iss?: Maybe<Scalars['String']>;
  sub?: Maybe<Scalars['String']>;
  aud?: Maybe<Scalars['String']>;
  iat?: Maybe<Scalars['Int']>;
  exp?: Maybe<Scalars['Int']>;
  at_hash?: Maybe<Scalars['String']>;
  nonce?: Maybe<Scalars['String']>;
};

export type IIConfigurationChangeEvent = {
   __typename?: 'IConfigurationChangeEvent';
  source?: Maybe<IConfigurationTarget>;
  affectedKeys?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceConfig?: Maybe<Scalars['AnyObject']>;
  changedConfiguration?: Maybe<IConfiguration>;
  changedConfigurationByResource?: Maybe<IOrganizationResourceConfiguration>;
};

export type IIConfigurationModel = {
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IIdToken = {
  idToken: Scalars['String'];
};

export type IInvitationDecode = {
   __typename?: 'InvitationDecode';
  email?: Maybe<Scalars['String']>;
  invitationId?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  teamName?: Maybe<Scalars['String']>;
};

export type IInviteMember = {
   __typename?: 'InviteMember';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  role?: Maybe<IApplicationRoles>;
  status?: Maybe<IInviteStatus>;
  teamId?: Maybe<Scalars['String']>;
  teamName?: Maybe<Scalars['String']>;
};

export const enum IInviteStatus {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING'
};

export type IIOrgUser = {
  inactive?: Maybe<Scalars['Boolean']>;
  role?: Maybe<IApplicationRoles>;
  userId: Scalars['String'];
};

export type IIResourceUserRole = {
  role?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  isSelf?: Maybe<Scalars['Boolean']>;
  orgName?: Maybe<Scalars['String']>;
};

/**
 * ISettingsSubject is something that can have settings: a site ("global settings", which is different from "site
 * configuration"), an organization, or a user.
 */
export type IISettingsSubject = {
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<ISettings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings.  */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: ISettingsCascade;
};

export type IIUser = {
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};



/**
 * A segment of a key path that locates a nested JSON value in a root JSON value. Exactly one field in each
 * KeyPathSegment must be non-null.
 * 
 * For example, in {"a": [0, {"b": 3}]}, the value 3 is located at the key path ["a", 1, "b"].
 */
export type IKeyPathSegment = {
  /**  The name of the property in the object at this location to descend into.  */
  property?: Maybe<Scalars['String']>;
  /**  The index of the array at this location to descend into.  */
  index?: Maybe<Scalars['Int']>;
};

export type ILocalUserSettings = IISettingsSubject & {
   __typename?: 'LocalUserSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<ISettings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings. */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: ISettingsCascade;
};

export type ILoginError = {
   __typename?: 'LoginError';
  timeStamp?: Maybe<Scalars['DateTime']>;
  error?: Maybe<Scalars['AnyObject']>;
};

export type IMemorySettings = IISettingsSubject & {
   __typename?: 'MemorySettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<ISettings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings. */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: ISettingsCascade;
};

export type IMutation = {
   __typename?: 'Mutation';
  acceptInvitation?: Maybe<Scalars['Boolean']>;
  /**
   * If someone invited you by your email address then you must include the code
   * that was emailed to you, otherwise you may accept the invitation directly
   * using the UUID. If successful, you will be a member of the organization.
   */
  acceptInvitationToTeam?: Maybe<Scalars['Boolean']>;
  acceptOrganizationInvitation?: Maybe<Scalars['Boolean']>;
  addClient?: Maybe<Scalars['Boolean']>;
  addContributionRole?: Maybe<Scalars['Boolean']>;
  /**  Increase counter value returns current counter amount  */
  addCounter?: Maybe<ICounter>;
  /**  add Counter  */
  addMoleculerCounter?: Maybe<ICounter>;
  addOrgProject?: Maybe<Scalars['Boolean']>;
  addScheduleEvent?: Maybe<Scalars['Boolean']>;
  addTeamMembers?: Maybe<Scalars['Boolean']>;
  addTimelineEvent?: Maybe<Scalars['Boolean']>;
  changeMemberRole?: Maybe<Scalars['Boolean']>;
  changeOrgMemberRole?: Maybe<Scalars['Boolean']>;
  createAuth0User?: Maybe<IAuthUser>;
  createOrganization?: Maybe<IOrganization>;
  createTeam?: Maybe<IAccountTeam>;
  createTimeRecord?: Maybe<Scalars['String']>;
  createTimesheet?: Maybe<Scalars['Boolean']>;
  declineInvitation?: Maybe<Scalars['Boolean']>;
  declineOrganizationInvitation?: Maybe<Scalars['Boolean']>;
  dummy?: Maybe<Scalars['Int']>;
  initiateConfigurationValue?: Maybe<Scalars['Boolean']>;
  initiatePolicyValue?: Maybe<Scalars['Boolean']>;
  onAuth0UserCreated?: Maybe<Scalars['Boolean']>;
  removeDurationTimeRecords?: Maybe<Scalars['Boolean']>;
  removeOrgClient?: Maybe<Scalars['Boolean']>;
  removeOrgMember?: Maybe<Scalars['Boolean']>;
  removeOrganization?: Maybe<Scalars['Boolean']>;
  removeScheduleEvent?: Maybe<Scalars['Boolean']>;
  removeTeam?: Maybe<Scalars['Boolean']>;
  removeTeamMember?: Maybe<Scalars['Boolean']>;
  removeTimeRecord?: Maybe<Scalars['Boolean']>;
  removeTimelineEvent?: Maybe<Scalars['Boolean']>;
  removeTimesheet?: Maybe<Scalars['Boolean']>;
  resendInvitation?: Maybe<Scalars['Boolean']>;
  resendOrganizationInvitation?: Maybe<Scalars['Boolean']>;
  sendInvitation?: Maybe<Scalars['Boolean']>;
  sendOrganizationInvitation?: Maybe<Scalars['Boolean']>;
  setSettingsValueByResource?: Maybe<Scalars['Boolean']>;
  /**  sync cached counter with current value  */
  syncCachedCounter?: Maybe<Scalars['Boolean']>;
  updateConfigurationPolicyValue?: Maybe<Scalars['Boolean']>;
  updateConfigurationPolicyValueByUri?: Maybe<Scalars['Boolean']>;
  updateConfigurationValue?: Maybe<Scalars['Boolean']>;
  updateConfigurationValueByUri?: Maybe<Scalars['Boolean']>;
  updateOrgClient?: Maybe<IClient>;
  updateOrgMemberTeams?: Maybe<Scalars['Boolean']>;
  updateOrgProject?: Maybe<Scalars['Boolean']>;
  updateOrganization?: Maybe<IOrganization>;
  updateOrganizationContextAddResources?: Maybe<Array<Maybe<IOrganizationResourceData>>>;
  updateOrganizationContextRemoveResources?: Maybe<Array<Maybe<IOrganizationResourceData>>>;
  updateOrganizationContextUpdateResources?: Maybe<Array<Maybe<IOrganizationResourceData>>>;
  updateProjectStatus?: Maybe<Scalars['Boolean']>;
  updateRoleValue?: Maybe<Scalars['Boolean']>;
  updateScheduleEvent?: Maybe<Scalars['Boolean']>;
  updateTimeRecord?: Maybe<Scalars['Boolean']>;
  updateTimelineEvent?: Maybe<Scalars['Boolean']>;
  updateTimesheet?: Maybe<Scalars['Boolean']>;
  updateTimesheetStatus?: Maybe<Scalars['Boolean']>;
};


export type IMutationacceptInvitationArgs = {
  id: Scalars['ID'];
};


export type IMutationacceptInvitationToTeamArgs = {
  input?: Maybe<IAcceptInvitationToTeam_Input>;
};


export type IMutationacceptOrganizationInvitationArgs = {
  id: Scalars['ID'];
  notification?: Maybe<IOrganizationNotificationValues>;
};


export type IMutationaddClientArgs = {
  client: IClientAddRequest;
};


export type IMutationaddContributionRoleArgs = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};


export type IMutationaddCounterArgs = {
  amount?: Maybe<Scalars['Int']>;
};


export type IMutationaddMoleculerCounterArgs = {
  amount?: Maybe<Scalars['Int']>;
};


export type IMutationaddOrgProjectArgs = {
  project: IProjectAddRequest;
};


export type IMutationaddScheduleEventArgs = {
  request?: Maybe<IScheduleCreateRequest>;
};


export type IMutationaddTeamMembersArgs = {
  memberIds: Array<Maybe<Scalars['String']>>;
  orgName: Scalars['String'];
  teamName: Scalars['String'];
};


export type IMutationaddTimelineEventArgs = {
  request?: Maybe<ITimelineCreateRequest>;
};


export type IMutationchangeMemberRoleArgs = {
  memberId: Scalars['String'];
  orgName: Scalars['String'];
  role: Scalars['String'];
  teamName: Scalars['String'];
};


export type IMutationchangeOrgMemberRoleArgs = {
  role: IApplicationRoles;
  userId: Scalars['String'];
};


export type IMutationcreateAuth0UserArgs = {
  authProvider?: Maybe<IAuthProvider>;
  userInfo?: Maybe<IUserInfo>;
};


export type IMutationcreateOrganizationArgs = {
  organization: IOrganizationCreateRequest;
};


export type IMutationcreateTeamArgs = {
  request: ITeamCreationRequest;
};


export type IMutationcreateTimeRecordArgs = {
  request?: Maybe<ITimeRecordRequest>;
};


export type IMutationcreateTimesheetArgs = {
  request?: Maybe<ITimesheetCreateRequest>;
};


export type IMutationdeclineInvitationArgs = {
  id: Scalars['ID'];
};


export type IMutationdeclineOrganizationInvitationArgs = {
  id: Scalars['ID'];
};


export type IMutationinitiateConfigurationValueArgs = {
  resource?: Maybe<Scalars['URI']>;
};


export type IMutationinitiatePolicyValueArgs = {
  resource?: Maybe<Scalars['URI']>;
};


export type IMutationremoveDurationTimeRecordsArgs = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  projectId?: Maybe<Scalars['String']>;
};


export type IMutationremoveOrgClientArgs = {
  clientId: Scalars['String'];
};


export type IMutationremoveOrgMemberArgs = {
  memberId: Scalars['String'];
};


export type IMutationremoveOrganizationArgs = {
  organization: IOrganizationRemoveRequest;
};


export type IMutationremoveScheduleEventArgs = {
  eventId?: Maybe<Scalars['String']>;
};


export type IMutationremoveTeamArgs = {
  teamId: Scalars['String'];
};


export type IMutationremoveTeamMemberArgs = {
  memberId: Scalars['String'];
  orgName: Scalars['String'];
  teamName: Scalars['String'];
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


export type IMutationresendInvitationArgs = {
  id: Scalars['ID'];
};


export type IMutationresendOrganizationInvitationArgs = {
  id: Scalars['ID'];
};


export type IMutationsendInvitationArgs = {
  request: ITeamInvitationRequest;
};


export type IMutationsendOrganizationInvitationArgs = {
  request?: Maybe<IOrganizationInvitationRequest>;
};


export type IMutationsetSettingsValueByResourceArgs = {
  uri?: Maybe<Scalars['URI']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};


export type IMutationupdateConfigurationPolicyValueArgs = {
  key: Scalars['String'];
  value: Scalars['AnyObject'];
  overrides?: Maybe<IConfigurationOverrides_Input>;
  target?: Maybe<Scalars['Int']>;
  donotNotifyError?: Maybe<Scalars['Boolean']>;
};


export type IMutationupdateConfigurationPolicyValueByUriArgs = {
  resource?: Maybe<Scalars['URI']>;
  key: Scalars['String'];
  value: Scalars['AnyObject'];
  overrides?: Maybe<IConfigurationOverrides_Input>;
  target?: Maybe<Scalars['Int']>;
  donotNotifyError?: Maybe<Scalars['Boolean']>;
};


export type IMutationupdateConfigurationValueArgs = {
  key: Scalars['String'];
  value: Scalars['AnyObject'];
  overrides?: Maybe<IConfigurationOverrides_Input>;
  target?: Maybe<Scalars['Int']>;
  donotNotifyError?: Maybe<Scalars['Boolean']>;
};


export type IMutationupdateConfigurationValueByUriArgs = {
  resource?: Maybe<Scalars['URI']>;
  key: Scalars['String'];
  value: Scalars['AnyObject'];
  overrides?: Maybe<IConfigurationOverrides_Input>;
  target?: Maybe<Scalars['Int']>;
  donotNotifyError?: Maybe<Scalars['Boolean']>;
};


export type IMutationupdateOrgClientArgs = {
  updateRequest?: Maybe<IClientUpdateRequest>;
};


export type IMutationupdateOrgMemberTeamsArgs = {
  addToTeams?: Maybe<Array<Maybe<Scalars['String']>>>;
  orgName: Scalars['String'];
  removeFromTeams?: Maybe<Array<Maybe<Scalars['String']>>>;
  userId: Scalars['String'];
};


export type IMutationupdateOrgProjectArgs = {
  id: Scalars['String'];
  project?: Maybe<IUpdateProject_Input>;
};


export type IMutationupdateOrganizationArgs = {
  organization: IOrganizationUpdateRequest;
};


export type IMutationupdateOrganizationContextAddResourcesArgs = {
  orgId?: Maybe<Scalars['String']>;
  resourcesToAdd: Array<Maybe<IOrganizationResourceCreationData_Input>>;
  index?: Maybe<Scalars['Int']>;
};


export type IMutationupdateOrganizationContextRemoveResourcesArgs = {
  resourcesToRemove: Array<Scalars['URI']>;
};


export type IMutationupdateOrganizationContextUpdateResourcesArgs = {
  resourcesToAdd: Array<Maybe<IOrganizationResourceCreationData_Input>>;
  resourcesToRemove: Array<Maybe<Scalars['URI']>>;
  index?: Maybe<Scalars['Int']>;
};


export type IMutationupdateProjectStatusArgs = {
  id: Scalars['String'];
  status?: Maybe<Scalars['String']>;
};


export type IMutationupdateRoleValueArgs = {
  key: Scalars['String'];
  value: Scalars['AnyObject'];
  overrides?: Maybe<IConfigurationOverrides_Input>;
  target?: Maybe<Scalars['Int']>;
  donotNotifyError?: Maybe<Scalars['Boolean']>;
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

/**
 * OrganizationInvitationRole: The possible organization invitation roles.
 * 
 * @property
 * ADMIN: The user is invited to be an admin of the organization
 * BILLING_MANAGER: The user is invited to be a billing manager of the organization.
 * DIRECT_MEMBER: The user is invited to be a direct member of the organization.
 * REINSTATE: The user's previous role will be reinstated.
 */
export const enum IOrgainizationInvitationRole {
  ADMIN = 'ADMIN',
  BILLING_MANAGER = 'BILLING_MANAGER',
  DIRECT_MEMBER = 'DIRECT_MEMBER',
  REINSTATE = 'REINSTATE'
};

/**
 * Organization: A groups of people can collaborate accross many
 * workspaces/projects at the same time in organization accounts.
 * 
 * @property
 * name: The name of the organization
 * @property
 * namespace: The parent namespace which will be used in workspaces
 * @property
 * picture: The org avatar
 * @property
 * isBillingLeader: true if the viewer is the billing leader for the org
 * @property
 * mainBilingLeaderId: The billing leader of the organization (or the first, if more than 1)
 * @property
 * billingEmail: The billing email for the organization.
 * @property
 * periodStart: The datetime the curren billing cycle starts.
 * @property
 * periodStop: The datetime the current billing cycle ends.
 * @property
 * stripeId: The customerId from stripe.
 * @property
 * stripeSubscriptionId: The subscriptionId from stripe.
 */
export type IOrganization = {
   __typename?: 'Organization';
  billingEmail?: Maybe<Scalars['String']>;
  billingLeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  invitations?: Maybe<Array<Maybe<IOrganizationInvitation>>>;
  isBillingLeader?: Maybe<Scalars['Boolean']>;
  mainBilingLeaderId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  orgMembers?: Maybe<Array<Maybe<IOrgUser>>>;
  orgUserCount?: Maybe<Scalars['Int']>;
  periodStart?: Maybe<Scalars['DateTime']>;
  periodStop?: Maybe<Scalars['DateTime']>;
  picture?: Maybe<Scalars['String']>;
  stripeId?: Maybe<Scalars['String']>;
  stripeSubscriptionId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IOrganization_Input = {
  billingEmail?: Maybe<Scalars['String']>;
  billingLeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  invitations?: Maybe<Array<Maybe<IOrganizationInvitation_Input>>>;
  isBillingLeader?: Maybe<Scalars['Boolean']>;
  mainBilingLeaderId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  orgMembers?: Maybe<Array<Maybe<IOrgUser_Input>>>;
  orgUserCount?: Maybe<Scalars['Int']>;
  periodStart?: Maybe<Scalars['DateTime']>;
  periodStop?: Maybe<Scalars['DateTime']>;
  picture?: Maybe<Scalars['String']>;
  stripeId?: Maybe<Scalars['String']>;
  stripeSubscriptionId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IOrganizationConfiguration = IIConfigurationModel & {
   __typename?: 'OrganizationConfiguration';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  resource: Scalars['URI'];
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IOrganizationConfigValue_Input = {
  section?: Maybe<Scalars['String']>;
  overrides?: Maybe<IConfigurationOverrides_Input>;
};

/** Subscription event for context */
export const enum IOrganizationContextPubSubEvents {
  OrganizationContextUpdated = 'OrganizationContextUpdated',
  OrganizationPolicyUpdated = 'OrganizationPolicyUpdated',
  OrganizationConfigurationUpdated = 'OrganizationConfigurationUpdated',
  OrganizationPermissionUpdated = 'OrganizationPermissionUpdated'
};

export type IOrganizationCreateRequest = {
  billingLeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  invitations?: Maybe<Array<Maybe<IOrganizationInvitation_Input>>>;
  mainBillingLeaderId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  orgMembers?: Maybe<Array<Maybe<IOrgUser_Input>>>;
  periodStart?: Maybe<Scalars['DateTime']>;
  periodStop?: Maybe<Scalars['DateTime']>;
  picture?: Maybe<Scalars['String']>;
  stripeId?: Maybe<Scalars['String']>;
  stripeSubscriptionId?: Maybe<Scalars['String']>;
};

export type IOrganizationData = {
   __typename?: 'OrganizationData';
  /** The unique identifier of the workspace. */
  id: Scalars['String'];
  /** Resources in the organization. */
  resources?: Maybe<Array<Maybe<IOrganizationResourceData>>>;
  /** The location of the organization configuration */
  configuration?: Maybe<Scalars['URI']>;
  /** Organization name */
  name?: Maybe<Scalars['String']>;
};

export type IOrganizationIdentifier = {
   __typename?: 'OrganizationIdentifier';
  id?: Maybe<Scalars['String']>;
  configPath?: Maybe<Scalars['URI']>;
};

export type IOrganizationInvitation = {
   __typename?: 'OrganizationInvitation';
  acceptedAt?: Maybe<Scalars['DateTime']>;
  active?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inviteCount?: Maybe<Scalars['Int']>;
  invitedBy?: Maybe<Scalars['String']>;
  role?: Maybe<IApplicationRoles>;
  teamId?: Maybe<Scalars['String']>;
  tokenExpiration?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IOrganizationInvitation_Input = {
  acceptedAt?: Maybe<Scalars['DateTime']>;
  active?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  inviteCount?: Maybe<Scalars['Int']>;
  invitedBy?: Maybe<Scalars['String']>;
  role?: Maybe<IApplicationRoles>;
  teamId?: Maybe<Scalars['String']>;
  tokenExpiration?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IOrganizationInvitationDecode = {
   __typename?: 'OrganizationInvitationDecode';
  email?: Maybe<Scalars['String']>;
  invitationId?: Maybe<Scalars['String']>;
  invitedBy?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  teamName?: Maybe<Scalars['String']>;
};

export type IOrganizationInvitationRequest = {
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  invitedBy?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
};

export type IOrganizationMember = {
   __typename?: 'OrganizationMember';
  id?: Maybe<Scalars['String']>;
  isBillingLeader?: Maybe<Scalars['Boolean']>;
  organization?: Maybe<IOrganization>;
  user?: Maybe<IAuthUser>;
};

export type IOrganizationNotificationValues = {
  notifyOrgManagersOnUserJoined?: Maybe<Scalars['Boolean']>;
  notifyOrgOwnerOnUserJoined?: Maybe<Scalars['Boolean']>;
};

export type IOrganizationPolicy = IIConfigurationModel & {
   __typename?: 'OrganizationPolicy';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IOrganizationRemoveRequest = {
  orgName?: Maybe<Scalars['String']>;
  requestedUserId?: Maybe<Scalars['String']>;
};

export type IOrganizationResourceConfiguration = IIConfigurationModel & {
   __typename?: 'OrganizationResourceConfiguration';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  resource: Scalars['URI'];
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IOrganizationResourceCreationData_Input = {
  uri: Scalars['URI'];
  name?: Maybe<Scalars['String']>;
};

export type IOrganizationResourceData = {
   __typename?: 'OrganizationResourceData';
  /** The associated URI for this workspace folder. */
  uri?: Maybe<Scalars['URI']>;
  /** The name of this workspace folder. Defaults to the basename its [uri-path](#Uri.path) */
  name?: Maybe<Scalars['String']>;
  /** The ordinal number of this workspace folder. */
  index?: Maybe<Scalars['Int']>;
};

export type IOrganizationResourceSettings = IISettingsSubject & {
   __typename?: 'OrganizationResourceSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<ISettings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings. */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: ISettingsCascade;
};

export type IOrganizationRole = IIConfigurationModel & {
   __typename?: 'OrganizationRole';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IOrganizationSettings = IISettingsSubject & {
   __typename?: 'OrganizationSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<ISettings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings. */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: ISettingsCascade;
};

export type IOrganizationUpdateRequest = {
  id?: Maybe<Scalars['String']>;
  payload?: Maybe<IOrganization_Input>;
  requestedUserId?: Maybe<Scalars['String']>;
};

export type IOrgDetailWhere = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type IOrgMember = {
   __typename?: 'OrgMember';
  _id?: Maybe<Scalars['String']>;
  crossCheckEmail?: Maybe<Scalars['String']>;
  inactive?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<IApplicationRoles>;
  teamNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  userId?: Maybe<Scalars['String']>;
};

export type IOrgUser = IIOrgUser & {
   __typename?: 'OrgUser';
  crossCheckEmail?: Maybe<Scalars['String']>;
  inactive?: Maybe<Scalars['Boolean']>;
  isSelf: Scalars['Boolean'];
  orgName: Scalars['String'];
  role?: Maybe<IApplicationRoles>;
  userId: Scalars['String'];
};

export type IOrgUser_Input = {
  crossCheckEmail?: Maybe<Scalars['String']>;
  inactive?: Maybe<Scalars['Boolean']>;
  role?: Maybe<IApplicationRoles>;
  userId?: Maybe<Scalars['String']>;
};

export const enum IOrgUserRole {
  ADMIN = 'ADMIN',
  BILLING_LEADER = 'BILLING_LEADER',
  MEMBER = 'MEMBER',
  OWNER = 'OWNER'
};

export type IOverrides = {
   __typename?: 'Overrides';
  contents?: Maybe<Scalars['AnyObject']>;
  identifiers?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export const enum IPermissionAction {
  Create = 'Create',
  Delete = 'Delete',
  Edit = 'Edit',
  Invite = 'Invite',
  Manage = 'Manage',
  View = 'View'
};

export const enum IPermissionResource {
  Members = 'Members',
  Organization = 'Organization',
  Permissions = 'Permissions',
  Roles = 'Roles',
  Settings = 'Settings',
  Teams = 'Teams'
};

export type IPermissionSubject = {
   __typename?: 'PermissionSubject';
  /**  The URL to the roles.  */
  roleURL: Scalars['URI'];
  /** The time when this was created. */
  createdAt?: Maybe<Scalars['String']>;
  /** The stringified JSON contents of the permissions. */
  permissions: Scalars['AnyObject'];
};

export const enum IPermissionType {
  Allow = 'Allow',
  Deny = 'Deny',
  NotSet = 'NotSet'
};

export type IPolicySubject = {
   __typename?: 'PolicySubject';
  /**  The URL to the policies.  */
  policyURL: Scalars['URI'];
  /** The time when this was created. */
  createdAt?: Maybe<Scalars['String']>;
  /** The stringified JSON contents of the permissions. */
  policies: Scalars['AnyObject'];
};

export const enum IPortalLanguage {
  English = 'English',
  Gujarati = 'Gujarati',
  Hindi = 'Hindi',
  Russian = 'Russian',
  Spanish = 'Spanish'
};

export type IPosition = {
   __typename?: 'Position';
  line?: Maybe<Scalars['Int']>;
  character?: Maybe<Scalars['Int']>;
};

export const enum IPreDefinedRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MAINTAINER = 'MAINTAINER',
  MEMBER = 'MEMBER',
  PROJECT_ADMIN = 'PROJECT_ADMIN',
  BILLING_LEADER = 'BILLING_LEADER',
  DIRECT_MEMBER = 'DIRECT_MEMBER',
  VIEWER = 'VIEWER',
  GUEST = 'GUEST',
  CONTRIBUTORS = 'CONTRIBUTORS'
};

export type IPreference_Account = {
   __typename?: 'Preference_Account';
  default?: Maybe<IPreference_Default>;
  notification?: Maybe<IPreference_Notification>;
};

export type IPreference_Default = {
   __typename?: 'Preference_Default';
  organization?: Maybe<Scalars['String']>;
};

export type IPreference_Notification = {
   __typename?: 'Preference_Notification';
  billing?: Maybe<Scalars['Boolean']>;
  onChangeAccountSettings?: Maybe<Scalars['Boolean']>;
  primaryEmail?: Maybe<Scalars['String']>;
};

export type IPreference_Organization = {
   __typename?: 'Preference_Organization';
  project?: Maybe<IPreference_Project>;
  teams?: Maybe<IPreference_Teams>;
};

export type IPreference_Project = {
   __typename?: 'Preference_Project';
  tags?: Maybe<Scalars['String']>;
  visibility?: Maybe<Scalars['String']>;
};

export type IPreference_Teams = {
   __typename?: 'Preference_Teams';
  visibility?: Maybe<IVisibility>;
};

export type IPreferenceItem = {
   __typename?: 'PreferenceItem';
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  categoryType?: Maybe<Scalars['String']>;
  settings?: Maybe<Scalars['String']>;
  enum?: Maybe<Array<Maybe<Scalars['String']>>>;
  enumDescriptions?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IPreferences = {
   __typename?: 'Preferences';
  account?: Maybe<IPreference_Account>;
  defaultSetting?: Maybe<Array<Maybe<ISettingsGroup>>>;
  dummy?: Maybe<Scalars['Int']>;
  organization?: Maybe<IPreference_Organization>;
};

export type IPreferencesResponse = {
   __typename?: 'PreferencesResponse';
  preferences?: Maybe<Array<Maybe<IPreferencesType>>>;
};

export type IPreferencesType = {
   __typename?: 'PreferencesType';
  type?: Maybe<Scalars['String']>;
  data?: Maybe<Array<Maybe<IContributionSettings>>>;
};

export type IProject_Output = {
   __typename?: 'Project_Output';
  clientId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  orgName?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IProjectAddRequest = {
  clientId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  orgName?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type IProjects = {
   __typename?: 'Projects';
  clientId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  orgName?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**  Predefined Project template   */
  templateId?: Maybe<Scalars['String']>;
  type?: Maybe<IProjectType>;
  updatedAt?: Maybe<Scalars['String']>;
};

export const enum IProjectType {
  asana = 'asana',
  internal = 'internal',
  others = 'others'
};

export type IQuery = {
   __typename?: 'Query';
  /**  Counter  */
  counter?: Maybe<ICounter>;
  /**  Counter from Datasource  */
  counterCache?: Maybe<ICounter>;
  decodeInvitation?: Maybe<IInvitationDecode>;
  decodeOrganizationInvitation?: Maybe<IOrganizationInvitationDecode>;
  /** Return the permissions groups */
  defaultPermissions?: Maybe<Array<Maybe<ISettingsGroup>>>;
  /** Return the Policies groups */
  defaultPolicies?: Maybe<Array<Maybe<ISettingsGroup>>>;
  /**
   * Default Preferences 
   * @deprecated not used
   */
  defaultPreferences?: Maybe<IPreferencesResponse>;
  defaultSetting?: Maybe<IContributionSettings>;
  /**
   * The default settings for the requested ConfigurationTarget
   * Note: Due to bug in graphql we using  `target: Int` argument instead of  `target:ConfigurationTarget`
   * https://github.com/apollographql/apollo-server/issues/2556
   */
  defaultViewerSettingsSubject: IDefaultSettings;
  dummy?: Maybe<Scalars['Int']>;
  fetchAuth0User?: Maybe<IAuthUser>;
  getAccounts?: Maybe<Array<Maybe<IUserAccount>>>;
  getAsanaConnectionState?: Maybe<IAsanaConnection>;
  getConfiguration?: Maybe<Array<Maybe<IConfiguration>>>;
  getConfigurationData?: Maybe<IConfigurationData>;
  getConfigurationPolicies?: Maybe<Array<Maybe<IConfigurationPolicy>>>;
  getContextProperty?: Maybe<Scalars['AnyObject']>;
  getContributionRoles?: Maybe<Array<Maybe<IContributionRoles>>>;
  getDurationTimeRecords?: Maybe<Array<Maybe<ITimeRecord>>>;
  getDurationTimesheet?: Maybe<ITimesheet>;
  getEnvironment?: Maybe<IEnvironment>;
  getManageableOrganizations?: Maybe<Array<Maybe<IOrganization>>>;
  getOrgInvitationMembers?: Maybe<Array<Maybe<IInviteMember>>>;
  getOrgNameFromContext?: Maybe<IContext>;
  getOrganizationClients?: Maybe<Array<Maybe<IClient>>>;
  getOrganizationConfigValue?: Maybe<Scalars['AnyObject']>;
  getOrganizationDetail?: Maybe<IOrganization>;
  getOrganizationDetailUnsecured?: Maybe<IOrganization>;
  getOrganizationInvitation?: Maybe<IOrganizationInvitation>;
  getOrganizationMembers?: Maybe<Array<Maybe<IOrgMember>>>;
  getOrganizationResourceContext?: Maybe<IOrganizationData>;
  getOrganizationTeams?: Maybe<Array<Maybe<IAccountTeam>>>;
  getPlayingTimeRecord?: Maybe<ITimeRecord>;
  getProjects?: Maybe<Array<Maybe<IProject_Output>>>;
  getRole?: Maybe<IAccessRole>;
  getRoles?: Maybe<Array<Maybe<IAccessRole>>>;
  getScheduleEvents?: Maybe<Array<Maybe<ISchedule>>>;
  getTeam?: Maybe<IAccountTeam>;
  getTimeRecords?: Maybe<Array<Maybe<ITimeRecord>>>;
  getTimelineEvents?: Maybe<Array<Maybe<ITimeline>>>;
  getTimesheets?: Maybe<Array<Maybe<ITimesheet>>>;
  getUserAccount?: Maybe<IUserAccount>;
  getUserOrganizations?: Maybe<Array<Maybe<IOrganization>>>;
  getUserOrganizationsWithRole?: Maybe<Array<Maybe<IOrganization>>>;
  getUsers?: Maybe<Array<Maybe<IUserAccount>>>;
  /** Get the available roles and its descriptions */
  getViewerPermissions?: Maybe<IPermissionSubject>;
  /** Get the available policies and its descriptions */
  getViewerPolicies?: Maybe<IPolicySubject>;
  /** Shortcut way to send merged defautPermissions with applicaiton role's permission. */
  mergedApplicationPermissions?: Maybe<Array<Maybe<IContributionSettings>>>;
  /**  Moleculer Counter  */
  moleculerCounter?: Maybe<ICounter>;
  organizations?: Maybe<Array<Maybe<IOrganization>>>;
  team?: Maybe<IAccountTeam>;
  teamInvitation: ITeamInvitation;
  teams?: Maybe<Array<Maybe<IAccountTeam>>>;
  /**
   * The settings for the viewer. The viewer is either an anonymous visitor (in which case viewer settings is
   * global settings) or an authenticated user (in which case viewer settings are the user's settings).
   */
  viewerSettings: IViewerSettingsSubject;
};


export type IQuerydecodeInvitationArgs = {
  token: Scalars['String'];
};


export type IQuerydecodeOrganizationInvitationArgs = {
  token: Scalars['String'];
};


export type IQuerydefaultPermissionsArgs = {
  target?: Maybe<Scalars['Int']>;
};


export type IQuerydefaultPoliciesArgs = {
  target?: Maybe<Scalars['Int']>;
};


export type IQuerydefaultViewerSettingsSubjectArgs = {
  target?: Maybe<Scalars['Int']>;
};


export type IQueryfetchAuth0UserArgs = {
  auth0UserId: Scalars['String'];
};


export type IQuerygetAccountsArgs = {
  where?: Maybe<IUserAccountWhere>;
};


export type IQuerygetConfigurationArgs = {
  input?: Maybe<Array<Maybe<IConfigurationInput>>>;
};


export type IQuerygetConfigurationPoliciesArgs = {
  input?: Maybe<Array<Maybe<IConfigurationInput>>>;
};


export type IQuerygetContextPropertyArgs = {
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type IQuerygetDurationTimeRecordsArgs = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
};


export type IQuerygetDurationTimesheetArgs = {
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
};


export type IQuerygetOrganizationConfigValueArgs = {
  value?: Maybe<IOrganizationConfigValue_Input>;
};


export type IQuerygetOrganizationDetailArgs = {
  where: IOrgDetailWhere;
};


export type IQuerygetOrganizationDetailUnsecuredArgs = {
  where: IOrgDetailWhere;
};


export type IQuerygetOrganizationInvitationArgs = {
  id: Scalars['ID'];
};


export type IQuerygetOrganizationResourceContextArgs = {
  orgId?: Maybe<Scalars['String']>;
};


export type IQuerygetOrganizationTeamsArgs = {
  orgName?: Maybe<Scalars['String']>;
};


export type IQuerygetRoleArgs = {
  input?: Maybe<IRoleInput>;
};


export type IQuerygetRolesArgs = {
  input?: Maybe<Array<Maybe<IRoleInput>>>;
};


export type IQuerygetScheduleEventsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type IQuerygetTeamArgs = {
  orgName: Scalars['String'];
  teamName: Scalars['String'];
};


export type IQuerygetTimelineEventsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type IQuerygetTimesheetsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type IQuerygetUserAccountArgs = {
  userId: Scalars['String'];
};


export type IQuerygetUserOrganizationsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type IQuerygetUserOrganizationsWithRoleArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type IQuerygetUsersArgs = {
  where?: Maybe<IUserAccountWhere>;
};


export type IQuerygetViewerPermissionsArgs = {
  input?: Maybe<IRoleInput>;
};


export type IQuerygetViewerPoliciesArgs = {
  input?: Maybe<IConfigurationInput>;
};


export type IQuerymergedApplicationPermissionsArgs = {
  roleName?: Maybe<Scalars['String']>;
};


export type IQueryteamArgs = {
  teamId: Scalars['ID'];
};


export type IQueryteamInvitationArgs = {
  id: Scalars['ID'];
};


export type IQueryviewerSettingsArgs = {
  input?: Maybe<IViewerSettingsInput>;
};

export type IRange = {
   __typename?: 'Range';
  /**
   * @lsp
   * The range's start position.
   */
  start?: Maybe<IPosition>;
  /**
   * @lsp
   * The range's end position.
   */
  end?: Maybe<IPosition>;
  /** @editor - Line number on which the range starts (starts at 1). */
  startLineNumber?: Maybe<Scalars['Int']>;
  /** @editor - Column on which the range starts in the line `startLineNumber` (starts at 1). */
  startColumn?: Maybe<Scalars['Int']>;
  /** @editor - Line number on which the range ends. */
  endLineNumber?: Maybe<Scalars['Int']>;
  /** @editor - Column on which the range ends in the line `endLineNumber` */
  endColumn?: Maybe<Scalars['Int']>;
};

export type IRemoteUserSettings = IISettingsSubject & {
   __typename?: 'RemoteUserSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<ISettings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings. */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: ISettingsCascade;
};

export type IResourcePolicy = IIConfigurationModel & {
   __typename?: 'ResourcePolicy';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IResourceRole = IIConfigurationModel & {
   __typename?: 'ResourceRole';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IResourceUser = IIResourceUserRole & {
   __typename?: 'ResourceUser';
  role?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  isSelf?: Maybe<Scalars['Boolean']>;
  orgName?: Maybe<Scalars['String']>;
};

export const enum IRole {
  ADMIN = 'ADMIN',
  REVIEWER = 'REVIEWER',
  USER = 'USER',
  UNKNOWN = 'UNKNOWN'
};

export type IRoleInput = {
  target: Scalars['Int'];
  resource?: Maybe<Scalars['URIInput']>;
  roleName?: Maybe<Scalars['String']>;
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

/** Settings is a version of a configuration settings file. */
export type ISettings = {
   __typename?: 'Settings';
  /** The time when this was created.  */
  createdAt?: Maybe<Scalars['String']>;
  /**
   * The stringified JSON contents of the settings. The contents may include "//"-style comments and trailing
   * commas in the JSON.
   */
  contents: Scalars['String'];
};

/** The configuration for all of the relevant settings subjects, plus the merged settings. */
export type ISettingsCascade = {
   __typename?: 'SettingsCascade';
  /**
   * The other settings subjects that are applied with lower precedence that this subject to
   * form the final merged settings. For example, a user in 2 organizations would have the following
   * settings subjects: site (global settings), org 1, org 2 and the user.
   */
  subjects?: Maybe<Array<Maybe<ISettingsSubject>>>;
  /** The effective final merged settings as (stringified) JSON, merged from all of the subjects. */
  final?: Maybe<Scalars['String']>;
  /** The effective final merged settings as Object, merged from all of the subjects. */
  finalConfiguration?: Maybe<IPreferences>;
};

export type ISettingsGroup = {
   __typename?: 'SettingsGroup';
  id?: Maybe<Scalars['String']>;
  range?: Maybe<IRange>;
  title?: Maybe<Scalars['String']>;
  titleRange?: Maybe<IRange>;
  sections?: Maybe<Array<Maybe<ISettingsSection>>>;
  contributedByExtension?: Maybe<Scalars['Boolean']>;
};

export type ISettingsSection = {
   __typename?: 'SettingsSection';
  titleRange?: Maybe<IRange>;
  title?: Maybe<Scalars['String']>;
  settings?: Maybe<Array<Maybe<IContributionSettings>>>;
};

export type ISettingsSubject = IUserSettings | ILocalUserSettings | IRemoteUserSettings | IOrganizationResourceSettings | IGlobalSettings | IOrganizationSettings | IMemorySettings | IDefaultSettings;

export const enum ISettingValueType {
  Null = 'Null',
  Enum = 'Enum',
  String = 'String',
  Integer = 'Integer',
  Number = 'Number',
  Boolean = 'Boolean',
  Exclude = 'Exclude',
  Complex = 'Complex',
  NullableInteger = 'NullableInteger',
  NullableNumber = 'NullableNumber'
};

export type ISocialConnect = {
   __typename?: 'SocialConnect';
  facebook?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
};

export type ISocialConnect_Input = {
  facebook?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
};

export type ISubscribedOrganizationData = {
   __typename?: 'SubscribedOrganizationData';
  /** Resources in the organization. */
  resources?: Maybe<Array<Maybe<IOrganizationResourceData>>>;
  orgNameFilter?: Maybe<Scalars['String']>;
};

export type ISubscription = {
   __typename?: 'Subscription';
  SubscribeToConfigurationUpdate?: Maybe<IConfigurationUpdateEvent>;
  SubscribeToOrganizationContext?: Maybe<ISubscribedOrganizationData>;
  SubscribeToPermissionUpdate?: Maybe<IConfigurationUpdateEvent>;
  SubscribeToPolicyUpdate?: Maybe<IConfigurationUpdateEvent>;
  /**  Subscription fired when anyone increases counter  */
  counterUpdated?: Maybe<ICounter>;
  dummy?: Maybe<Scalars['Int']>;
  moleculerCounterUpdate?: Maybe<ICounter>;
};


export type ISubscriptionSubscribeToConfigurationUpdateArgs = {
  orgName: Scalars['String'];
};


export type ISubscriptionSubscribeToOrganizationContextArgs = {
  orgNameFilter?: Maybe<Scalars['String']>;
};


export type ISubscriptionSubscribeToPermissionUpdateArgs = {
  orgName?: Maybe<Scalars['String']>;
};


export type ISubscriptionSubscribeToPolicyUpdateArgs = {
  orgName?: Maybe<Scalars['String']>;
};

export type ITeamCreateRequest = {
  description?: Maybe<Scalars['String']>;
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  invitation?: Maybe<ITeamInvitation_Input>;
  name: Scalars['String'];
  orgName: Scalars['String'];
  parentTeam?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  teamMembers?: Maybe<Array<Maybe<ITeamMember_Input>>>;
};

export type ITeamCreationRequest = {
  description?: Maybe<Scalars['String']>;
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  name: Scalars['String'];
  orgName: Scalars['String'];
  parentTeam?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/**
 * Inivitation to become a team member.
 * You may invite a user to your team either by ther `username` (only for
 * verified users) or by their email. If you opt to invite by email then an email
 * will be sent to this person containing a code that they need to accept the
 * invitation. If the person doesn't already have an account they will be
 * instructed to create one; their account need not have the email address that
 * you invited listed as the secret code is confirmation enough.
 * @property
 * email: The email of the inventee
 * @property
 * fullName: The name of the invitee, derived from an RFC5322 email string
 * @property
 * invitedBy: The teamMemberId of the person that sent the invitation
 * @property
 * teamId: The team invited to
 * @property
 * tokenExpiration: The datestamp of when the invitation will expire.
 * @property
 * inviteCount: How many invites have been sent to this email address?
 * @property
 * acceptedAt: The datetime the invitation was accepted.
 * @property
 * createdAt: The datetime the invitation was created.
 * @property
 * updatedAt: The datetime the invitation was last updated.
 */
export type ITeamInvitation = {
   __typename?: 'TeamInvitation';
  acceptedAt?: Maybe<Scalars['DateTime']>;
  active?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inviteCount?: Maybe<Scalars['Int']>;
  invitedBy?: Maybe<Scalars['String']>;
  role?: Maybe<IApplicationRoles>;
  teamId?: Maybe<Scalars['String']>;
  tokenExpiration?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/**  The output of our `acceptInvitationToTeam`.  */
export type ITeamInvitation_Input = {
  acceptedAt?: Maybe<Scalars['DateTime']>;
  active?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  inviteCount?: Maybe<Scalars['Int']>;
  invitedBy?: Maybe<Scalars['String']>;
  role?: Maybe<IApplicationRoles>;
  teamId?: Maybe<Scalars['String']>;
  tokenExpiration?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ITeamInvitationRequest = {
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  invitedBy?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
};

/** TeamMember: A member of a team. */
export type ITeamMember = {
   __typename?: 'TeamMember';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<IApplicationRoles>;
  userId?: Maybe<Scalars['String']>;
};

export type ITeamMember_Input = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  role?: Maybe<IApplicationRoles>;
  userId?: Maybe<Scalars['String']>;
};

export type ITeamRemoveRequest = {
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  invitedBy?: Maybe<Scalars['String']>;
  requestedUserId?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
};

export type ITeamUpdateRequest = {
  id: Scalars['String'];
  payload?: Maybe<IAccountTeam_Input>;
  requestedUserId?: Maybe<Scalars['String']>;
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
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  state?: Maybe<ITimesheetState>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
  updatedOn?: Maybe<Scalars['DateTime']>;
};

export type ITimesheetCreateRequest = {
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
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

export type IUpdatedClient_Input = {
  clientPhone?: Maybe<IClientPhone_Input>;
  companyName?: Maybe<Scalars['String']>;
  currency: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  orgName?: Maybe<Scalars['String']>;
  socialConnect?: Maybe<ISocialConnect_Input>;
  website?: Maybe<Scalars['String']>;
};

export type IUpdateProject_Input = {
  clientId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  teams?: Maybe<Array<Maybe<Scalars['String']>>>;
};



/**
 * The User Account.
 * 
 * @property
 * id: User ID
 * @property
 * email: The user email
 * @property
 * emailVerified: ture if email is verified, otherwise false
 * @property
 * featureFlags: Any super power given to the user via a super user
 * @property
 * identities: An array of objects with information about the user's identities.
 * More than one will exists in case accounts are linked.
 * @property
 * inactive: true if the user is not currently being billed for service.
 * @property
 * isBillingLeader: true if user is BillingLeader
 * @property
 * userOgs: the orgs and roles for this user on each.
 */
export type IUserAccount = {
   __typename?: 'UserAccount';
  alias?: Maybe<Array<Maybe<Scalars['String']>>>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  notificationEmail?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type IUserAccount_Input = {
  alias?: Maybe<Array<Maybe<Scalars['String']>>>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type IUserAccountCreatedDetailedEvent = {
   __typename?: 'UserAccountCreatedDetailedEvent';
  alias?: Maybe<Array<Maybe<Scalars['String']>>>;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  notificationEmail?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type IUserAccountCreatedEvent = {
   __typename?: 'UserAccountCreatedEvent';
  createdUser?: Maybe<IUserAccountCreatedDetailedEvent>;
  sourceUser?: Maybe<IAuthUserRaw>;
};

export type IUserAccountCreateRequest = {
  alias?: Maybe<Array<Maybe<Scalars['String']>>>;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['Boolean']>;
  notificationEmail?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type IUserAccountRemovedEvent = {
   __typename?: 'UserAccountRemovedEvent';
  email: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  notificationEmail?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type IUserAccountRemoveRequest = {
  id?: Maybe<Scalars['String']>;
};

export type IUserAccountUpdateRequest = {
  id: Scalars['String'];
  paylaod?: Maybe<IUserAccount_Input>;
};

export type IUserAccountWhere = {
  alias?: Maybe<Array<Maybe<Scalars['String']>>>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type IUserConfiguration = IIConfigurationModel & {
   __typename?: 'UserConfiguration';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /** The URL to the user's settings. */
  resource: Scalars['URI'];
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<IOverrides>>>;
};

export type IUserInfo = {
  email?: Maybe<Scalars['String']>;
  sub?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  user_name?: Maybe<Scalars['String']>;
  phone_number?: Maybe<Scalars['String']>;
  work_email?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  company_name?: Maybe<Scalars['String']>;
};

export const enum IUserOrderBy {
  auth0UserId_ASC = 'auth0UserId_ASC',
  auth0UserId_DESC = 'auth0UserId_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  emailSubscription_ASC = 'emailSubscription_ASC',
  emailSubscription_DESC = 'emailSubscription_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
};

/** The user/org M:F join, denormalized on the user/org tables. */
export type IUserOrg = {
   __typename?: 'UserOrg';
  inactive?: Maybe<Scalars['Boolean']>;
  role?: Maybe<IApplicationRoles>;
  userId: Scalars['String'];
};

export type IUserOrg_Input = {
  inactive?: Maybe<Scalars['Boolean']>;
  role?: Maybe<IApplicationRoles>;
  userId: Scalars['String'];
};

export type IUserPreviousValues = {
   __typename?: 'UserPreviousValues';
  auth0UserId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  emailSubscription?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type IUserProfile = IIAuth0UserProfile & {
   __typename?: 'UserProfile';
  name: Scalars['String'];
  nickname: Scalars['String'];
  picture: Scalars['String'];
  user_id: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  given_name?: Maybe<Scalars['String']>;
  family_name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_verified?: Maybe<Scalars['Boolean']>;
  clientID: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
  sub: Scalars['String'];
  user_metadata?: Maybe<Scalars['AnyObject']>;
  app_metadata?: Maybe<Scalars['AnyObject']>;
};

/** UserSettings is a combination of LocalUserSettings and RemoteUserSettings */
export type IUserSettings = IISettingsSubject & {
   __typename?: 'UserSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**
   * The latest settings for the user.
   * 
   * Only the user and site admins can access this field.
   */
  latestSettings?: Maybe<ISettings>;
  /** The URL to the user's settings. */
  settingsURL: Scalars['URI'];
  /**
   * Whether the viewer has admin privileges on this user. The user has admin privileges on their own user, and
   * site admins have admin privileges on all users.
   */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this user, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   * 
   * Only the user and site admins can access this field.
   */
  settingsCascade: ISettingsCascade;
};

export type IUserState = {
   __typename?: 'UserState';
  id?: Maybe<Scalars['String']>;
  auth0UserId?: Maybe<Scalars['String']>;
  profile?: Maybe<IUserProfile>;
  isProfileFetching?: Maybe<Scalars['Boolean']>;
  isTokenExpired?: Maybe<Scalars['Boolean']>;
  isLoggingInToProceed?: Maybe<Scalars['Boolean']>;
  loginError?: Maybe<ILoginError>;
};

export type IViewerSettingsInput = {
  target: Scalars['Int'];
  /**
   * To get the Resource or Organization resource of which we need to get the settings.
   * If we pass the <resource> URI, we can construct the orgUri in background to merge as a parent
   * configuration to the resource configuration.
   */
  settingsResource?: Maybe<Scalars['URI']>;
  /**
   * User resource to identify the core user settings. 
   * For guest user, we don't have to define it.
   */
  userResource?: Maybe<Scalars['URI']>;
};

export type IViewerSettingsSubject = {
   __typename?: 'ViewerSettingsSubject';
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /** Graphql typed settings */
  settings?: Maybe<IPreferences>;
};

export const enum IVisibility {
  private = 'private',
  public = 'public'
};

export type IOrgNameInContextFragment = (
  { __typename?: 'Context' }
  & Pick<IContext, 'orgName'>
);

export type IGetOrgNameFromContextQueryVariables = {};


export type IGetOrgNameFromContextQuery = (
  { __typename?: 'Query' }
  & { getOrgNameFromContext?: Maybe<(
    { __typename?: 'Context' }
    & IOrgNameInContextFragment
  )> }
);

export const OrgNameInContextFragmentDoc = gql`
    fragment OrgNameInContext on Context {
  orgName
}
    `;
export const GetOrgNameFromContextDocument = gql`
    query GetOrgNameFromContext {
  getOrgNameFromContext @client {
    ...OrgNameInContext
  }
}
    ${OrgNameInContextFragmentDoc}`;
export type GetOrgNameFromContextQueryResult = ApolloReactCommon.QueryResult<IGetOrgNameFromContextQuery, IGetOrgNameFromContextQueryVariables>;


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
  InvitationDecode: ResolverTypeWrapper<IInvitationDecode>,
  OrganizationInvitationDecode: ResolverTypeWrapper<IOrganizationInvitationDecode>,
  SettingsGroup: ResolverTypeWrapper<ISettingsGroup>,
  Range: ResolverTypeWrapper<IRange>,
  Position: ResolverTypeWrapper<IPosition>,
  SettingsSection: ResolverTypeWrapper<ISettingsSection>,
  ContributionSettings: ResolverTypeWrapper<IContributionSettings>,
  AnyObject: ResolverTypeWrapper<Scalars['AnyObject']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ConfigurationScope: IConfigurationScope,
  ConfigurationExtensionInfo: ResolverTypeWrapper<IConfigurationExtensionInfo>,
  PreferencesResponse: ResolverTypeWrapper<IPreferencesResponse>,
  PreferencesType: ResolverTypeWrapper<IPreferencesType>,
  DefaultSettings: ResolverTypeWrapper<IDefaultSettings>,
  ISettingsSubject: IResolversTypes['DefaultSettings'] | IResolversTypes['UserSettings'] | IResolversTypes['LocalUserSettings'] | IResolversTypes['RemoteUserSettings'] | IResolversTypes['OrganizationResourceSettings'] | IResolversTypes['GlobalSettings'] | IResolversTypes['OrganizationSettings'] | IResolversTypes['MemorySettings'],
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Settings: ResolverTypeWrapper<ISettings>,
  URI: ResolverTypeWrapper<Scalars['URI']>,
  SettingsCascade: ResolverTypeWrapper<Omit<ISettingsCascade, 'subjects'> & { subjects?: Maybe<Array<Maybe<IResolversTypes['SettingsSubject']>>> }>,
  SettingsSubject: IResolversTypes['UserSettings'] | IResolversTypes['LocalUserSettings'] | IResolversTypes['RemoteUserSettings'] | IResolversTypes['OrganizationResourceSettings'] | IResolversTypes['GlobalSettings'] | IResolversTypes['OrganizationSettings'] | IResolversTypes['MemorySettings'] | IResolversTypes['DefaultSettings'],
  UserSettings: ResolverTypeWrapper<IUserSettings>,
  LocalUserSettings: ResolverTypeWrapper<ILocalUserSettings>,
  RemoteUserSettings: ResolverTypeWrapper<IRemoteUserSettings>,
  OrganizationResourceSettings: ResolverTypeWrapper<IOrganizationResourceSettings>,
  GlobalSettings: ResolverTypeWrapper<IGlobalSettings>,
  OrganizationSettings: ResolverTypeWrapper<IOrganizationSettings>,
  MemorySettings: ResolverTypeWrapper<IMemorySettings>,
  Preferences: ResolverTypeWrapper<IPreferences>,
  Preference_Account: ResolverTypeWrapper<IPreference_Account>,
  Preference_Default: ResolverTypeWrapper<IPreference_Default>,
  Preference_Notification: ResolverTypeWrapper<IPreference_Notification>,
  Preference_Organization: ResolverTypeWrapper<IPreference_Organization>,
  Preference_Project: ResolverTypeWrapper<IPreference_Project>,
  Preference_Teams: ResolverTypeWrapper<IPreference_Teams>,
  Visibility: IVisibility,
  AuthUser: ResolverTypeWrapper<IAuthUser>,
  IUser: IResolversTypes['AuthUser'],
  UserAccountWhere: IUserAccountWhere,
  UserAccount: ResolverTypeWrapper<IUserAccount>,
  AsanaConnection: ResolverTypeWrapper<IAsanaConnection>,
  AsanaConnectionState: ResolverTypeWrapper<IAsanaConnectionState>,
  AsanaUser: ResolverTypeWrapper<IAsanaUser>,
  ConfigurationInput: IConfigurationInput,
  URIInput: ResolverTypeWrapper<Scalars['URIInput']>,
  Configuration: IResolversTypes['DefaultConfiguration'] | IResolversTypes['UserConfiguration'] | IResolversTypes['OrganizationConfiguration'] | IResolversTypes['OrganizationResourceConfiguration'],
  DefaultConfiguration: ResolverTypeWrapper<IDefaultConfiguration>,
  IConfigurationModel: IResolversTypes['DefaultConfiguration'] | IResolversTypes['UserConfiguration'] | IResolversTypes['OrganizationConfiguration'] | IResolversTypes['OrganizationResourceConfiguration'] | IResolversTypes['DefaultPolicy'] | IResolversTypes['OrganizationPolicy'] | IResolversTypes['ResourcePolicy'] | IResolversTypes['ApplicationPolicy'] | IResolversTypes['DefaultRole'] | IResolversTypes['OrganizationRole'] | IResolversTypes['ResourceRole'] | IResolversTypes['ApplicationRolePermission'],
  Overrides: ResolverTypeWrapper<IOverrides>,
  UserConfiguration: ResolverTypeWrapper<IUserConfiguration>,
  OrganizationConfiguration: ResolverTypeWrapper<IOrganizationConfiguration>,
  OrganizationResourceConfiguration: ResolverTypeWrapper<IOrganizationResourceConfiguration>,
  ConfigurationData: ResolverTypeWrapper<IConfigurationData>,
  ConfigurationPolicy: IResolversTypes['DefaultPolicy'] | IResolversTypes['OrganizationPolicy'] | IResolversTypes['ResourcePolicy'] | IResolversTypes['ApplicationPolicy'],
  DefaultPolicy: ResolverTypeWrapper<IDefaultPolicy>,
  OrganizationPolicy: ResolverTypeWrapper<IOrganizationPolicy>,
  ResourcePolicy: ResolverTypeWrapper<IResourcePolicy>,
  ApplicationPolicy: ResolverTypeWrapper<IApplicationPolicy>,
  ContributionRoles: ResolverTypeWrapper<Omit<IContributionRoles, 'permissions'> & { permissions?: Maybe<IResolversTypes['AccessRole']> }>,
  AccessRole: IResolversTypes['DefaultRole'] | IResolversTypes['OrganizationRole'] | IResolversTypes['ResourceRole'] | IResolversTypes['ApplicationRolePermission'],
  DefaultRole: ResolverTypeWrapper<IDefaultRole>,
  OrganizationRole: ResolverTypeWrapper<IOrganizationRole>,
  ResourceRole: ResolverTypeWrapper<IResourceRole>,
  ApplicationRolePermission: ResolverTypeWrapper<IApplicationRolePermission>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  TimeRecord: ResolverTypeWrapper<ITimeRecord>,
  Timesheet: ResolverTypeWrapper<ITimesheet>,
  TimesheetState: ITimesheetState,
  Environment: ResolverTypeWrapper<IEnvironment>,
  Organization: ResolverTypeWrapper<IOrganization>,
  OrganizationInvitation: ResolverTypeWrapper<IOrganizationInvitation>,
  ApplicationRoles: IApplicationRoles,
  OrgUser: ResolverTypeWrapper<IOrgUser>,
  IOrgUser: IResolversTypes['OrgUser'],
  InviteMember: ResolverTypeWrapper<IInviteMember>,
  InviteStatus: IInviteStatus,
  Context: ResolverTypeWrapper<IContext>,
  Client: ResolverTypeWrapper<IClient>,
  ClientPhone: ResolverTypeWrapper<IClientPhone>,
  SocialConnect: ResolverTypeWrapper<ISocialConnect>,
  OrganizationConfigValue_Input: IOrganizationConfigValue_Input,
  ConfigurationOverrides_Input: IConfigurationOverrides_Input,
  OrgDetailWhere: IOrgDetailWhere,
  OrgMember: ResolverTypeWrapper<IOrgMember>,
  OrganizationData: ResolverTypeWrapper<IOrganizationData>,
  OrganizationResourceData: ResolverTypeWrapper<IOrganizationResourceData>,
  AccountTeam: ResolverTypeWrapper<IAccountTeam>,
  TeamInvitation: ResolverTypeWrapper<ITeamInvitation>,
  TeamMember: ResolverTypeWrapper<ITeamMember>,
  Project_Output: ResolverTypeWrapper<IProject_Output>,
  RoleInput: IRoleInput,
  Schedule: ResolverTypeWrapper<ISchedule>,
  Timeline: ResolverTypeWrapper<ITimeline>,
  PermissionSubject: ResolverTypeWrapper<IPermissionSubject>,
  PolicySubject: ResolverTypeWrapper<IPolicySubject>,
  ViewerSettingsInput: IViewerSettingsInput,
  ViewerSettingsSubject: ResolverTypeWrapper<IViewerSettingsSubject>,
  Mutation: ResolverTypeWrapper<{}>,
  AcceptInvitationToTeam_Input: IAcceptInvitationToTeam_Input,
  OrganizationNotificationValues: IOrganizationNotificationValues,
  ClientAddRequest: IClientAddRequest,
  ClientPhone_Input: IClientPhone_Input,
  SocialConnect_Input: ISocialConnect_Input,
  ProjectAddRequest: IProjectAddRequest,
  ScheduleCreateRequest: IScheduleCreateRequest,
  TimelineCreateRequest: ITimelineCreateRequest,
  AuthProvider: IAuthProvider,
  IdToken: IIdToken,
  UserInfo: IUserInfo,
  OrganizationCreateRequest: IOrganizationCreateRequest,
  OrganizationInvitation_Input: IOrganizationInvitation_Input,
  OrgUser_Input: IOrgUser_Input,
  TeamCreationRequest: ITeamCreationRequest,
  TimeRecordRequest: ITimeRecordRequest,
  TimesheetCreateRequest: ITimesheetCreateRequest,
  OrganizationRemoveRequest: IOrganizationRemoveRequest,
  TeamInvitationRequest: ITeamInvitationRequest,
  OrganizationInvitationRequest: IOrganizationInvitationRequest,
  ClientUpdateRequest: IClientUpdateRequest,
  UpdatedClient_Input: IUpdatedClient_Input,
  UpdateProject_Input: IUpdateProject_Input,
  OrganizationUpdateRequest: IOrganizationUpdateRequest,
  Organization_Input: IOrganization_Input,
  OrganizationResourceCreationData_Input: IOrganizationResourceCreationData_Input,
  Subscription: ResolverTypeWrapper<{}>,
  ConfigurationUpdateEvent: ResolverTypeWrapper<IConfigurationUpdateEvent>,
  ConfigurationOverrides: ResolverTypeWrapper<IConfigurationOverrides>,
  SubscribedOrganizationData: ResolverTypeWrapper<ISubscribedOrganizationData>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Time: ResolverTypeWrapper<Scalars['Time']>,
  JSON: ResolverTypeWrapper<Scalars['JSON']>,
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>,
  FieldError: ResolverTypeWrapper<IFieldError>,
  ConfigCollectionName: IConfigCollectionName,
  ConfigFragmentName: IConfigFragmentName,
  KeyPathSegment: IKeyPathSegment,
  PreferenceItem: ResolverTypeWrapper<IPreferenceItem>,
  IConfigurationChangeEvent: ResolverTypeWrapper<Omit<IIConfigurationChangeEvent, 'changedConfiguration'> & { changedConfiguration?: Maybe<IResolversTypes['Configuration']> }>,
  ConfigurationTarget: IConfigurationTarget,
  ConfigurationModel: ResolverTypeWrapper<IConfigurationModel>,
  SettingValueType: ISettingValueType,
  OrganizationIdentifier: ResolverTypeWrapper<IOrganizationIdentifier>,
  OrganizationContextPubSubEvents: IOrganizationContextPubSubEvents,
  PermissionType: IPermissionType,
  PermissionAction: IPermissionAction,
  PermissionResource: IPermissionResource,
  PreDefinedRole: IPreDefinedRole,
  IResourceUserRole: IResolversTypes['ResourceUser'],
  ResourceUser: ResolverTypeWrapper<IResourceUser>,
  EnvironmentPayload: IEnvironmentPayload,
  IAuth0UserProfile: IResolversTypes['UserProfile'],
  UserProfile: ResolverTypeWrapper<IUserProfile>,
  LoginError: ResolverTypeWrapper<ILoginError>,
  UserState: ResolverTypeWrapper<IUserState>,
  Role: IRole,
  IAuthUser: IResolversTypes['AuthUserRaw'],
  AuthUserRaw: ResolverTypeWrapper<IAuthUserRaw>,
  AuthUser_Input: IAuthUser_Input,
  UserPreviousValues: ResolverTypeWrapper<IUserPreviousValues>,
  UserOrderBy: IUserOrderBy,
  TimeTracker: ResolverTypeWrapper<ITimeTracker>,
  UserAccountCreateRequest: IUserAccountCreateRequest,
  UserAccountCreatedEvent: ResolverTypeWrapper<IUserAccountCreatedEvent>,
  UserAccountCreatedDetailedEvent: ResolverTypeWrapper<IUserAccountCreatedDetailedEvent>,
  UserAccount_Input: IUserAccount_Input,
  UserAccountUpdateRequest: IUserAccountUpdateRequest,
  UserAccountRemoveRequest: IUserAccountRemoveRequest,
  UserAccountRemovedEvent: ResolverTypeWrapper<IUserAccountRemovedEvent>,
  AccountTeam_Input: IAccountTeam_Input,
  TeamInvitation_Input: ITeamInvitation_Input,
  TeamMember_Input: ITeamMember_Input,
  TeamRemoveRequest: ITeamRemoveRequest,
  TeamUpdateRequest: ITeamUpdateRequest,
  TeamCreateRequest: ITeamCreateRequest,
  OrgainizationInvitationRole: IOrgainizationInvitationRole,
  OrgUserRole: IOrgUserRole,
  UserOrg: ResolverTypeWrapper<IUserOrg>,
  UserOrg_Input: IUserOrg_Input,
  OrganizationMember: ResolverTypeWrapper<IOrganizationMember>,
  ClientTypes: IClientTypes,
  PortalLanguage: IPortalLanguage,
  Projects: ResolverTypeWrapper<IProjects>,
  ProjectType: IProjectType,
  ClientCacheTypeNames: IClientCacheTypeNames,
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {},
  Counter: ICounter,
  Int: Scalars['Int'],
  String: Scalars['String'],
  InvitationDecode: IInvitationDecode,
  OrganizationInvitationDecode: IOrganizationInvitationDecode,
  SettingsGroup: ISettingsGroup,
  Range: IRange,
  Position: IPosition,
  SettingsSection: ISettingsSection,
  ContributionSettings: IContributionSettings,
  AnyObject: Scalars['AnyObject'],
  Boolean: Scalars['Boolean'],
  ConfigurationScope: IConfigurationScope,
  ConfigurationExtensionInfo: IConfigurationExtensionInfo,
  PreferencesResponse: IPreferencesResponse,
  PreferencesType: IPreferencesType,
  DefaultSettings: IDefaultSettings,
  ISettingsSubject: IResolversParentTypes['DefaultSettings'] | IResolversParentTypes['UserSettings'] | IResolversParentTypes['LocalUserSettings'] | IResolversParentTypes['RemoteUserSettings'] | IResolversParentTypes['OrganizationResourceSettings'] | IResolversParentTypes['GlobalSettings'] | IResolversParentTypes['OrganizationSettings'] | IResolversParentTypes['MemorySettings'],
  ID: Scalars['ID'],
  Settings: ISettings,
  URI: Scalars['URI'],
  SettingsCascade: Omit<ISettingsCascade, 'subjects'> & { subjects?: Maybe<Array<Maybe<IResolversParentTypes['SettingsSubject']>>> },
  SettingsSubject: IResolversParentTypes['UserSettings'] | IResolversParentTypes['LocalUserSettings'] | IResolversParentTypes['RemoteUserSettings'] | IResolversParentTypes['OrganizationResourceSettings'] | IResolversParentTypes['GlobalSettings'] | IResolversParentTypes['OrganizationSettings'] | IResolversParentTypes['MemorySettings'] | IResolversParentTypes['DefaultSettings'],
  UserSettings: IUserSettings,
  LocalUserSettings: ILocalUserSettings,
  RemoteUserSettings: IRemoteUserSettings,
  OrganizationResourceSettings: IOrganizationResourceSettings,
  GlobalSettings: IGlobalSettings,
  OrganizationSettings: IOrganizationSettings,
  MemorySettings: IMemorySettings,
  Preferences: IPreferences,
  Preference_Account: IPreference_Account,
  Preference_Default: IPreference_Default,
  Preference_Notification: IPreference_Notification,
  Preference_Organization: IPreference_Organization,
  Preference_Project: IPreference_Project,
  Preference_Teams: IPreference_Teams,
  Visibility: IVisibility,
  AuthUser: IAuthUser,
  IUser: IResolversParentTypes['AuthUser'],
  UserAccountWhere: IUserAccountWhere,
  UserAccount: IUserAccount,
  AsanaConnection: IAsanaConnection,
  AsanaConnectionState: IAsanaConnectionState,
  AsanaUser: IAsanaUser,
  ConfigurationInput: IConfigurationInput,
  URIInput: Scalars['URIInput'],
  Configuration: IResolversParentTypes['DefaultConfiguration'] | IResolversParentTypes['UserConfiguration'] | IResolversParentTypes['OrganizationConfiguration'] | IResolversParentTypes['OrganizationResourceConfiguration'],
  DefaultConfiguration: IDefaultConfiguration,
  IConfigurationModel: IResolversParentTypes['DefaultConfiguration'] | IResolversParentTypes['UserConfiguration'] | IResolversParentTypes['OrganizationConfiguration'] | IResolversParentTypes['OrganizationResourceConfiguration'] | IResolversParentTypes['DefaultPolicy'] | IResolversParentTypes['OrganizationPolicy'] | IResolversParentTypes['ResourcePolicy'] | IResolversParentTypes['ApplicationPolicy'] | IResolversParentTypes['DefaultRole'] | IResolversParentTypes['OrganizationRole'] | IResolversParentTypes['ResourceRole'] | IResolversParentTypes['ApplicationRolePermission'],
  Overrides: IOverrides,
  UserConfiguration: IUserConfiguration,
  OrganizationConfiguration: IOrganizationConfiguration,
  OrganizationResourceConfiguration: IOrganizationResourceConfiguration,
  ConfigurationData: IConfigurationData,
  ConfigurationPolicy: IResolversParentTypes['DefaultPolicy'] | IResolversParentTypes['OrganizationPolicy'] | IResolversParentTypes['ResourcePolicy'] | IResolversParentTypes['ApplicationPolicy'],
  DefaultPolicy: IDefaultPolicy,
  OrganizationPolicy: IOrganizationPolicy,
  ResourcePolicy: IResourcePolicy,
  ApplicationPolicy: IApplicationPolicy,
  ContributionRoles: Omit<IContributionRoles, 'permissions'> & { permissions?: Maybe<IResolversParentTypes['AccessRole']> },
  AccessRole: IResolversParentTypes['DefaultRole'] | IResolversParentTypes['OrganizationRole'] | IResolversParentTypes['ResourceRole'] | IResolversParentTypes['ApplicationRolePermission'],
  DefaultRole: IDefaultRole,
  OrganizationRole: IOrganizationRole,
  ResourceRole: IResourceRole,
  ApplicationRolePermission: IApplicationRolePermission,
  DateTime: Scalars['DateTime'],
  TimeRecord: ITimeRecord,
  Timesheet: ITimesheet,
  TimesheetState: ITimesheetState,
  Environment: IEnvironment,
  Organization: IOrganization,
  OrganizationInvitation: IOrganizationInvitation,
  ApplicationRoles: IApplicationRoles,
  OrgUser: IOrgUser,
  IOrgUser: IResolversParentTypes['OrgUser'],
  InviteMember: IInviteMember,
  InviteStatus: IInviteStatus,
  Context: IContext,
  Client: IClient,
  ClientPhone: IClientPhone,
  SocialConnect: ISocialConnect,
  OrganizationConfigValue_Input: IOrganizationConfigValue_Input,
  ConfigurationOverrides_Input: IConfigurationOverrides_Input,
  OrgDetailWhere: IOrgDetailWhere,
  OrgMember: IOrgMember,
  OrganizationData: IOrganizationData,
  OrganizationResourceData: IOrganizationResourceData,
  AccountTeam: IAccountTeam,
  TeamInvitation: ITeamInvitation,
  TeamMember: ITeamMember,
  Project_Output: IProject_Output,
  RoleInput: IRoleInput,
  Schedule: ISchedule,
  Timeline: ITimeline,
  PermissionSubject: IPermissionSubject,
  PolicySubject: IPolicySubject,
  ViewerSettingsInput: IViewerSettingsInput,
  ViewerSettingsSubject: IViewerSettingsSubject,
  Mutation: {},
  AcceptInvitationToTeam_Input: IAcceptInvitationToTeam_Input,
  OrganizationNotificationValues: IOrganizationNotificationValues,
  ClientAddRequest: IClientAddRequest,
  ClientPhone_Input: IClientPhone_Input,
  SocialConnect_Input: ISocialConnect_Input,
  ProjectAddRequest: IProjectAddRequest,
  ScheduleCreateRequest: IScheduleCreateRequest,
  TimelineCreateRequest: ITimelineCreateRequest,
  AuthProvider: IAuthProvider,
  IdToken: IIdToken,
  UserInfo: IUserInfo,
  OrganizationCreateRequest: IOrganizationCreateRequest,
  OrganizationInvitation_Input: IOrganizationInvitation_Input,
  OrgUser_Input: IOrgUser_Input,
  TeamCreationRequest: ITeamCreationRequest,
  TimeRecordRequest: ITimeRecordRequest,
  TimesheetCreateRequest: ITimesheetCreateRequest,
  OrganizationRemoveRequest: IOrganizationRemoveRequest,
  TeamInvitationRequest: ITeamInvitationRequest,
  OrganizationInvitationRequest: IOrganizationInvitationRequest,
  ClientUpdateRequest: IClientUpdateRequest,
  UpdatedClient_Input: IUpdatedClient_Input,
  UpdateProject_Input: IUpdateProject_Input,
  OrganizationUpdateRequest: IOrganizationUpdateRequest,
  Organization_Input: IOrganization_Input,
  OrganizationResourceCreationData_Input: IOrganizationResourceCreationData_Input,
  Subscription: {},
  ConfigurationUpdateEvent: IConfigurationUpdateEvent,
  ConfigurationOverrides: IConfigurationOverrides,
  SubscribedOrganizationData: ISubscribedOrganizationData,
  Date: Scalars['Date'],
  Time: Scalars['Time'],
  JSON: Scalars['JSON'],
  JSONObject: Scalars['JSONObject'],
  FieldError: IFieldError,
  ConfigCollectionName: IConfigCollectionName,
  ConfigFragmentName: IConfigFragmentName,
  KeyPathSegment: IKeyPathSegment,
  PreferenceItem: IPreferenceItem,
  IConfigurationChangeEvent: Omit<IIConfigurationChangeEvent, 'changedConfiguration'> & { changedConfiguration?: Maybe<IResolversParentTypes['Configuration']> },
  ConfigurationTarget: IConfigurationTarget,
  ConfigurationModel: IConfigurationModel,
  SettingValueType: ISettingValueType,
  OrganizationIdentifier: IOrganizationIdentifier,
  OrganizationContextPubSubEvents: IOrganizationContextPubSubEvents,
  PermissionType: IPermissionType,
  PermissionAction: IPermissionAction,
  PermissionResource: IPermissionResource,
  PreDefinedRole: IPreDefinedRole,
  IResourceUserRole: IResolversParentTypes['ResourceUser'],
  ResourceUser: IResourceUser,
  EnvironmentPayload: IEnvironmentPayload,
  IAuth0UserProfile: IResolversParentTypes['UserProfile'],
  UserProfile: IUserProfile,
  LoginError: ILoginError,
  UserState: IUserState,
  Role: IRole,
  IAuthUser: IResolversParentTypes['AuthUserRaw'],
  AuthUserRaw: IAuthUserRaw,
  AuthUser_Input: IAuthUser_Input,
  UserPreviousValues: IUserPreviousValues,
  UserOrderBy: IUserOrderBy,
  TimeTracker: ITimeTracker,
  UserAccountCreateRequest: IUserAccountCreateRequest,
  UserAccountCreatedEvent: IUserAccountCreatedEvent,
  UserAccountCreatedDetailedEvent: IUserAccountCreatedDetailedEvent,
  UserAccount_Input: IUserAccount_Input,
  UserAccountUpdateRequest: IUserAccountUpdateRequest,
  UserAccountRemoveRequest: IUserAccountRemoveRequest,
  UserAccountRemovedEvent: IUserAccountRemovedEvent,
  AccountTeam_Input: IAccountTeam_Input,
  TeamInvitation_Input: ITeamInvitation_Input,
  TeamMember_Input: ITeamMember_Input,
  TeamRemoveRequest: ITeamRemoveRequest,
  TeamUpdateRequest: ITeamUpdateRequest,
  TeamCreateRequest: ITeamCreateRequest,
  OrgainizationInvitationRole: IOrgainizationInvitationRole,
  OrgUserRole: IOrgUserRole,
  UserOrg: IUserOrg,
  UserOrg_Input: IUserOrg_Input,
  OrganizationMember: IOrganizationMember,
  ClientTypes: IClientTypes,
  PortalLanguage: IPortalLanguage,
  Projects: IProjects,
  ProjectType: IProjectType,
  ClientCacheTypeNames: IClientCacheTypeNames,
};

export type IisAuthenticatedDirectiveArgs = {  };

export type IisAuthenticatedDirectiveResolver<Result, Parent, ContextType = MyContext, Args = IisAuthenticatedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IhasScopeDirectiveArgs = {   scope?: Maybe<Array<Maybe<Scalars['String']>>>; };

export type IhasScopeDirectiveResolver<Result, Parent, ContextType = MyContext, Args = IhasScopeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IprofileDirectiveArgs = {  };

export type IprofileDirectiveResolver<Result, Parent, ContextType = MyContext, Args = IprofileDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IaddAccountContextDirectiveArgs = {  };

export type IaddAccountContextDirectiveResolver<Result, Parent, ContextType = MyContext, Args = IaddAccountContextDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IaddNamespaceContextDirectiveArgs = {  };

export type IaddNamespaceContextDirectiveResolver<Result, Parent, ContextType = MyContext, Args = IaddNamespaceContextDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IAccessRoleResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['AccessRole'] = IResolversParentTypes['AccessRole']> = {
  __resolveType: TypeResolveFn<'DefaultRole' | 'OrganizationRole' | 'ResourceRole' | 'ApplicationRolePermission', ParentType, ContextType>
};

export type IAccountTeamResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['AccountTeam'] = IResolversParentTypes['AccountTeam']> = {
  _id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  invitations?: Resolver<Maybe<Array<Maybe<IResolversTypes['TeamInvitation']>>>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  parentTeam?: Resolver<Maybe<IResolversTypes['AccountTeam']>, ParentType, ContextType>,
  settingsUri?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  tags?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  teamMembers?: Resolver<Maybe<Array<Maybe<IResolversTypes['TeamMember']>>>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface IAnyObjectScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['AnyObject'], any> {
  name: 'AnyObject'
}

export type IApplicationPolicyResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ApplicationPolicy'] = IResolversParentTypes['ApplicationPolicy']> = {
  resource?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IApplicationRolePermissionResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ApplicationRolePermission'] = IResolversParentTypes['ApplicationRolePermission']> = {
  resource?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IAsanaConnectionResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['AsanaConnection'] = IResolversParentTypes['AsanaConnection']> = {
  asana?: Resolver<Maybe<IResolversTypes['AsanaConnectionState']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IAsanaConnectionStateResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['AsanaConnectionState'] = IResolversParentTypes['AsanaConnectionState']> = {
  status?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<IResolversTypes['AsanaUser']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IAsanaUserResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['AsanaUser'] = IResolversParentTypes['AsanaUser']> = {
  user_id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IAuthUserResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['AuthUser'] = IResolversParentTypes['AuthUser']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  auth0UserId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  emailVerified?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  givenName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  familyName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  picture?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IAuthUserRawResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['AuthUserRaw'] = IResolversParentTypes['AuthUserRaw']> = {
  given_name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  family_name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  nickname?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  email_verified?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  picture?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  locale?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  updated_at?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  iss?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  sub?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  aud?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  iat?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  exp?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  at_hash?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  nonce?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IClientResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Client'] = IResolversParentTypes['Client']> = {
  clientPhone?: Resolver<Maybe<IResolversTypes['ClientPhone']>, ParentType, ContextType>,
  companyName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  currency?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  orgName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  socialConnect?: Resolver<Maybe<IResolversTypes['SocialConnect']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  website?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IClientPhoneResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ClientPhone'] = IResolversParentTypes['ClientPhone']> = {
  mobile?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  workPhone?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IConfigurationResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Configuration'] = IResolversParentTypes['Configuration']> = {
  __resolveType: TypeResolveFn<'DefaultConfiguration' | 'UserConfiguration' | 'OrganizationConfiguration' | 'OrganizationResourceConfiguration', ParentType, ContextType>
};

export type IConfigurationDataResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ConfigurationData'] = IResolversParentTypes['ConfigurationData']> = {
  defaults?: Resolver<Maybe<IResolversTypes['IConfigurationModel']>, ParentType, ContextType>,
  user?: Resolver<Maybe<IResolversTypes['IConfigurationModel']>, ParentType, ContextType>,
  organization?: Resolver<Maybe<IResolversTypes['IConfigurationModel']>, ParentType, ContextType>,
  resources?: Resolver<Maybe<Array<Maybe<IResolversTypes['IConfigurationModel']>>>, ParentType, ContextType>,
  isComplete?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IConfigurationExtensionInfoResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ConfigurationExtensionInfo'] = IResolversParentTypes['ConfigurationExtensionInfo']> = {
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IConfigurationModelResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ConfigurationModel'] = IResolversParentTypes['ConfigurationModel']> = {
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IConfigurationOverridesResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ConfigurationOverrides'] = IResolversParentTypes['ConfigurationOverrides']> = {
  resource?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  overrideIdentifier?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IConfigurationPolicyResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ConfigurationPolicy'] = IResolversParentTypes['ConfigurationPolicy']> = {
  __resolveType: TypeResolveFn<'DefaultPolicy' | 'OrganizationPolicy' | 'ResourcePolicy' | 'ApplicationPolicy', ParentType, ContextType>
};

export type IConfigurationUpdateEventResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ConfigurationUpdateEvent'] = IResolversParentTypes['ConfigurationUpdateEvent']> = {
  resource?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<IResolversTypes['ConfigurationOverrides']>, ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IContextResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Context'] = IResolversParentTypes['Context']> = {
  orgName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IContributionRolesResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ContributionRoles'] = IResolversParentTypes['ContributionRoles']> = {
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  description?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  permissions?: Resolver<Maybe<IResolversTypes['AccessRole']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IContributionSettingsResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ContributionSettings'] = IResolversParentTypes['ContributionSettings']> = {
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  range?: Resolver<Maybe<IResolversTypes['Range']>, ParentType, ContextType>,
  key?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  keyRange?: Resolver<Maybe<IResolversTypes['Range']>, ParentType, ContextType>,
  default?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  value?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  valueRange?: Resolver<Maybe<IResolversTypes['Range']>, ParentType, ContextType>,
  description?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  descriptionIsMarkdown?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  descriptionRanges?: Resolver<Maybe<Array<Maybe<IResolversTypes['Range']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['ContributionSettings']>>>, ParentType, ContextType>,
  overrideOf?: Resolver<Maybe<IResolversTypes['ContributionSettings']>, ParentType, ContextType>,
  deprecationMessage?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  scope?: Resolver<Maybe<IResolversTypes['ConfigurationScope']>, ParentType, ContextType>,
  type?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  enum?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  enumDescriptions?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  enumDescriptionsAreMarkdown?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  tags?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  extensionInfo?: Resolver<Maybe<IResolversTypes['ConfigurationExtensionInfo']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ICounterResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Counter'] = IResolversParentTypes['Counter']> = {
  amount?: Resolver<IResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface IDateScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['Date'], any> {
  name: 'Date'
}

export interface IDateTimeScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type IDefaultConfigurationResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['DefaultConfiguration'] = IResolversParentTypes['DefaultConfiguration']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  resource?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IDefaultPolicyResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['DefaultPolicy'] = IResolversParentTypes['DefaultPolicy']> = {
  resource?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IDefaultRoleResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['DefaultRole'] = IResolversParentTypes['DefaultRole']> = {
  resource?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IDefaultSettingsResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['DefaultSettings'] = IResolversParentTypes['DefaultSettings']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<IResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<IResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IEnvironmentResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Environment'] = IResolversParentTypes['Environment']> = {
  args?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IFieldErrorResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['FieldError'] = IResolversParentTypes['FieldError']> = {
  field?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  message?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IGlobalSettingsResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['GlobalSettings'] = IResolversParentTypes['GlobalSettings']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<IResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<IResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IIAuth0UserProfileResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['IAuth0UserProfile'] = IResolversParentTypes['IAuth0UserProfile']> = {
  __resolveType: TypeResolveFn<'UserProfile', ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  nickname?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  picture?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  user_id?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  username?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  given_name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  family_name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  email_verified?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  clientID?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  gender?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  locale?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  created_at?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  updated_at?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  sub?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  user_metadata?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  app_metadata?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
};

export type IIAuthUserResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['IAuthUser'] = IResolversParentTypes['IAuthUser']> = {
  __resolveType: TypeResolveFn<'AuthUserRaw', ParentType, ContextType>,
  given_name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  family_name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  nickname?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  picture?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  locale?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  updated_at?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  iss?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  sub?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  aud?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  iat?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  exp?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  at_hash?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  nonce?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
};

export type IIConfigurationChangeEventResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['IConfigurationChangeEvent'] = IResolversParentTypes['IConfigurationChangeEvent']> = {
  source?: Resolver<Maybe<IResolversTypes['ConfigurationTarget']>, ParentType, ContextType>,
  affectedKeys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  sourceConfig?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  changedConfiguration?: Resolver<Maybe<IResolversTypes['Configuration']>, ParentType, ContextType>,
  changedConfigurationByResource?: Resolver<Maybe<IResolversTypes['OrganizationResourceConfiguration']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IIConfigurationModelResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['IConfigurationModel'] = IResolversParentTypes['IConfigurationModel']> = {
  __resolveType: TypeResolveFn<'DefaultConfiguration' | 'UserConfiguration' | 'OrganizationConfiguration' | 'OrganizationResourceConfiguration' | 'DefaultPolicy' | 'OrganizationPolicy' | 'ResourcePolicy' | 'ApplicationPolicy' | 'DefaultRole' | 'OrganizationRole' | 'ResourceRole' | 'ApplicationRolePermission', ParentType, ContextType>,
  resource?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
};

export type IInvitationDecodeResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['InvitationDecode'] = IResolversParentTypes['InvitationDecode']> = {
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  invitationId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  teamName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IInviteMemberResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['InviteMember'] = IResolversParentTypes['InviteMember']> = {
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<Maybe<IResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  status?: Resolver<Maybe<IResolversTypes['InviteStatus']>, ParentType, ContextType>,
  teamId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  teamName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IIOrgUserResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['IOrgUser'] = IResolversParentTypes['IOrgUser']> = {
  __resolveType: TypeResolveFn<'OrgUser', ParentType, ContextType>,
  inactive?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  role?: Resolver<Maybe<IResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  userId?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
};

export type IIResourceUserRoleResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['IResourceUserRole'] = IResolversParentTypes['IResourceUserRole']> = {
  __resolveType: TypeResolveFn<'ResourceUser', ParentType, ContextType>,
  role?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  isSelf?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
};

export type IISettingsSubjectResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ISettingsSubject'] = IResolversParentTypes['ISettingsSubject']> = {
  __resolveType: TypeResolveFn<'DefaultSettings' | 'UserSettings' | 'LocalUserSettings' | 'RemoteUserSettings' | 'OrganizationResourceSettings' | 'GlobalSettings' | 'OrganizationSettings' | 'MemorySettings', ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<IResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<IResolversTypes['SettingsCascade'], ParentType, ContextType>,
};

export type IIUserResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['IUser'] = IResolversParentTypes['IUser']> = {
  __resolveType: TypeResolveFn<'AuthUser', ParentType, ContextType>,
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
};

export interface IJSONScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['JSON'], any> {
  name: 'JSON'
}

export interface IJSONObjectScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['JSONObject'], any> {
  name: 'JSONObject'
}

export type ILocalUserSettingsResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['LocalUserSettings'] = IResolversParentTypes['LocalUserSettings']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<IResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<IResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ILoginErrorResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['LoginError'] = IResolversParentTypes['LoginError']> = {
  timeStamp?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  error?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IMemorySettingsResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['MemorySettings'] = IResolversParentTypes['MemorySettings']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<IResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<IResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IMutationResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  acceptInvitation?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationacceptInvitationArgs, 'id'>>,
  acceptInvitationToTeam?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationacceptInvitationToTeamArgs, never>>,
  acceptOrganizationInvitation?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationacceptOrganizationInvitationArgs, 'id'>>,
  addClient?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationaddClientArgs, 'client'>>,
  addContributionRole?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationaddContributionRoleArgs, 'name'>>,
  addCounter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType, RequireFields<IMutationaddCounterArgs, never>>,
  addMoleculerCounter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType, RequireFields<IMutationaddMoleculerCounterArgs, never>>,
  addOrgProject?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationaddOrgProjectArgs, 'project'>>,
  addScheduleEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationaddScheduleEventArgs, never>>,
  addTeamMembers?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationaddTeamMembersArgs, 'memberIds' | 'orgName' | 'teamName'>>,
  addTimelineEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationaddTimelineEventArgs, never>>,
  changeMemberRole?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationchangeMemberRoleArgs, 'memberId' | 'orgName' | 'role' | 'teamName'>>,
  changeOrgMemberRole?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationchangeOrgMemberRoleArgs, 'role' | 'userId'>>,
  createAuth0User?: Resolver<Maybe<IResolversTypes['AuthUser']>, ParentType, ContextType, RequireFields<IMutationcreateAuth0UserArgs, never>>,
  createOrganization?: Resolver<Maybe<IResolversTypes['Organization']>, ParentType, ContextType, RequireFields<IMutationcreateOrganizationArgs, 'organization'>>,
  createTeam?: Resolver<Maybe<IResolversTypes['AccountTeam']>, ParentType, ContextType, RequireFields<IMutationcreateTeamArgs, 'request'>>,
  createTimeRecord?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType, RequireFields<IMutationcreateTimeRecordArgs, never>>,
  createTimesheet?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationcreateTimesheetArgs, never>>,
  declineInvitation?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationdeclineInvitationArgs, 'id'>>,
  declineOrganizationInvitation?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationdeclineOrganizationInvitationArgs, 'id'>>,
  dummy?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  initiateConfigurationValue?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationinitiateConfigurationValueArgs, never>>,
  initiatePolicyValue?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationinitiatePolicyValueArgs, never>>,
  onAuth0UserCreated?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  removeDurationTimeRecords?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveDurationTimeRecordsArgs, never>>,
  removeOrgClient?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveOrgClientArgs, 'clientId'>>,
  removeOrgMember?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveOrgMemberArgs, 'memberId'>>,
  removeOrganization?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveOrganizationArgs, 'organization'>>,
  removeScheduleEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveScheduleEventArgs, never>>,
  removeTeam?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveTeamArgs, 'teamId'>>,
  removeTeamMember?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveTeamMemberArgs, 'memberId' | 'orgName' | 'teamName'>>,
  removeTimeRecord?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveTimeRecordArgs, never>>,
  removeTimelineEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveTimelineEventArgs, never>>,
  removeTimesheet?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationremoveTimesheetArgs, never>>,
  resendInvitation?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationresendInvitationArgs, 'id'>>,
  resendOrganizationInvitation?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationresendOrganizationInvitationArgs, 'id'>>,
  sendInvitation?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationsendInvitationArgs, 'request'>>,
  sendOrganizationInvitation?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationsendOrganizationInvitationArgs, never>>,
  setSettingsValueByResource?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationsetSettingsValueByResourceArgs, never>>,
  syncCachedCounter?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  updateConfigurationPolicyValue?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateConfigurationPolicyValueArgs, 'key' | 'value'>>,
  updateConfigurationPolicyValueByUri?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateConfigurationPolicyValueByUriArgs, 'key' | 'value'>>,
  updateConfigurationValue?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateConfigurationValueArgs, 'key' | 'value'>>,
  updateConfigurationValueByUri?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateConfigurationValueByUriArgs, 'key' | 'value'>>,
  updateOrgClient?: Resolver<Maybe<IResolversTypes['Client']>, ParentType, ContextType, RequireFields<IMutationupdateOrgClientArgs, never>>,
  updateOrgMemberTeams?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateOrgMemberTeamsArgs, 'orgName' | 'userId'>>,
  updateOrgProject?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateOrgProjectArgs, 'id'>>,
  updateOrganization?: Resolver<Maybe<IResolversTypes['Organization']>, ParentType, ContextType, RequireFields<IMutationupdateOrganizationArgs, 'organization'>>,
  updateOrganizationContextAddResources?: Resolver<Maybe<Array<Maybe<IResolversTypes['OrganizationResourceData']>>>, ParentType, ContextType, RequireFields<IMutationupdateOrganizationContextAddResourcesArgs, 'resourcesToAdd'>>,
  updateOrganizationContextRemoveResources?: Resolver<Maybe<Array<Maybe<IResolversTypes['OrganizationResourceData']>>>, ParentType, ContextType, RequireFields<IMutationupdateOrganizationContextRemoveResourcesArgs, 'resourcesToRemove'>>,
  updateOrganizationContextUpdateResources?: Resolver<Maybe<Array<Maybe<IResolversTypes['OrganizationResourceData']>>>, ParentType, ContextType, RequireFields<IMutationupdateOrganizationContextUpdateResourcesArgs, 'resourcesToAdd' | 'resourcesToRemove'>>,
  updateProjectStatus?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateProjectStatusArgs, 'id'>>,
  updateRoleValue?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateRoleValueArgs, 'key' | 'value'>>,
  updateScheduleEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateScheduleEventArgs, never>>,
  updateTimeRecord?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateTimeRecordArgs, never>>,
  updateTimelineEvent?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateTimelineEventArgs, never>>,
  updateTimesheet?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateTimesheetArgs, never>>,
  updateTimesheetStatus?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<IMutationupdateTimesheetStatusArgs, never>>,
};

export type IOrganizationResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Organization'] = IResolversParentTypes['Organization']> = {
  billingEmail?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  billingLeaders?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  description?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  invitations?: Resolver<Maybe<Array<Maybe<IResolversTypes['OrganizationInvitation']>>>, ParentType, ContextType>,
  isBillingLeader?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  mainBilingLeaderId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  namespace?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  orgMembers?: Resolver<Maybe<Array<Maybe<IResolversTypes['OrgUser']>>>, ParentType, ContextType>,
  orgUserCount?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  periodStart?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  periodStop?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  picture?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  stripeId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  stripeSubscriptionId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrganizationConfigurationResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrganizationConfiguration'] = IResolversParentTypes['OrganizationConfiguration']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  resource?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrganizationDataResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrganizationData'] = IResolversParentTypes['OrganizationData']> = {
  id?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  resources?: Resolver<Maybe<Array<Maybe<IResolversTypes['OrganizationResourceData']>>>, ParentType, ContextType>,
  configuration?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrganizationIdentifierResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrganizationIdentifier'] = IResolversParentTypes['OrganizationIdentifier']> = {
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  configPath?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrganizationInvitationResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrganizationInvitation'] = IResolversParentTypes['OrganizationInvitation']> = {
  acceptedAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  active?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  fullName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  inviteCount?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  invitedBy?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<Maybe<IResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  teamId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  tokenExpiration?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrganizationInvitationDecodeResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrganizationInvitationDecode'] = IResolversParentTypes['OrganizationInvitationDecode']> = {
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  invitationId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  invitedBy?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  teamName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrganizationMemberResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrganizationMember'] = IResolversParentTypes['OrganizationMember']> = {
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  isBillingLeader?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  organization?: Resolver<Maybe<IResolversTypes['Organization']>, ParentType, ContextType>,
  user?: Resolver<Maybe<IResolversTypes['AuthUser']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrganizationPolicyResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrganizationPolicy'] = IResolversParentTypes['OrganizationPolicy']> = {
  resource?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrganizationResourceConfigurationResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrganizationResourceConfiguration'] = IResolversParentTypes['OrganizationResourceConfiguration']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  resource?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrganizationResourceDataResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrganizationResourceData'] = IResolversParentTypes['OrganizationResourceData']> = {
  uri?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  index?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrganizationResourceSettingsResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrganizationResourceSettings'] = IResolversParentTypes['OrganizationResourceSettings']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<IResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<IResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrganizationRoleResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrganizationRole'] = IResolversParentTypes['OrganizationRole']> = {
  resource?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrganizationSettingsResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrganizationSettings'] = IResolversParentTypes['OrganizationSettings']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<IResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<IResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrgMemberResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrgMember'] = IResolversParentTypes['OrgMember']> = {
  _id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  crossCheckEmail?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  inactive?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<Maybe<IResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  teamNames?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  userId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrgUserResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['OrgUser'] = IResolversParentTypes['OrgUser']> = {
  crossCheckEmail?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  inactive?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  isSelf?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  orgName?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<Maybe<IResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  userId?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOverridesResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Overrides'] = IResolversParentTypes['Overrides']> = {
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  identifiers?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPermissionSubjectResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['PermissionSubject'] = IResolversParentTypes['PermissionSubject']> = {
  roleURL?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  permissions?: Resolver<IResolversTypes['AnyObject'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPolicySubjectResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['PolicySubject'] = IResolversParentTypes['PolicySubject']> = {
  policyURL?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  policies?: Resolver<IResolversTypes['AnyObject'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPositionResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Position'] = IResolversParentTypes['Position']> = {
  line?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  character?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPreference_AccountResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Preference_Account'] = IResolversParentTypes['Preference_Account']> = {
  default?: Resolver<Maybe<IResolversTypes['Preference_Default']>, ParentType, ContextType>,
  notification?: Resolver<Maybe<IResolversTypes['Preference_Notification']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPreference_DefaultResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Preference_Default'] = IResolversParentTypes['Preference_Default']> = {
  organization?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPreference_NotificationResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Preference_Notification'] = IResolversParentTypes['Preference_Notification']> = {
  billing?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  onChangeAccountSettings?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  primaryEmail?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPreference_OrganizationResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Preference_Organization'] = IResolversParentTypes['Preference_Organization']> = {
  project?: Resolver<Maybe<IResolversTypes['Preference_Project']>, ParentType, ContextType>,
  teams?: Resolver<Maybe<IResolversTypes['Preference_Teams']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPreference_ProjectResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Preference_Project'] = IResolversParentTypes['Preference_Project']> = {
  tags?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  visibility?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPreference_TeamsResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Preference_Teams'] = IResolversParentTypes['Preference_Teams']> = {
  visibility?: Resolver<Maybe<IResolversTypes['Visibility']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPreferenceItemResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['PreferenceItem'] = IResolversParentTypes['PreferenceItem']> = {
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  default?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  categoryType?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  settings?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  enum?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  enumDescriptions?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPreferencesResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Preferences'] = IResolversParentTypes['Preferences']> = {
  account?: Resolver<Maybe<IResolversTypes['Preference_Account']>, ParentType, ContextType>,
  defaultSetting?: Resolver<Maybe<Array<Maybe<IResolversTypes['SettingsGroup']>>>, ParentType, ContextType>,
  dummy?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  organization?: Resolver<Maybe<IResolversTypes['Preference_Organization']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPreferencesResponseResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['PreferencesResponse'] = IResolversParentTypes['PreferencesResponse']> = {
  preferences?: Resolver<Maybe<Array<Maybe<IResolversTypes['PreferencesType']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IPreferencesTypeResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['PreferencesType'] = IResolversParentTypes['PreferencesType']> = {
  type?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  data?: Resolver<Maybe<Array<Maybe<IResolversTypes['ContributionSettings']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IProject_OutputResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Project_Output'] = IResolversParentTypes['Project_Output']> = {
  clientId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  orgName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  status?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  teams?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IProjectsResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Projects'] = IResolversParentTypes['Projects']> = {
  clientId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  orgName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  status?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  teams?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  templateId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<IResolversTypes['ProjectType']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IQueryResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  counter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
  counterCache?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
  decodeInvitation?: Resolver<Maybe<IResolversTypes['InvitationDecode']>, ParentType, ContextType, RequireFields<IQuerydecodeInvitationArgs, 'token'>>,
  decodeOrganizationInvitation?: Resolver<Maybe<IResolversTypes['OrganizationInvitationDecode']>, ParentType, ContextType, RequireFields<IQuerydecodeOrganizationInvitationArgs, 'token'>>,
  defaultPermissions?: Resolver<Maybe<Array<Maybe<IResolversTypes['SettingsGroup']>>>, ParentType, ContextType, RequireFields<IQuerydefaultPermissionsArgs, never>>,
  defaultPolicies?: Resolver<Maybe<Array<Maybe<IResolversTypes['SettingsGroup']>>>, ParentType, ContextType, RequireFields<IQuerydefaultPoliciesArgs, never>>,
  defaultPreferences?: Resolver<Maybe<IResolversTypes['PreferencesResponse']>, ParentType, ContextType>,
  defaultSetting?: Resolver<Maybe<IResolversTypes['ContributionSettings']>, ParentType, ContextType>,
  defaultViewerSettingsSubject?: Resolver<IResolversTypes['DefaultSettings'], ParentType, ContextType, RequireFields<IQuerydefaultViewerSettingsSubjectArgs, never>>,
  dummy?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  fetchAuth0User?: Resolver<Maybe<IResolversTypes['AuthUser']>, ParentType, ContextType, RequireFields<IQueryfetchAuth0UserArgs, 'auth0UserId'>>,
  getAccounts?: Resolver<Maybe<Array<Maybe<IResolversTypes['UserAccount']>>>, ParentType, ContextType, RequireFields<IQuerygetAccountsArgs, never>>,
  getAsanaConnectionState?: Resolver<Maybe<IResolversTypes['AsanaConnection']>, ParentType, ContextType>,
  getConfiguration?: Resolver<Maybe<Array<Maybe<IResolversTypes['Configuration']>>>, ParentType, ContextType, RequireFields<IQuerygetConfigurationArgs, never>>,
  getConfigurationData?: Resolver<Maybe<IResolversTypes['ConfigurationData']>, ParentType, ContextType>,
  getConfigurationPolicies?: Resolver<Maybe<Array<Maybe<IResolversTypes['ConfigurationPolicy']>>>, ParentType, ContextType, RequireFields<IQuerygetConfigurationPoliciesArgs, never>>,
  getContextProperty?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType, RequireFields<IQuerygetContextPropertyArgs, never>>,
  getContributionRoles?: Resolver<Maybe<Array<Maybe<IResolversTypes['ContributionRoles']>>>, ParentType, ContextType>,
  getDurationTimeRecords?: Resolver<Maybe<Array<Maybe<IResolversTypes['TimeRecord']>>>, ParentType, ContextType, RequireFields<IQuerygetDurationTimeRecordsArgs, never>>,
  getDurationTimesheet?: Resolver<Maybe<IResolversTypes['Timesheet']>, ParentType, ContextType, RequireFields<IQuerygetDurationTimesheetArgs, never>>,
  getEnvironment?: Resolver<Maybe<IResolversTypes['Environment']>, ParentType, ContextType>,
  getManageableOrganizations?: Resolver<Maybe<Array<Maybe<IResolversTypes['Organization']>>>, ParentType, ContextType>,
  getOrgInvitationMembers?: Resolver<Maybe<Array<Maybe<IResolversTypes['InviteMember']>>>, ParentType, ContextType>,
  getOrgNameFromContext?: Resolver<Maybe<IResolversTypes['Context']>, ParentType, ContextType>,
  getOrganizationClients?: Resolver<Maybe<Array<Maybe<IResolversTypes['Client']>>>, ParentType, ContextType>,
  getOrganizationConfigValue?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType, RequireFields<IQuerygetOrganizationConfigValueArgs, never>>,
  getOrganizationDetail?: Resolver<Maybe<IResolversTypes['Organization']>, ParentType, ContextType, RequireFields<IQuerygetOrganizationDetailArgs, 'where'>>,
  getOrganizationDetailUnsecured?: Resolver<Maybe<IResolversTypes['Organization']>, ParentType, ContextType, RequireFields<IQuerygetOrganizationDetailUnsecuredArgs, 'where'>>,
  getOrganizationInvitation?: Resolver<Maybe<IResolversTypes['OrganizationInvitation']>, ParentType, ContextType, RequireFields<IQuerygetOrganizationInvitationArgs, 'id'>>,
  getOrganizationMembers?: Resolver<Maybe<Array<Maybe<IResolversTypes['OrgMember']>>>, ParentType, ContextType>,
  getOrganizationResourceContext?: Resolver<Maybe<IResolversTypes['OrganizationData']>, ParentType, ContextType, RequireFields<IQuerygetOrganizationResourceContextArgs, never>>,
  getOrganizationTeams?: Resolver<Maybe<Array<Maybe<IResolversTypes['AccountTeam']>>>, ParentType, ContextType, RequireFields<IQuerygetOrganizationTeamsArgs, never>>,
  getPlayingTimeRecord?: Resolver<Maybe<IResolversTypes['TimeRecord']>, ParentType, ContextType>,
  getProjects?: Resolver<Maybe<Array<Maybe<IResolversTypes['Project_Output']>>>, ParentType, ContextType>,
  getRole?: Resolver<Maybe<IResolversTypes['AccessRole']>, ParentType, ContextType, RequireFields<IQuerygetRoleArgs, never>>,
  getRoles?: Resolver<Maybe<Array<Maybe<IResolversTypes['AccessRole']>>>, ParentType, ContextType, RequireFields<IQuerygetRolesArgs, never>>,
  getScheduleEvents?: Resolver<Maybe<Array<Maybe<IResolversTypes['Schedule']>>>, ParentType, ContextType, RequireFields<IQuerygetScheduleEventsArgs, never>>,
  getTeam?: Resolver<Maybe<IResolversTypes['AccountTeam']>, ParentType, ContextType, RequireFields<IQuerygetTeamArgs, 'orgName' | 'teamName'>>,
  getTimeRecords?: Resolver<Maybe<Array<Maybe<IResolversTypes['TimeRecord']>>>, ParentType, ContextType>,
  getTimelineEvents?: Resolver<Maybe<Array<Maybe<IResolversTypes['Timeline']>>>, ParentType, ContextType, RequireFields<IQuerygetTimelineEventsArgs, never>>,
  getTimesheets?: Resolver<Maybe<Array<Maybe<IResolversTypes['Timesheet']>>>, ParentType, ContextType, RequireFields<IQuerygetTimesheetsArgs, never>>,
  getUserAccount?: Resolver<Maybe<IResolversTypes['UserAccount']>, ParentType, ContextType, RequireFields<IQuerygetUserAccountArgs, 'userId'>>,
  getUserOrganizations?: Resolver<Maybe<Array<Maybe<IResolversTypes['Organization']>>>, ParentType, ContextType, RequireFields<IQuerygetUserOrganizationsArgs, never>>,
  getUserOrganizationsWithRole?: Resolver<Maybe<Array<Maybe<IResolversTypes['Organization']>>>, ParentType, ContextType, RequireFields<IQuerygetUserOrganizationsWithRoleArgs, never>>,
  getUsers?: Resolver<Maybe<Array<Maybe<IResolversTypes['UserAccount']>>>, ParentType, ContextType, RequireFields<IQuerygetUsersArgs, never>>,
  getViewerPermissions?: Resolver<Maybe<IResolversTypes['PermissionSubject']>, ParentType, ContextType, RequireFields<IQuerygetViewerPermissionsArgs, never>>,
  getViewerPolicies?: Resolver<Maybe<IResolversTypes['PolicySubject']>, ParentType, ContextType, RequireFields<IQuerygetViewerPoliciesArgs, never>>,
  mergedApplicationPermissions?: Resolver<Maybe<Array<Maybe<IResolversTypes['ContributionSettings']>>>, ParentType, ContextType, RequireFields<IQuerymergedApplicationPermissionsArgs, never>>,
  moleculerCounter?: Resolver<Maybe<IResolversTypes['Counter']>, ParentType, ContextType>,
  organizations?: Resolver<Maybe<Array<Maybe<IResolversTypes['Organization']>>>, ParentType, ContextType>,
  team?: Resolver<Maybe<IResolversTypes['AccountTeam']>, ParentType, ContextType, RequireFields<IQueryteamArgs, 'teamId'>>,
  teamInvitation?: Resolver<IResolversTypes['TeamInvitation'], ParentType, ContextType, RequireFields<IQueryteamInvitationArgs, 'id'>>,
  teams?: Resolver<Maybe<Array<Maybe<IResolversTypes['AccountTeam']>>>, ParentType, ContextType>,
  viewerSettings?: Resolver<IResolversTypes['ViewerSettingsSubject'], ParentType, ContextType, RequireFields<IQueryviewerSettingsArgs, never>>,
};

export type IRangeResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Range'] = IResolversParentTypes['Range']> = {
  start?: Resolver<Maybe<IResolversTypes['Position']>, ParentType, ContextType>,
  end?: Resolver<Maybe<IResolversTypes['Position']>, ParentType, ContextType>,
  startLineNumber?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  startColumn?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  endLineNumber?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  endColumn?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IRemoteUserSettingsResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['RemoteUserSettings'] = IResolversParentTypes['RemoteUserSettings']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<IResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<IResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IResourcePolicyResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ResourcePolicy'] = IResolversParentTypes['ResourcePolicy']> = {
  resource?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IResourceRoleResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ResourceRole'] = IResolversParentTypes['ResourceRole']> = {
  resource?: Resolver<Maybe<IResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IResourceUserResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ResourceUser'] = IResolversParentTypes['ResourceUser']> = {
  role?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  isSelf?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IScheduleResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Schedule'] = IResolversParentTypes['Schedule']> = {
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

export type ISettingsResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Settings'] = IResolversParentTypes['Settings']> = {
  createdAt?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  contents?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ISettingsCascadeResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['SettingsCascade'] = IResolversParentTypes['SettingsCascade']> = {
  subjects?: Resolver<Maybe<Array<Maybe<IResolversTypes['SettingsSubject']>>>, ParentType, ContextType>,
  final?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  finalConfiguration?: Resolver<Maybe<IResolversTypes['Preferences']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ISettingsGroupResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['SettingsGroup'] = IResolversParentTypes['SettingsGroup']> = {
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  range?: Resolver<Maybe<IResolversTypes['Range']>, ParentType, ContextType>,
  title?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  titleRange?: Resolver<Maybe<IResolversTypes['Range']>, ParentType, ContextType>,
  sections?: Resolver<Maybe<Array<Maybe<IResolversTypes['SettingsSection']>>>, ParentType, ContextType>,
  contributedByExtension?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ISettingsSectionResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['SettingsSection'] = IResolversParentTypes['SettingsSection']> = {
  titleRange?: Resolver<Maybe<IResolversTypes['Range']>, ParentType, ContextType>,
  title?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  settings?: Resolver<Maybe<Array<Maybe<IResolversTypes['ContributionSettings']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ISettingsSubjectResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['SettingsSubject'] = IResolversParentTypes['SettingsSubject']> = {
  __resolveType: TypeResolveFn<'UserSettings' | 'LocalUserSettings' | 'RemoteUserSettings' | 'OrganizationResourceSettings' | 'GlobalSettings' | 'OrganizationSettings' | 'MemorySettings' | 'DefaultSettings', ParentType, ContextType>
};

export type ISocialConnectResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['SocialConnect'] = IResolversParentTypes['SocialConnect']> = {
  facebook?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  twitter?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ISubscribedOrganizationDataResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['SubscribedOrganizationData'] = IResolversParentTypes['SubscribedOrganizationData']> = {
  resources?: Resolver<Maybe<Array<Maybe<IResolversTypes['OrganizationResourceData']>>>, ParentType, ContextType>,
  orgNameFilter?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ISubscriptionResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Subscription'] = IResolversParentTypes['Subscription']> = {
  SubscribeToConfigurationUpdate?: SubscriptionResolver<Maybe<IResolversTypes['ConfigurationUpdateEvent']>, "SubscribeToConfigurationUpdate", ParentType, ContextType, RequireFields<ISubscriptionSubscribeToConfigurationUpdateArgs, 'orgName'>>,
  SubscribeToOrganizationContext?: SubscriptionResolver<Maybe<IResolversTypes['SubscribedOrganizationData']>, "SubscribeToOrganizationContext", ParentType, ContextType, RequireFields<ISubscriptionSubscribeToOrganizationContextArgs, never>>,
  SubscribeToPermissionUpdate?: SubscriptionResolver<Maybe<IResolversTypes['ConfigurationUpdateEvent']>, "SubscribeToPermissionUpdate", ParentType, ContextType, RequireFields<ISubscriptionSubscribeToPermissionUpdateArgs, never>>,
  SubscribeToPolicyUpdate?: SubscriptionResolver<Maybe<IResolversTypes['ConfigurationUpdateEvent']>, "SubscribeToPolicyUpdate", ParentType, ContextType, RequireFields<ISubscriptionSubscribeToPolicyUpdateArgs, never>>,
  counterUpdated?: SubscriptionResolver<Maybe<IResolversTypes['Counter']>, "counterUpdated", ParentType, ContextType>,
  dummy?: SubscriptionResolver<Maybe<IResolversTypes['Int']>, "dummy", ParentType, ContextType>,
  moleculerCounterUpdate?: SubscriptionResolver<Maybe<IResolversTypes['Counter']>, "moleculerCounterUpdate", ParentType, ContextType>,
};

export type ITeamInvitationResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['TeamInvitation'] = IResolversParentTypes['TeamInvitation']> = {
  acceptedAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  active?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  fullName?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  inviteCount?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  invitedBy?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<Maybe<IResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  teamId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  tokenExpiration?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ITeamMemberResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['TeamMember'] = IResolversParentTypes['TeamMember']> = {
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<Maybe<IResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface ITimeScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['Time'], any> {
  name: 'Time'
}

export type ITimelineResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Timeline'] = IResolversParentTypes['Timeline']> = {
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

export type ITimeRecordResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['TimeRecord'] = IResolversParentTypes['TimeRecord']> = {
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

export type ITimesheetResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['Timesheet'] = IResolversParentTypes['Timesheet']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  startDate?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  endDate?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  state?: Resolver<Maybe<IResolversTypes['TimesheetState']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  approvedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  updatedBy?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  updatedOn?: Resolver<Maybe<IResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ITimeTrackerResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['TimeTracker'] = IResolversParentTypes['TimeTracker']> = {
  userId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  orgId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  timeRecords?: Resolver<Maybe<Array<Maybe<IResolversTypes['TimeRecord']>>>, ParentType, ContextType>,
  timesheets?: Resolver<Maybe<Array<Maybe<IResolversTypes['Timesheet']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface IURIScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['URI'], any> {
  name: 'URI'
}

export interface IURIInputScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['URIInput'], any> {
  name: 'URIInput'
}

export type IUserAccountResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['UserAccount'] = IResolversParentTypes['UserAccount']> = {
  alias?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  emailVerified?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  notificationEmail?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IUserAccountCreatedDetailedEventResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['UserAccountCreatedDetailedEvent'] = IResolversParentTypes['UserAccountCreatedDetailedEvent']> = {
  alias?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  emailVerified?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  id?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  notificationEmail?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IUserAccountCreatedEventResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['UserAccountCreatedEvent'] = IResolversParentTypes['UserAccountCreatedEvent']> = {
  createdUser?: Resolver<Maybe<IResolversTypes['UserAccountCreatedDetailedEvent']>, ParentType, ContextType>,
  sourceUser?: Resolver<Maybe<IResolversTypes['AuthUserRaw']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IUserAccountRemovedEventResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['UserAccountRemovedEvent'] = IResolversParentTypes['UserAccountRemovedEvent']> = {
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  notificationEmail?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IUserConfigurationResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['UserConfiguration'] = IResolversParentTypes['UserConfiguration']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  resource?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  target?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<IResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<IResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IUserOrgResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['UserOrg'] = IResolversParentTypes['UserOrg']> = {
  inactive?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  role?: Resolver<Maybe<IResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  userId?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IUserPreviousValuesResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['UserPreviousValues'] = IResolversParentTypes['UserPreviousValues']> = {
  auth0UserId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>,
  emailSubscription?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>,
  updatedAt?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IUserProfileResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['UserProfile'] = IResolversParentTypes['UserProfile']> = {
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  nickname?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  picture?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  user_id?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  username?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  given_name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  family_name?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  email_verified?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  clientID?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  gender?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  locale?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  accessToken?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  created_at?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  updated_at?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  sub?: Resolver<IResolversTypes['String'], ParentType, ContextType>,
  user_metadata?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  app_metadata?: Resolver<Maybe<IResolversTypes['AnyObject']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IUserSettingsResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['UserSettings'] = IResolversParentTypes['UserSettings']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<IResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<IResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IUserStateResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['UserState'] = IResolversParentTypes['UserState']> = {
  id?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  auth0UserId?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  profile?: Resolver<Maybe<IResolversTypes['UserProfile']>, ParentType, ContextType>,
  isProfileFetching?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  isTokenExpired?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  isLoggingInToProceed?: Resolver<Maybe<IResolversTypes['Boolean']>, ParentType, ContextType>,
  loginError?: Resolver<Maybe<IResolversTypes['LoginError']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IViewerSettingsSubjectResolvers<ContextType = MyContext, ParentType extends IResolversParentTypes['ViewerSettingsSubject'] = IResolversParentTypes['ViewerSettingsSubject']> = {
  settingsURL?: Resolver<IResolversTypes['URI'], ParentType, ContextType>,
  settings?: Resolver<Maybe<IResolversTypes['Preferences']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IResolvers<ContextType = MyContext> = {
  AccessRole?: IAccessRoleResolvers,
  AccountTeam?: IAccountTeamResolvers<ContextType>,
  AnyObject?: GraphQLScalarType,
  ApplicationPolicy?: IApplicationPolicyResolvers<ContextType>,
  ApplicationRolePermission?: IApplicationRolePermissionResolvers<ContextType>,
  AsanaConnection?: IAsanaConnectionResolvers<ContextType>,
  AsanaConnectionState?: IAsanaConnectionStateResolvers<ContextType>,
  AsanaUser?: IAsanaUserResolvers<ContextType>,
  AuthUser?: IAuthUserResolvers<ContextType>,
  AuthUserRaw?: IAuthUserRawResolvers<ContextType>,
  Client?: IClientResolvers<ContextType>,
  ClientPhone?: IClientPhoneResolvers<ContextType>,
  Configuration?: IConfigurationResolvers,
  ConfigurationData?: IConfigurationDataResolvers<ContextType>,
  ConfigurationExtensionInfo?: IConfigurationExtensionInfoResolvers<ContextType>,
  ConfigurationModel?: IConfigurationModelResolvers<ContextType>,
  ConfigurationOverrides?: IConfigurationOverridesResolvers<ContextType>,
  ConfigurationPolicy?: IConfigurationPolicyResolvers,
  ConfigurationUpdateEvent?: IConfigurationUpdateEventResolvers<ContextType>,
  Context?: IContextResolvers<ContextType>,
  ContributionRoles?: IContributionRolesResolvers<ContextType>,
  ContributionSettings?: IContributionSettingsResolvers<ContextType>,
  Counter?: ICounterResolvers<ContextType>,
  Date?: GraphQLScalarType,
  DateTime?: GraphQLScalarType,
  DefaultConfiguration?: IDefaultConfigurationResolvers<ContextType>,
  DefaultPolicy?: IDefaultPolicyResolvers<ContextType>,
  DefaultRole?: IDefaultRoleResolvers<ContextType>,
  DefaultSettings?: IDefaultSettingsResolvers<ContextType>,
  Environment?: IEnvironmentResolvers<ContextType>,
  FieldError?: IFieldErrorResolvers<ContextType>,
  GlobalSettings?: IGlobalSettingsResolvers<ContextType>,
  IAuth0UserProfile?: IIAuth0UserProfileResolvers,
  IAuthUser?: IIAuthUserResolvers,
  IConfigurationChangeEvent?: IIConfigurationChangeEventResolvers<ContextType>,
  IConfigurationModel?: IIConfigurationModelResolvers,
  InvitationDecode?: IInvitationDecodeResolvers<ContextType>,
  InviteMember?: IInviteMemberResolvers<ContextType>,
  IOrgUser?: IIOrgUserResolvers,
  IResourceUserRole?: IIResourceUserRoleResolvers,
  ISettingsSubject?: IISettingsSubjectResolvers,
  IUser?: IIUserResolvers,
  JSON?: GraphQLScalarType,
  JSONObject?: GraphQLScalarType,
  LocalUserSettings?: ILocalUserSettingsResolvers<ContextType>,
  LoginError?: ILoginErrorResolvers<ContextType>,
  MemorySettings?: IMemorySettingsResolvers<ContextType>,
  Mutation?: IMutationResolvers<ContextType>,
  Organization?: IOrganizationResolvers<ContextType>,
  OrganizationConfiguration?: IOrganizationConfigurationResolvers<ContextType>,
  OrganizationData?: IOrganizationDataResolvers<ContextType>,
  OrganizationIdentifier?: IOrganizationIdentifierResolvers<ContextType>,
  OrganizationInvitation?: IOrganizationInvitationResolvers<ContextType>,
  OrganizationInvitationDecode?: IOrganizationInvitationDecodeResolvers<ContextType>,
  OrganizationMember?: IOrganizationMemberResolvers<ContextType>,
  OrganizationPolicy?: IOrganizationPolicyResolvers<ContextType>,
  OrganizationResourceConfiguration?: IOrganizationResourceConfigurationResolvers<ContextType>,
  OrganizationResourceData?: IOrganizationResourceDataResolvers<ContextType>,
  OrganizationResourceSettings?: IOrganizationResourceSettingsResolvers<ContextType>,
  OrganizationRole?: IOrganizationRoleResolvers<ContextType>,
  OrganizationSettings?: IOrganizationSettingsResolvers<ContextType>,
  OrgMember?: IOrgMemberResolvers<ContextType>,
  OrgUser?: IOrgUserResolvers<ContextType>,
  Overrides?: IOverridesResolvers<ContextType>,
  PermissionSubject?: IPermissionSubjectResolvers<ContextType>,
  PolicySubject?: IPolicySubjectResolvers<ContextType>,
  Position?: IPositionResolvers<ContextType>,
  Preference_Account?: IPreference_AccountResolvers<ContextType>,
  Preference_Default?: IPreference_DefaultResolvers<ContextType>,
  Preference_Notification?: IPreference_NotificationResolvers<ContextType>,
  Preference_Organization?: IPreference_OrganizationResolvers<ContextType>,
  Preference_Project?: IPreference_ProjectResolvers<ContextType>,
  Preference_Teams?: IPreference_TeamsResolvers<ContextType>,
  PreferenceItem?: IPreferenceItemResolvers<ContextType>,
  Preferences?: IPreferencesResolvers<ContextType>,
  PreferencesResponse?: IPreferencesResponseResolvers<ContextType>,
  PreferencesType?: IPreferencesTypeResolvers<ContextType>,
  Project_Output?: IProject_OutputResolvers<ContextType>,
  Projects?: IProjectsResolvers<ContextType>,
  Query?: IQueryResolvers<ContextType>,
  Range?: IRangeResolvers<ContextType>,
  RemoteUserSettings?: IRemoteUserSettingsResolvers<ContextType>,
  ResourcePolicy?: IResourcePolicyResolvers<ContextType>,
  ResourceRole?: IResourceRoleResolvers<ContextType>,
  ResourceUser?: IResourceUserResolvers<ContextType>,
  Schedule?: IScheduleResolvers<ContextType>,
  Settings?: ISettingsResolvers<ContextType>,
  SettingsCascade?: ISettingsCascadeResolvers<ContextType>,
  SettingsGroup?: ISettingsGroupResolvers<ContextType>,
  SettingsSection?: ISettingsSectionResolvers<ContextType>,
  SettingsSubject?: ISettingsSubjectResolvers,
  SocialConnect?: ISocialConnectResolvers<ContextType>,
  SubscribedOrganizationData?: ISubscribedOrganizationDataResolvers<ContextType>,
  Subscription?: ISubscriptionResolvers<ContextType>,
  TeamInvitation?: ITeamInvitationResolvers<ContextType>,
  TeamMember?: ITeamMemberResolvers<ContextType>,
  Time?: GraphQLScalarType,
  Timeline?: ITimelineResolvers<ContextType>,
  TimeRecord?: ITimeRecordResolvers<ContextType>,
  Timesheet?: ITimesheetResolvers<ContextType>,
  TimeTracker?: ITimeTrackerResolvers<ContextType>,
  URI?: GraphQLScalarType,
  URIInput?: GraphQLScalarType,
  UserAccount?: IUserAccountResolvers<ContextType>,
  UserAccountCreatedDetailedEvent?: IUserAccountCreatedDetailedEventResolvers<ContextType>,
  UserAccountCreatedEvent?: IUserAccountCreatedEventResolvers<ContextType>,
  UserAccountRemovedEvent?: IUserAccountRemovedEventResolvers<ContextType>,
  UserConfiguration?: IUserConfigurationResolvers<ContextType>,
  UserOrg?: IUserOrgResolvers<ContextType>,
  UserPreviousValues?: IUserPreviousValuesResolvers<ContextType>,
  UserProfile?: IUserProfileResolvers<ContextType>,
  UserSettings?: IUserSettingsResolvers<ContextType>,
  UserState?: IUserStateResolvers<ContextType>,
  ViewerSettingsSubject?: IViewerSettingsSubjectResolvers<ContextType>,
};


export type IDirectiveResolvers<ContextType = MyContext> = {
  isAuthenticated?: IisAuthenticatedDirectiveResolver<any, any, ContextType>,
  hasScope?: IhasScopeDirectiveResolver<any, any, ContextType>,
  profile?: IprofileDirectiveResolver<any, any, ContextType>,
  addAccountContext?: IaddAccountContextDirectiveResolver<any, any, ContextType>,
  addNamespaceContext?: IaddNamespaceContextDirectiveResolver<any, any, ContextType>,
};

