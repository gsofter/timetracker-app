/* tslint:disable */

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  DateTime: any;
  JSON: any;
  URIInput: any;
  Date: any;
  Time: any;
  JSONObject: any;
};






export type AccessRole = DefaultRole | OrganizationRole | ResourceRole | ApplicationRolePermission;

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
export type AccountTeam = {
   __typename?: 'AccountTeam';
  id?: Maybe<Scalars['ID']>;
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  settingsUri?: Maybe<Scalars['URI']>;
  parentTeam?: Maybe<AccountTeam>;
  updatedAt?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  teamMembers?: Maybe<Array<Maybe<TeamMember>>>;
};

export type AccountTeam_Input = {
  id?: Maybe<Scalars['ID']>;
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  parentTeam?: Maybe<AccountTeam_Input>;
  teamMembers?: Maybe<Array<Maybe<TeamMember_Input>>>;
};

export type AddressType = {
   __typename?: 'AddressType';
  attention?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type AddressType_Input = {
  attention?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};


export type ApplicationPolicy = IConfigurationModel & {
   __typename?: 'ApplicationPolicy';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type ApplicationRolePermission = IConfigurationModel & {
   __typename?: 'ApplicationRolePermission';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export enum ApplicationRoles {
  /** Admin of an Organization */
  Admin = 'ADMIN',
  /** Project Contributors */
  Contributors = 'CONTRIBUTORS',
  /** Guest  */
  Guest = 'GUEST',
  Member = 'MEMBER',
  /**  organization member  */
  OrganizationManager = 'ORGANIZATION_MANAGER',
  /** Owner of an Organization */
  Owner = 'OWNER',
  /** Project Admin */
  ProjectAdmin = 'PROJECT_ADMIN',
  /** Project Viewer */
  ProjectViewer = 'PROJECT_VIEWER',
  TeamMaintainer = 'TEAM_MAINTAINER',
  TeamMember = 'TEAM_MEMBER',
  /** User who is logged in */
  User = 'USER'
}

export type AsanaConnection = {
   __typename?: 'AsanaConnection';
  asana?: Maybe<AsanaConnectionState>;
};

export type AsanaConnectionState = {
   __typename?: 'AsanaConnectionState';
  status?: Maybe<Scalars['String']>;
  user?: Maybe<AsanaUser>;
};

export type AsanaProjects = {
   __typename?: 'AsanaProjects';
  gid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AsanaUser = {
   __typename?: 'AsanaUser';
  user_id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type AsanaWorkspaces = {
   __typename?: 'AsanaWorkspaces';
  gid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type AuthProvider = {
  auth0?: Maybe<IdToken>;
};

export type AuthUser = IUser & {
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

export type AuthUser_Input = {
  auth0UserId?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
};

/** AuthUser fields based on JSON Web Token extraction. */
export type AuthUserRaw = IAuthUser & {
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

export type Client = {
   __typename?: 'Client';
  id?: Maybe<Scalars['ID']>;
  name: NameType;
  companyName?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  clientPhone?: Maybe<ClientPhone>;
  website?: Maybe<Scalars['String']>;
  currency: Scalars['String'];
  socialConnect?: Maybe<SocialConnect>;
  billingAddress?: Maybe<AddressType>;
  shippingAddress?: Maybe<AddressType>;
  orgName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ClientAddRequest = {
  name: Name_Input;
  companyName?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  clientPhone?: Maybe<ClientPhone_Input>;
  website?: Maybe<Scalars['String']>;
  currency: Scalars['String'];
  socialConnect?: Maybe<SocialConnect_Input>;
  billingAddress?: Maybe<AddressType_Input>;
  shippingAddress?: Maybe<AddressType_Input>;
  orgName?: Maybe<Scalars['String']>;
};

export type ClientCounter = {
   __typename?: 'ClientCounter';
  counter?: Maybe<Scalars['Int']>;
};

export type ClientPhone = {
   __typename?: 'ClientPhone';
  workPhone?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
};

export type ClientPhone_Input = {
  workPhone?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
};

export enum ClientTypes {
  Business = 'Business',
  Individuals = 'Individuals'
}

export type ClientUpdateRequest = {
  id?: Maybe<Scalars['String']>;
  payload?: Maybe<UpdatedClient_Input>;
};

export enum ConfigCollectionName {
  Accounts = 'accounts',
  Organizations = 'organizations',
  Workspaces = 'workspaces',
  Teams = 'teams',
  Projects = 'projects',
  Clients = 'clients'
}

export enum ConfigFragmentName {
  Resources = 'resources',
  Settings = 'settings',
  Policies = 'policies',
  ApplicationPolicies = 'applicationPolicies',
  Roles = 'roles',
  ContributionRoles = 'contributionRoles',
  /**  Team Members Document with role value  */
  TeamMembers = 'teamMembers',
  /**  Organization Members Document with role value  */
  OrgMembers = 'orgMembers'
}

export type Configuration = DefaultConfiguration | UserConfiguration | OrganizationConfiguration | OrganizationResourceConfiguration;

export type ConfigurationData = {
   __typename?: 'ConfigurationData';
  defaults?: Maybe<IConfigurationModel>;
  user?: Maybe<IConfigurationModel>;
  organization?: Maybe<IConfigurationModel>;
  resources?: Maybe<Array<Maybe<IConfigurationModel>>>;
  isComplete?: Maybe<Scalars['Boolean']>;
};

export type ConfigurationExtensionInfo = {
   __typename?: 'ConfigurationExtensionInfo';
  id?: Maybe<Scalars['String']>;
};

export type ConfigurationInput = {
  target: Scalars['Int'];
  resource?: Maybe<Scalars['URIInput']>;
};

export type ConfigurationModel = {
   __typename?: 'ConfigurationModel';
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type ConfigurationOverrides = {
   __typename?: 'ConfigurationOverrides';
  resource?: Maybe<Scalars['URI']>;
  overrideIdentifier?: Maybe<Scalars['String']>;
};

export type ConfigurationOverrides_Input = {
  resource?: Maybe<Scalars['URI']>;
  overrideIdentifier?: Maybe<Scalars['String']>;
};

export type ConfigurationPolicy = DefaultPolicy | OrganizationPolicy | ResourcePolicy | ApplicationPolicy;

/**
 * A configuration settings can have one of the following possible scopes.
 * Configuration scopes determine when a settings is available to the user through the Settings editor and
 * whether the setting is applicable. If no scope is declared, the default is `window`.
 */
export enum ConfigurationScope {
  /** Application specific configuration, which can be configured only in local user settings. */
  Application = 'APPLICATION',
  /** Machine specific configuration, which can be configured only in local and remote user settings. */
  Machine = 'MACHINE',
  /** Window specific configuration, which can be configured in the user or organization settings. */
  Window = 'WINDOW',
  /** Resource specific configuration, which can be configured in the user, organization or workspace settings. */
  Resource = 'RESOURCE'
}

export enum ConfigurationTarget {
  /** Targets the user configuration file for writing. */
  User = 'USER',
  UserLocal = 'USER_LOCAL',
  UserRemote = 'USER_REMOTE',
  /** Targets the organization configuration file for writing. This only works if a organization is opened. */
  Organization = 'ORGANIZATION',
  /** Targets the resource configuration file for writing. This only works if a organization is opened. */
  OrganizationResource = 'ORGANIZATION_RESOURCE',
  Default = 'DEFAULT',
  Memory = 'MEMORY'
}

export type ConfigurationUpdateEvent = {
   __typename?: 'ConfigurationUpdateEvent';
  resource: Scalars['URI'];
  contents?: Maybe<Scalars['AnyObject']>;
  overrides?: Maybe<ConfigurationOverrides>;
  target?: Maybe<Scalars['Int']>;
};

/** Contributed Roles added by the user to customize the role's permissions */
export type ContributionRoles = {
   __typename?: 'ContributionRoles';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  permissions?: Maybe<AccessRole>;
};

export type ContributionSettings = {
   __typename?: 'ContributionSettings';
  /**  name of the settings */
  name?: Maybe<Scalars['String']>;
  range?: Maybe<Range>;
  key?: Maybe<Scalars['String']>;
  keyRange?: Maybe<Range>;
  /**  @deprecated  */
  default?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['AnyObject']>;
  valueRange?: Maybe<Range>;
  description?: Maybe<Array<Maybe<Scalars['String']>>>;
  descriptionIsMarkdown?: Maybe<Scalars['Boolean']>;
  descriptionRanges?: Maybe<Array<Maybe<Range>>>;
  overrides?: Maybe<Array<Maybe<ContributionSettings>>>;
  overrideOf?: Maybe<ContributionSettings>;
  deprecationMessage?: Maybe<Scalars['String']>;
  scope?: Maybe<ConfigurationScope>;
  type?: Maybe<Array<Maybe<Scalars['String']>>>;
  enum?: Maybe<Array<Maybe<Scalars['String']>>>;
  enumDescriptions?: Maybe<Array<Maybe<Scalars['String']>>>;
  enumDescriptionsAreMarkdown?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  extensionInfo?: Maybe<ConfigurationExtensionInfo>;
};

/**  Database counter  */
export type Counter = {
   __typename?: 'Counter';
  /**  Current amount  */
  amount: Scalars['Int'];
};

export type CustomerInvoice = {
   __typename?: 'CustomerInvoice';
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<ClientPhone>;
  billingAddress?: Maybe<AddressType>;
  shippingAddress?: Maybe<AddressType>;
};

export type CustomerInvoice_Input = {
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<ClientPhone_Input>;
  billingAddress?: Maybe<AddressType_Input>;
  shippingAddress?: Maybe<AddressType_Input>;
};



export type DefaultConfiguration = IConfigurationModel & {
   __typename?: 'DefaultConfiguration';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /** The URL to the user's settings. */
  resource: Scalars['URI'];
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type DefaultPolicy = IConfigurationModel & {
   __typename?: 'DefaultPolicy';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type DefaultRole = IConfigurationModel & {
   __typename?: 'DefaultRole';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type DefaultSettings = ISettingsSubject & {
   __typename?: 'DefaultSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<Settings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings. */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: SettingsCascade;
};

/**
 * A basic environment service that can be used in various processes,
 * such as main, renderer and shared process. Use subclasses of this
 * service for specific environment.
 */
export type Environment = {
   __typename?: 'Environment';
  args?: Maybe<Scalars['AnyObject']>;
};

export type EnvironmentPayload = {
  args?: Maybe<Scalars['AnyObject']>;
};

export type FieldError = {
   __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GlobalSettings = ISettingsSubject & {
   __typename?: 'GlobalSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<Settings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings.  */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: SettingsCascade;
};

/** Profile based on Auth0Profile */
export type IAuth0UserProfile = {
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

export type IAuthUser = {
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

export type IConfigurationChangeEvent = {
   __typename?: 'IConfigurationChangeEvent';
  source?: Maybe<ConfigurationTarget>;
  affectedKeys?: Maybe<Array<Maybe<Scalars['String']>>>;
  sourceConfig?: Maybe<Scalars['AnyObject']>;
  changedConfiguration?: Maybe<Configuration>;
  changedConfigurationByResource?: Maybe<OrganizationResourceConfiguration>;
};

export type IConfigurationModel = {
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type IdToken = {
  idToken: Scalars['String'];
};

export type IntegraitonConfigurationId = {
   __typename?: 'IntegraitonConfigurationId';
  id?: Maybe<Scalars['String']>;
};

export type IntegrationConfiguration = {
   __typename?: 'IntegrationConfiguration';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  integrationName?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  integrationInfo?: Maybe<Scalars['JSON']>;
};

export type IntegrationConfigurationCreateOrUpdateInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  integrationName?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  integrationInfo?: Maybe<Scalars['JSON']>;
};

export type IntegrationConfigurationFilterInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  integrationName?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type IntegrationConfigurationInput = {
  name?: Maybe<Scalars['String']>;
  integrationName?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  integrationInfo?: Maybe<Scalars['JSON']>;
};

export type InviteMember = {
   __typename?: 'InviteMember';
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
  teamName?: Maybe<Scalars['String']>;
  role?: Maybe<ApplicationRoles>;
  status?: Maybe<InviteStatus>;
};

export enum InviteStatus {
  Pending = 'PENDING',
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED'
}

export type InvoiceCreateRequest = {
  comment?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Float']>;
  from?: Maybe<MemberInvoice_Input>;
  invoiceDate?: Maybe<Scalars['String']>;
  terms?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['String']>;
  invoiceNumber?: Maybe<Scalars['String']>;
  orderNumber?: Maybe<Scalars['String']>;
  invoiceVendor?: Maybe<MemberInvoice_Input>;
  logo?: Maybe<Scalars['String']>;
  paymentStatus?: Maybe<Scalars['Boolean']>;
  projects?: Maybe<Array<Maybe<ProjectInvoice_Input>>>;
  subTotal?: Maybe<Scalars['Float']>;
  tax?: Maybe<Scalars['Float']>;
  subject?: Maybe<Scalars['String']>;
  conditions?: Maybe<Scalars['String']>;
  timezoneOffset?: Maybe<Scalars['Int']>;
  to?: Maybe<CustomerInvoice_Input>;
  total?: Maybe<Scalars['Float']>;
};

export type InvoiceMailRequest = {
  template: Template;
  to: Scalars['String'];
  from: Scalars['String'];
  cc?: Maybe<Scalars['String']>;
  bcc?: Maybe<Scalars['String']>;
  attachments?: Maybe<Array<Maybe<Scalars['AnyObject']>>>;
  subject?: Maybe<Scalars['String']>;
};

export type InvoiceType = {
   __typename?: 'InvoiceType';
  id?: Maybe<Scalars['ID']>;
  comment?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Float']>;
  from?: Maybe<MemberInvoice>;
  invoiceDate?: Maybe<Scalars['String']>;
  terms?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['String']>;
  invoiceNumber?: Maybe<Scalars['String']>;
  orderNumber?: Maybe<Scalars['String']>;
  invoiceVendor?: Maybe<MemberInvoice>;
  logo?: Maybe<Scalars['String']>;
  overdue?: Maybe<Scalars['Boolean']>;
  paymentStatus?: Maybe<Scalars['Boolean']>;
  projects?: Maybe<Array<Maybe<ProjectInvoice>>>;
  sendingStatus?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
  subTotal?: Maybe<Scalars['Float']>;
  tax?: Maybe<Scalars['Float']>;
  subject?: Maybe<Scalars['String']>;
  conditions?: Maybe<Scalars['String']>;
  timezoneOffset?: Maybe<Scalars['Int']>;
  to?: Maybe<CustomerInvoice>;
  total?: Maybe<Scalars['Float']>;
  orgName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type InvoiceUpdateRequest = {
  comment?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  discount?: Maybe<Scalars['Float']>;
  from?: Maybe<MemberInvoice_Input>;
  invoiceDate?: Maybe<Scalars['String']>;
  terms?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['String']>;
  invoiceNumber?: Maybe<Scalars['String']>;
  orderNumber?: Maybe<Scalars['String']>;
  invoiceVendor?: Maybe<MemberInvoice_Input>;
  logo?: Maybe<Scalars['String']>;
  paymentStatus?: Maybe<Scalars['Boolean']>;
  projects?: Maybe<Array<Maybe<ProjectInvoice_Input>>>;
  subTotal?: Maybe<Scalars['Float']>;
  tax?: Maybe<Scalars['Float']>;
  subject?: Maybe<Scalars['String']>;
  conditions?: Maybe<Scalars['String']>;
  timezoneOffset?: Maybe<Scalars['Int']>;
  to?: Maybe<CustomerInvoice_Input>;
  total?: Maybe<Scalars['Float']>;
};

export type IOrgUser = {
  userId: Scalars['String'];
  role?: Maybe<ApplicationRoles>;
  inactive?: Maybe<Scalars['Boolean']>;
};

export type IResourceUserRole = {
  role?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  isSelf?: Maybe<Scalars['Boolean']>;
  orgName?: Maybe<Scalars['String']>;
};

/**
 * ISettingsSubject is something that can have settings: a site ("global settings", which is different from "site
 * configuration"), an organization, or a user.
 */
export type ISettingsSubject = {
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<Settings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings.  */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: SettingsCascade;
};

export type IUser = {
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
export type KeyPathSegment = {
  /**  The name of the property in the object at this location to descend into.  */
  property?: Maybe<Scalars['String']>;
  /**  The index of the array at this location to descend into.  */
  index?: Maybe<Scalars['Int']>;
};

export type LocalUserSettings = ISettingsSubject & {
   __typename?: 'LocalUserSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<Settings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings. */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: SettingsCascade;
};

export type LoginError = {
   __typename?: 'LoginError';
  timeStamp?: Maybe<Scalars['DateTime']>;
  error?: Maybe<Scalars['AnyObject']>;
};

export type MemberInvoice = {
   __typename?: 'MemberInvoice';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<ClientPhone>;
  address?: Maybe<AddressType>;
};

export type MemberInvoice_Input = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<ClientPhone_Input>;
  address?: Maybe<AddressType_Input>;
};

export type MemorySettings = ISettingsSubject & {
   __typename?: 'MemorySettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<Settings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings. */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: SettingsCascade;
};

export type Mutation = {
   __typename?: 'Mutation';
  acceptOrganizationInvitation?: Maybe<Scalars['Boolean']>;
  addClient?: Maybe<Scalars['Boolean']>;
  addContributionRole?: Maybe<Scalars['Boolean']>;
  /**  Increase counter value returns current counter amount  */
  addCounter?: Maybe<Counter>;
  addCounterState?: Maybe<ClientCounter>;
  /**  add Counter  */
  addMoleculerCounter?: Maybe<Counter>;
  addOrgProject?: Maybe<Scalars['Boolean']>;
  addScheduleEvent?: Maybe<Scalars['Boolean']>;
  addTeamMembers?: Maybe<Scalars['Boolean']>;
  addTimelineEvent?: Maybe<Scalars['Boolean']>;
  changeMemberRole?: Maybe<Scalars['Boolean']>;
  changeOrgMemberRole?: Maybe<Scalars['Boolean']>;
  createAuth0User?: Maybe<AuthUser>;
  createIntegrationConfiguration?: Maybe<IntegraitonConfigurationId>;
  createInvoice?: Maybe<Scalars['Boolean']>;
  createOrUpdateIntegrationConfiguration?: Maybe<IntegraitonConfigurationId>;
  createOrganization?: Maybe<Organization>;
  createTeam?: Maybe<AccountTeam>;
  createTimeRecord?: Maybe<Scalars['String']>;
  createTimesheet?: Maybe<Scalars['Boolean']>;
  declineOrganizationInvitation?: Maybe<Scalars['Boolean']>;
  deleteIntegrationConfiguration?: Maybe<Scalars['Boolean']>;
  dummy?: Maybe<Scalars['Int']>;
  initiateConfigurationValue?: Maybe<Scalars['Boolean']>;
  initiatePolicyValue?: Maybe<Scalars['Boolean']>;
  onAuth0UserCreated?: Maybe<Scalars['Boolean']>;
  removeDurationTimeRecords?: Maybe<Scalars['Boolean']>;
  removeInvoice?: Maybe<Scalars['Boolean']>;
  removeOrgClient?: Maybe<Scalars['Boolean']>;
  removeOrgMember?: Maybe<Scalars['Boolean']>;
  removeOrganization?: Maybe<Scalars['Boolean']>;
  removeScheduleEvent?: Maybe<Scalars['Boolean']>;
  removeTeam?: Maybe<Scalars['Boolean']>;
  removeTeamMember?: Maybe<Scalars['Boolean']>;
  removeTimeRecord?: Maybe<Scalars['Boolean']>;
  removeTimelineEvent?: Maybe<Scalars['Boolean']>;
  removeTimesheet?: Maybe<Scalars['Boolean']>;
  resendOrganizationInvitation?: Maybe<Scalars['Boolean']>;
  sendInvoiceMail?: Maybe<Scalars['Boolean']>;
  sendOrganizationInvitation?: Maybe<Scalars['Boolean']>;
  setSettingsValueByResource?: Maybe<Scalars['Boolean']>;
  /**  sync cached counter with current value  */
  syncCachedCounter?: Maybe<Scalars['Boolean']>;
  updateConfigurationPolicyValue?: Maybe<Scalars['Boolean']>;
  updateConfigurationPolicyValueByUri?: Maybe<Scalars['Boolean']>;
  updateConfigurationValue?: Maybe<Scalars['Boolean']>;
  updateConfigurationValueByUri?: Maybe<Scalars['Boolean']>;
  updateInvoice?: Maybe<Scalars['Boolean']>;
  updateOrgClient?: Maybe<Client>;
  updateOrgMemberTeams?: Maybe<Scalars['Boolean']>;
  updateOrgProject?: Maybe<Scalars['Boolean']>;
  updateOrganization?: Maybe<Organization>;
  updateOrganizationContextAddResources?: Maybe<Array<Maybe<OrganizationResourceData>>>;
  updateOrganizationContextRemoveResources?: Maybe<Array<Maybe<OrganizationResourceData>>>;
  updateOrganizationContextUpdateResources?: Maybe<Array<Maybe<OrganizationResourceData>>>;
  updateProjectStatus?: Maybe<Scalars['Boolean']>;
  updateRoleValue?: Maybe<Scalars['Boolean']>;
  updateScheduleEvent?: Maybe<Scalars['Boolean']>;
  updateTimeRecord?: Maybe<Scalars['Boolean']>;
  updateTimelineEvent?: Maybe<Scalars['Boolean']>;
  updateTimesheet?: Maybe<Scalars['Boolean']>;
  updateTimesheetStatus?: Maybe<Scalars['Boolean']>;
  upsertProjectThroughIntegration?: Maybe<Projects>;
};


export type MutationAcceptOrganizationInvitationArgs = {
  id: Scalars['ID'];
  notification?: Maybe<OrganizationNotificationValues>;
};


export type MutationAddClientArgs = {
  client: ClientAddRequest;
};


export type MutationAddContributionRoleArgs = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
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


export type MutationAddOrgProjectArgs = {
  project: ProjectAddRequest;
};


export type MutationAddScheduleEventArgs = {
  request?: Maybe<ScheduleCreateRequest>;
};


export type MutationAddTeamMembersArgs = {
  orgName: Scalars['String'];
  teamName: Scalars['String'];
  memberIds: Array<Maybe<Scalars['String']>>;
};


export type MutationAddTimelineEventArgs = {
  request?: Maybe<TimelineCreateRequest>;
};


export type MutationChangeMemberRoleArgs = {
  orgName: Scalars['String'];
  teamName: Scalars['String'];
  memberId: Scalars['String'];
  role: Scalars['String'];
};


export type MutationChangeOrgMemberRoleArgs = {
  userId: Scalars['String'];
  role: ApplicationRoles;
};


export type MutationCreateAuth0UserArgs = {
  authProvider?: Maybe<AuthProvider>;
  userInfo?: Maybe<UserInfo>;
};


export type MutationCreateIntegrationConfigurationArgs = {
  data?: Maybe<IntegrationConfigurationInput>;
};


export type MutationCreateInvoiceArgs = {
  invoice: InvoiceCreateRequest;
};


export type MutationCreateOrUpdateIntegrationConfigurationArgs = {
  data?: Maybe<IntegrationConfigurationCreateOrUpdateInput>;
};


export type MutationCreateOrganizationArgs = {
  organization: OrganizationCreateRequest;
};


export type MutationCreateTeamArgs = {
  request: TeamCreationRequest;
};


export type MutationCreateTimeRecordArgs = {
  request?: Maybe<TimeRecordRequest>;
};


export type MutationCreateTimesheetArgs = {
  request?: Maybe<TimesheetCreateRequest>;
};


export type MutationDeclineOrganizationInvitationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteIntegrationConfigurationArgs = {
  id: Scalars['String'];
};


export type MutationInitiateConfigurationValueArgs = {
  resource?: Maybe<Scalars['URI']>;
};


export type MutationInitiatePolicyValueArgs = {
  resource?: Maybe<Scalars['URI']>;
};


export type MutationRemoveDurationTimeRecordsArgs = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  projectId?: Maybe<Scalars['String']>;
};


export type MutationRemoveInvoiceArgs = {
  id?: Maybe<Scalars['String']>;
};


export type MutationRemoveOrgClientArgs = {
  clientId: Scalars['String'];
};


export type MutationRemoveOrgMemberArgs = {
  memberId: Scalars['String'];
};


export type MutationRemoveOrganizationArgs = {
  organization: OrganizationRemoveRequest;
};


export type MutationRemoveScheduleEventArgs = {
  eventId?: Maybe<Scalars['String']>;
};


export type MutationRemoveTeamArgs = {
  teamId: Scalars['String'];
};


export type MutationRemoveTeamMemberArgs = {
  orgName: Scalars['String'];
  teamName: Scalars['String'];
  memberId: Scalars['String'];
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


export type MutationResendOrganizationInvitationArgs = {
  id: Scalars['ID'];
};


export type MutationSendInvoiceMailArgs = {
  request: InvoiceMailRequest;
};


export type MutationSendOrganizationInvitationArgs = {
  request?: Maybe<OrganizationInvitationRequest>;
};


export type MutationSetSettingsValueByResourceArgs = {
  uri?: Maybe<Scalars['URI']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};


export type MutationUpdateConfigurationPolicyValueArgs = {
  key: Scalars['String'];
  value: Scalars['AnyObject'];
  overrides?: Maybe<ConfigurationOverrides_Input>;
  target?: Maybe<Scalars['Int']>;
  donotNotifyError?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateConfigurationPolicyValueByUriArgs = {
  resource?: Maybe<Scalars['URI']>;
  key: Scalars['String'];
  value: Scalars['AnyObject'];
  overrides?: Maybe<ConfigurationOverrides_Input>;
  target?: Maybe<Scalars['Int']>;
  donotNotifyError?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateConfigurationValueArgs = {
  key: Scalars['String'];
  value: Scalars['AnyObject'];
  overrides?: Maybe<ConfigurationOverrides_Input>;
  target?: Maybe<Scalars['Int']>;
  donotNotifyError?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateConfigurationValueByUriArgs = {
  resource?: Maybe<Scalars['URI']>;
  key: Scalars['String'];
  value: Scalars['AnyObject'];
  overrides?: Maybe<ConfigurationOverrides_Input>;
  target?: Maybe<Scalars['Int']>;
  donotNotifyError?: Maybe<Scalars['Boolean']>;
};


export type MutationUpdateInvoiceArgs = {
  id?: Maybe<Scalars['String']>;
  invoice?: Maybe<InvoiceUpdateRequest>;
};


export type MutationUpdateOrgClientArgs = {
  updateRequest?: Maybe<ClientUpdateRequest>;
};


export type MutationUpdateOrgMemberTeamsArgs = {
  userId: Scalars['String'];
  orgName: Scalars['String'];
  addToTeams?: Maybe<Array<Maybe<Scalars['String']>>>;
  removeFromTeams?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationUpdateOrgProjectArgs = {
  where: ProjectWhereInput;
  project?: Maybe<UpdateProject_Input>;
};


export type MutationUpdateOrganizationArgs = {
  organization: OrganizationUpdateRequest;
};


export type MutationUpdateOrganizationContextAddResourcesArgs = {
  orgId?: Maybe<Scalars['String']>;
  resourcesToAdd: Array<Maybe<OrganizationResourceCreationData_Input>>;
  index?: Maybe<Scalars['Int']>;
};


export type MutationUpdateOrganizationContextRemoveResourcesArgs = {
  resourcesToRemove: Array<Scalars['URI']>;
};


export type MutationUpdateOrganizationContextUpdateResourcesArgs = {
  resourcesToAdd: Array<Maybe<OrganizationResourceCreationData_Input>>;
  resourcesToRemove: Array<Maybe<Scalars['URI']>>;
  index?: Maybe<Scalars['Int']>;
};


export type MutationUpdateProjectStatusArgs = {
  id: Scalars['String'];
  status?: Maybe<Scalars['String']>;
};


export type MutationUpdateRoleValueArgs = {
  key: Scalars['String'];
  value: Scalars['AnyObject'];
  overrides?: Maybe<ConfigurationOverrides_Input>;
  target?: Maybe<Scalars['Int']>;
  donotNotifyError?: Maybe<Scalars['Boolean']>;
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


export type MutationUpdateTimesheetStatusArgs = {
  sheetId?: Maybe<Scalars['String']>;
  state?: Maybe<TimesheetState>;
};


export type MutationUpsertProjectThroughIntegrationArgs = {
  where: ProjectWhereInput;
  project?: Maybe<UpdateProject_Input>;
};

export type Name_Input = {
  salutation?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type NameType = {
   __typename?: 'NameType';
  salutation?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type Node = {
  id: Scalars['ID'];
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
export enum OrgainizationInvitationRole {
  Admin = 'ADMIN',
  Reinstate = 'REINSTATE',
  DirectMember = 'DIRECT_MEMBER',
  BillingManager = 'BILLING_MANAGER'
}

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
export type Organization = {
   __typename?: 'Organization';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  stripeId?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  orgUserCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  orgMembers?: Maybe<Array<Maybe<OrgUser>>>;
  periodStart?: Maybe<Scalars['DateTime']>;
  periodStop?: Maybe<Scalars['DateTime']>;
  billingLeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  billingEmail?: Maybe<Scalars['String']>;
  isBillingLeader?: Maybe<Scalars['Boolean']>;
  mainBilingLeaderId?: Maybe<Scalars['String']>;
  stripeSubscriptionId?: Maybe<Scalars['String']>;
  invitations?: Maybe<Array<Maybe<OrganizationInvitation>>>;
};

export type Organization_Input = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  stripeId?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  orgUserCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  orgMembers?: Maybe<Array<Maybe<OrgUser_Input>>>;
  periodStart?: Maybe<Scalars['DateTime']>;
  periodStop?: Maybe<Scalars['DateTime']>;
  billingLeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  billingEmail?: Maybe<Scalars['String']>;
  isBillingLeader?: Maybe<Scalars['Boolean']>;
  mainBilingLeaderId?: Maybe<Scalars['String']>;
  stripeSubscriptionId?: Maybe<Scalars['String']>;
  invitations?: Maybe<Array<Maybe<OrganizationInvitation_Input>>>;
};

export type OrganizationConfiguration = IConfigurationModel & {
   __typename?: 'OrganizationConfiguration';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  resource: Scalars['URI'];
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type OrganizationConfigValue_Input = {
  section?: Maybe<Scalars['String']>;
  overrides?: Maybe<ConfigurationOverrides_Input>;
};

/** Subscription event for context */
export enum OrganizationContextPubSubEvents {
  OrganizationContextUpdated = 'OrganizationContextUpdated',
  OrganizationPolicyUpdated = 'OrganizationPolicyUpdated',
  OrganizationConfigurationUpdated = 'OrganizationConfigurationUpdated',
  OrganizationPermissionUpdated = 'OrganizationPermissionUpdated'
}

export type OrganizationCreateRequest = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  namespace?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  orgMembers?: Maybe<Array<Maybe<OrgUser_Input>>>;
  billingLeaders?: Maybe<Array<Maybe<Scalars['String']>>>;
  mainBillingLeaderId?: Maybe<Scalars['String']>;
  periodStart?: Maybe<Scalars['DateTime']>;
  periodStop?: Maybe<Scalars['DateTime']>;
  stripeId?: Maybe<Scalars['String']>;
  stripeSubscriptionId?: Maybe<Scalars['String']>;
  invitations?: Maybe<Array<Maybe<OrganizationInvitation_Input>>>;
};

export type OrganizationData = {
   __typename?: 'OrganizationData';
  /** The unique identifier of the workspace. */
  id: Scalars['String'];
  /** Resources in the organization. */
  resources?: Maybe<Array<Maybe<OrganizationResourceData>>>;
  /** The location of the organization configuration */
  configuration?: Maybe<Scalars['URI']>;
  /** Organization name */
  name?: Maybe<Scalars['String']>;
};

export type OrganizationIdentifier = {
   __typename?: 'OrganizationIdentifier';
  id?: Maybe<Scalars['String']>;
  configPath?: Maybe<Scalars['URI']>;
};

export type OrganizationInvitation = {
   __typename?: 'OrganizationInvitation';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
  role?: Maybe<ApplicationRoles>;
  active?: Maybe<Scalars['Boolean']>;
  fullName?: Maybe<Scalars['String']>;
  inviteCount?: Maybe<Scalars['Int']>;
  invitedBy?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  acceptedAt?: Maybe<Scalars['DateTime']>;
  tokenExpiration?: Maybe<Scalars['DateTime']>;
};

export type OrganizationInvitation_Input = {
  email?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
  role?: Maybe<ApplicationRoles>;
  active?: Maybe<Scalars['Boolean']>;
  fullName?: Maybe<Scalars['String']>;
  inviteCount?: Maybe<Scalars['Int']>;
  invitedBy?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  acceptedAt?: Maybe<Scalars['DateTime']>;
  tokenExpiration?: Maybe<Scalars['DateTime']>;
};

export type OrganizationInvitationDecode = {
   __typename?: 'OrganizationInvitationDecode';
  orgName?: Maybe<Scalars['String']>;
  teamName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  invitationId?: Maybe<Scalars['String']>;
  invitedBy?: Maybe<Scalars['String']>;
};

export type OrganizationInvitationRequest = {
  teamId?: Maybe<Scalars['String']>;
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  invitedBy?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
};

export type OrganizationMember = {
   __typename?: 'OrganizationMember';
  id?: Maybe<Scalars['String']>;
  user?: Maybe<AuthUser>;
  isBillingLeader?: Maybe<Scalars['Boolean']>;
  organization?: Maybe<Organization>;
};

export type OrganizationNotificationValues = {
  notifyOrgManagersOnUserJoined?: Maybe<Scalars['Boolean']>;
  notifyOrgOwnerOnUserJoined?: Maybe<Scalars['Boolean']>;
};

export type OrganizationPolicy = IConfigurationModel & {
   __typename?: 'OrganizationPolicy';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type OrganizationRemoveRequest = {
  orgName?: Maybe<Scalars['String']>;
  requestedUserId?: Maybe<Scalars['String']>;
};

export type OrganizationResourceConfiguration = IConfigurationModel & {
   __typename?: 'OrganizationResourceConfiguration';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  resource: Scalars['URI'];
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type OrganizationResourceCreationData_Input = {
  uri: Scalars['URI'];
  name?: Maybe<Scalars['String']>;
};

export type OrganizationResourceData = {
   __typename?: 'OrganizationResourceData';
  /** The associated URI for this workspace folder. */
  uri?: Maybe<Scalars['URI']>;
  /** The name of this workspace folder. Defaults to the basename its [uri-path](#Uri.path) */
  name?: Maybe<Scalars['String']>;
  /** The ordinal number of this workspace folder. */
  index?: Maybe<Scalars['Int']>;
};

export type OrganizationResourceSettings = ISettingsSubject & {
   __typename?: 'OrganizationResourceSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<Settings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings. */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: SettingsCascade;
};

export type OrganizationRole = IConfigurationModel & {
   __typename?: 'OrganizationRole';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type OrganizationSettings = ISettingsSubject & {
   __typename?: 'OrganizationSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<Settings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings. */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: SettingsCascade;
};

export type OrganizationUpdateRequest = {
  id?: Maybe<Scalars['String']>;
  requestedUserId?: Maybe<Scalars['String']>;
  payload?: Maybe<Organization_Input>;
};

export type OrgDetailWhere = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type OrgMember = {
   __typename?: 'OrgMember';
  _id?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  role?: Maybe<ApplicationRoles>;
  inactive?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  crossCheckEmail?: Maybe<Scalars['String']>;
  teamNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type OrgUser = IOrgUser & {
   __typename?: 'OrgUser';
  userId: Scalars['String'];
  role?: Maybe<ApplicationRoles>;
  inactive?: Maybe<Scalars['Boolean']>;
  orgName: Scalars['String'];
  user: OrgUserAccunt;
  isSelf: Scalars['Boolean'];
  crossCheckEmail?: Maybe<Scalars['String']>;
};

export type OrgUser_Input = {
  userId?: Maybe<Scalars['String']>;
  role?: Maybe<ApplicationRoles>;
  inactive?: Maybe<Scalars['Boolean']>;
  crossCheckEmail?: Maybe<Scalars['String']>;
};

export type OrgUserAccunt = Node & {
   __typename?: 'OrgUserAccunt';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  alias?: Maybe<Array<Maybe<Scalars['String']>>>;
  username?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
};

export enum OrgUserRole {
  BillingLeader = 'BILLING_LEADER',
  Member = 'MEMBER',
  Admin = 'ADMIN',
  Owner = 'OWNER'
}

export type Overrides = {
   __typename?: 'Overrides';
  contents?: Maybe<Scalars['AnyObject']>;
  identifiers?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum PermissionAction {
  Create = 'Create',
  Delete = 'Delete',
  Edit = 'Edit',
  Invite = 'Invite',
  Manage = 'Manage',
  View = 'View'
}

export enum PermissionResource {
  Members = 'Members',
  Organization = 'Organization',
  Permissions = 'Permissions',
  Roles = 'Roles',
  Settings = 'Settings',
  Teams = 'Teams'
}

export type PermissionSubject = {
   __typename?: 'PermissionSubject';
  /**  The URL to the roles.  */
  roleURL: Scalars['URI'];
  /** The time when this was created. */
  createdAt?: Maybe<Scalars['String']>;
  /** The stringified JSON contents of the permissions. */
  permissions: Scalars['AnyObject'];
};

export enum PermissionType {
  Allow = 'Allow',
  Deny = 'Deny',
  NotSet = 'NotSet'
}

export type PolicySubject = {
   __typename?: 'PolicySubject';
  /**  The URL to the policies.  */
  policyURL: Scalars['URI'];
  /** The time when this was created. */
  createdAt?: Maybe<Scalars['String']>;
  /** The stringified JSON contents of the permissions. */
  policies: Scalars['AnyObject'];
};

export enum PortalLanguage {
  English = 'English',
  Hindi = 'Hindi',
  Gujarati = 'Gujarati',
  Spanish = 'Spanish',
  Russian = 'Russian'
}

export type Position = {
   __typename?: 'Position';
  line?: Maybe<Scalars['Int']>;
  character?: Maybe<Scalars['Int']>;
};

export enum PreDefinedRole {
  Owner = 'OWNER',
  Admin = 'ADMIN',
  Maintainer = 'MAINTAINER',
  Member = 'MEMBER',
  ProjectAdmin = 'PROJECT_ADMIN',
  BillingLeader = 'BILLING_LEADER',
  DirectMember = 'DIRECT_MEMBER',
  Viewer = 'VIEWER',
  Guest = 'GUEST',
  Contributors = 'CONTRIBUTORS'
}

export type Preference_Account = {
   __typename?: 'Preference_Account';
  default?: Maybe<Preference_Default>;
  notification?: Maybe<Preference_Notification>;
};

export type Preference_Default = {
   __typename?: 'Preference_Default';
  organization?: Maybe<Scalars['String']>;
};

export type Preference_Notification = {
   __typename?: 'Preference_Notification';
  billing?: Maybe<Scalars['Boolean']>;
  primaryEmail?: Maybe<Scalars['String']>;
  onChangeAccountSettings?: Maybe<Scalars['Boolean']>;
};

export type Preference_Organization = {
   __typename?: 'Preference_Organization';
  teams?: Maybe<Preference_Teams>;
  project?: Maybe<Preference_Project>;
};

export type Preference_Project = {
   __typename?: 'Preference_Project';
  visibility?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['String']>;
};

export type Preference_Teams = {
   __typename?: 'Preference_Teams';
  visibility?: Maybe<Visibility>;
};

export type PreferenceItem = {
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

export type Preferences = {
   __typename?: 'Preferences';
  account?: Maybe<Preference_Account>;
  defaultSetting?: Maybe<Array<Maybe<SettingsGroup>>>;
  dummy?: Maybe<Scalars['Int']>;
  organization?: Maybe<Preference_Organization>;
};

export type PreferencesResponse = {
   __typename?: 'PreferencesResponse';
  preferences?: Maybe<Array<Maybe<PreferencesType>>>;
};

export type PreferencesType = {
   __typename?: 'PreferencesType';
  type?: Maybe<Scalars['String']>;
  data?: Maybe<Array<Maybe<ContributionSettings>>>;
};

export type Project_Output = {
   __typename?: 'Project_Output';
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  clientId?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  integrationConfigurationId?: Maybe<Scalars['String']>;
};

export type ProjectAddRequest = {
  name: Scalars['String'];
  clientId?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Maybe<Scalars['String']>>>;
  orgName?: Maybe<Scalars['String']>;
  integrationConfigurationId?: Maybe<Scalars['String']>;
};

export type ProjectInvoice = {
   __typename?: 'ProjectInvoice';
  id?: Maybe<Scalars['ID']>;
  hours?: Maybe<Scalars['Int']>;
  projectName?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['Float']>;
  subTotal?: Maybe<Scalars['Float']>;
};

export type ProjectInvoice_Input = {
  hours?: Maybe<Scalars['Int']>;
  projectName?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['Float']>;
  subTotal?: Maybe<Scalars['Float']>;
};

export type Projects = {
   __typename?: 'Projects';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  clientId?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Maybe<Scalars['String']>>>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<ProjectType>;
  integrationConfigurationId?: Maybe<Scalars['String']>;
  /**  Predefined Project template   */
  templateId?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
};

export enum ProjectType {
  Internal = 'internal',
  Others = 'others',
  Asana = 'asana'
}

export type ProjectWhereInput = {
  id?: Maybe<Scalars['String']>;
  integrationConfigurationId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  /**  Counter  */
  counter?: Maybe<Counter>;
  /**  Counter from Datasource  */
  counterCache?: Maybe<Counter>;
  counterState?: Maybe<ClientCounter>;
  decodeOrganizationInvitation?: Maybe<OrganizationInvitationDecode>;
  /** Return the permissions groups */
  defaultPermissions?: Maybe<Array<Maybe<SettingsGroup>>>;
  /** Return the Policies groups */
  defaultPolicies?: Maybe<Array<Maybe<SettingsGroup>>>;
  /**
   * Default Preferences 
   * @deprecated not used
   */
  defaultPreferences?: Maybe<PreferencesResponse>;
  defaultSetting?: Maybe<ContributionSettings>;
  /**
   * The default settings for the requested ConfigurationTarget
   * Note: Due to bug in graphql we using  `target: Int` argument instead of  `target:ConfigurationTarget`
   * https://github.com/apollographql/apollo-server/issues/2556
   */
  defaultViewerSettingsSubject: DefaultSettings;
  dummy?: Maybe<Scalars['Int']>;
  fetchAuth0User?: Maybe<AuthUser>;
  filterIntegrationConfiguration?: Maybe<Array<Maybe<IntegrationConfiguration>>>;
  getAccounts?: Maybe<Array<Maybe<UserAccount>>>;
  getAllIntegrationConfigurations?: Maybe<Array<Maybe<IntegrationConfiguration>>>;
  getAsanaConnectionState?: Maybe<AsanaConnection>;
  getAsanaWorkspaceProjects?: Maybe<Array<Maybe<AsanaProjects>>>;
  getAsanaWorkspaces?: Maybe<Array<Maybe<AsanaWorkspaces>>>;
  getConfiguration?: Maybe<Array<Maybe<Configuration>>>;
  getConfigurationData?: Maybe<ConfigurationData>;
  getConfigurationPolicies?: Maybe<Array<Maybe<ConfigurationPolicy>>>;
  getContributionRoles?: Maybe<Array<Maybe<ContributionRoles>>>;
  getDefaultInvoiceNumber?: Maybe<Scalars['String']>;
  getDurationTimeRecords?: Maybe<Array<Maybe<TimeRecord>>>;
  getDurationTimesheets?: Maybe<Array<Maybe<TimesheetResponse>>>;
  getEnvironment?: Maybe<Environment>;
  getFilteredProjects?: Maybe<Array<Maybe<Projects>>>;
  getIntegrationConfiguration?: Maybe<IntegrationConfiguration>;
  getInvoices?: Maybe<Array<Maybe<InvoiceType>>>;
  getManageableOrganizations?: Maybe<Array<Maybe<Organization>>>;
  getOrgInvitationMembers?: Maybe<Array<Maybe<InviteMember>>>;
  getOrgTeamInvitations?: Maybe<Array<Maybe<OrganizationInvitation>>>;
  getOrganizationClients?: Maybe<Array<Maybe<Client>>>;
  getOrganizationConfigValue?: Maybe<Scalars['AnyObject']>;
  getOrganizationDetail?: Maybe<Organization>;
  getOrganizationDetailUnsecured?: Maybe<Organization>;
  getOrganizationInvitation?: Maybe<OrganizationInvitation>;
  getOrganizationMembers?: Maybe<Array<Maybe<OrgMember>>>;
  getOrganizationResourceContext?: Maybe<OrganizationData>;
  getOrganizationTeams?: Maybe<Array<Maybe<AccountTeam>>>;
  getPlayingTimeRecord?: Maybe<TimeRecord>;
  getProjects?: Maybe<Array<Maybe<Project_Output>>>;
  getRole?: Maybe<AccessRole>;
  getRoles?: Maybe<Array<Maybe<AccessRole>>>;
  getScheduleEvents?: Maybe<Array<Maybe<Schedule>>>;
  getSettings?: Maybe<Settings>;
  getTags?: Maybe<Array<Maybe<Tag>>>;
  getTeam?: Maybe<AccountTeam>;
  getTimeRecords?: Maybe<Array<Maybe<TimeRecord>>>;
  getTimelineEvents?: Maybe<Array<Maybe<Timeline>>>;
  getTimesheets?: Maybe<Array<Maybe<TimesheetResponse>>>;
  getUserAccessRole?: Maybe<ResourceAccessRole>;
  getUserAccount?: Maybe<UserAccount>;
  getUserOrganizations?: Maybe<Array<Maybe<Organization>>>;
  getUserOrganizationsWithRole?: Maybe<Array<Maybe<Organization>>>;
  getUsers?: Maybe<Array<Maybe<UserAccount>>>;
  /** Get the available roles and its descriptions */
  getViewerPermissions?: Maybe<PermissionSubject>;
  /** Get the available policies and its descriptions */
  getViewerPolicies?: Maybe<PolicySubject>;
  /** Shortcut way to send merged defautPermissions with applicaiton role's permission. */
  mergedApplicationPermissions?: Maybe<Array<Maybe<ContributionSettings>>>;
  /**  Moleculer Counter  */
  moleculerCounter?: Maybe<Counter>;
  organizations?: Maybe<Array<Maybe<Organization>>>;
  team?: Maybe<AccountTeam>;
  teams?: Maybe<Array<Maybe<AccountTeam>>>;
  /**
   * The settings for the viewer. The viewer is either an anonymous visitor (in which case viewer settings is
   * global settings) or an authenticated user (in which case viewer settings are the user's settings).
   */
  viewerSettings: ViewerSettingsSubject;
};


export type QueryDecodeOrganizationInvitationArgs = {
  token: Scalars['String'];
};


export type QueryDefaultPermissionsArgs = {
  target?: Maybe<Scalars['Int']>;
};


export type QueryDefaultPoliciesArgs = {
  target?: Maybe<Scalars['Int']>;
};


export type QueryDefaultViewerSettingsSubjectArgs = {
  target?: Maybe<Scalars['Int']>;
};


export type QueryFetchAuth0UserArgs = {
  auth0UserId: Scalars['String'];
};


export type QueryFilterIntegrationConfigurationArgs = {
  filter?: Maybe<IntegrationConfigurationFilterInput>;
};


export type QueryGetAccountsArgs = {
  where?: Maybe<UserAccountWhere>;
};


export type QueryGetAsanaWorkspaceProjectsArgs = {
  workspaceId: Scalars['String'];
};


export type QueryGetConfigurationArgs = {
  input?: Maybe<Array<Maybe<ConfigurationInput>>>;
};


export type QueryGetConfigurationPoliciesArgs = {
  input?: Maybe<Array<Maybe<ConfigurationInput>>>;
};


export type QueryGetDurationTimeRecordsArgs = {
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetDurationTimesheetsArgs = {
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
};


export type QueryGetFilteredProjectsArgs = {
  filter: ProjectWhereInput;
};


export type QueryGetIntegrationConfigurationArgs = {
  id: Scalars['String'];
};


export type QueryGetOrgTeamInvitationsArgs = {
  teamId?: Maybe<Scalars['String']>;
};


export type QueryGetOrganizationConfigValueArgs = {
  value?: Maybe<OrganizationConfigValue_Input>;
};


export type QueryGetOrganizationDetailArgs = {
  where: OrgDetailWhere;
};


export type QueryGetOrganizationDetailUnsecuredArgs = {
  where: OrgDetailWhere;
};


export type QueryGetOrganizationInvitationArgs = {
  id: Scalars['ID'];
};


export type QueryGetOrganizationResourceContextArgs = {
  orgId?: Maybe<Scalars['String']>;
};


export type QueryGetOrganizationTeamsArgs = {
  orgName?: Maybe<Scalars['String']>;
};


export type QueryGetRoleArgs = {
  input?: Maybe<RoleInput>;
};


export type QueryGetRolesArgs = {
  input?: Maybe<Array<Maybe<RoleInput>>>;
};


export type QueryGetScheduleEventsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetTeamArgs = {
  orgName: Scalars['String'];
  teamName: Scalars['String'];
};


export type QueryGetTimeRecordsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetTimelineEventsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetTimesheetsArgs = {
  userId?: Maybe<Scalars['String']>;
  withTotalHours?: Maybe<Scalars['Boolean']>;
};


export type QueryGetUserAccessRoleArgs = {
  input?: Maybe<Array<Maybe<RoleInput>>>;
};


export type QueryGetUserAccountArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserOrganizationsArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetUserOrganizationsWithRoleArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetUsersArgs = {
  where?: Maybe<UserAccountWhere>;
};


export type QueryGetViewerPermissionsArgs = {
  input?: Maybe<RoleInput>;
};


export type QueryGetViewerPoliciesArgs = {
  input?: Maybe<ConfigurationInput>;
};


export type QueryMergedApplicationPermissionsArgs = {
  roleName?: Maybe<Scalars['String']>;
};


export type QueryTeamArgs = {
  teamId: Scalars['ID'];
};


export type QueryViewerSettingsArgs = {
  input?: Maybe<ViewerSettingsInput>;
};

export type Range = {
   __typename?: 'Range';
  /**
   * @lsp
   * The range's start position.
   */
  start?: Maybe<Position>;
  /**
   * @lsp
   * The range's end position.
   */
  end?: Maybe<Position>;
  /** @editor - Line number on which the range starts (starts at 1). */
  startLineNumber?: Maybe<Scalars['Int']>;
  /** @editor - Column on which the range starts in the line `startLineNumber` (starts at 1). */
  startColumn?: Maybe<Scalars['Int']>;
  /** @editor - Line number on which the range ends. */
  endLineNumber?: Maybe<Scalars['Int']>;
  /** @editor - Column on which the range ends in the line `endLineNumber` */
  endColumn?: Maybe<Scalars['Int']>;
};

export type RemoteUserSettings = ISettingsSubject & {
   __typename?: 'RemoteUserSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**  The latest settings.  */
  latestSettings?: Maybe<Settings>;
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /**  Whether the viewer can modify the subject's settings. */
  viewerCanAdminister: Scalars['Boolean'];
  /**
   * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
   * that were merged to produce the final merged settings.
   */
  settingsCascade: SettingsCascade;
};

export type ResourceAccessRole = {
   __typename?: 'ResourceAccessRole';
  accessRoles?: Maybe<Array<Maybe<AccessRole>>>;
  resourceUserRoles?: Maybe<Array<Maybe<ResourceUser>>>;
};

export type ResourcePolicy = IConfigurationModel & {
   __typename?: 'ResourcePolicy';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type ResourceRole = IConfigurationModel & {
   __typename?: 'ResourceRole';
  resource?: Maybe<Scalars['URI']>;
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type ResourceUser = IResourceUserRole & {
   __typename?: 'ResourceUser';
  resource?: Maybe<Scalars['URI']>;
  role?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  isSelf?: Maybe<Scalars['Boolean']>;
  orgName?: Maybe<Scalars['String']>;
};

export enum Role {
  Admin = 'ADMIN',
  Reviewer = 'REVIEWER',
  User = 'USER',
  Unknown = 'UNKNOWN'
}

export type RoleInput = {
  target: Scalars['Int'];
  resource?: Maybe<Scalars['URIInput']>;
  roleName?: Maybe<Scalars['String']>;
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

/** Settings is a version of a configuration settings file. */
export type Settings = {
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
export type SettingsCascade = {
   __typename?: 'SettingsCascade';
  /**
   * The other settings subjects that are applied with lower precedence that this subject to
   * form the final merged settings. For example, a user in 2 organizations would have the following
   * settings subjects: site (global settings), org 1, org 2 and the user.
   */
  subjects?: Maybe<Array<Maybe<SettingsSubject>>>;
  /** The effective final merged settings as (stringified) JSON, merged from all of the subjects. */
  final?: Maybe<Scalars['String']>;
  /** The effective final merged settings as Object, merged from all of the subjects. */
  finalConfiguration?: Maybe<Preferences>;
};

export type SettingsGroup = {
   __typename?: 'SettingsGroup';
  id?: Maybe<Scalars['String']>;
  range?: Maybe<Range>;
  title?: Maybe<Scalars['String']>;
  titleRange?: Maybe<Range>;
  sections?: Maybe<Array<Maybe<SettingsSection>>>;
  contributedByExtension?: Maybe<Scalars['Boolean']>;
};

export type SettingsSection = {
   __typename?: 'SettingsSection';
  titleRange?: Maybe<Range>;
  title?: Maybe<Scalars['String']>;
  settings?: Maybe<Array<Maybe<ContributionSettings>>>;
};

export type SettingsSubject = UserSettings | LocalUserSettings | RemoteUserSettings | OrganizationResourceSettings | GlobalSettings | OrganizationSettings | MemorySettings | DefaultSettings;

export enum SettingValueType {
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
}

export type SocialConnect = {
   __typename?: 'SocialConnect';
  facebook?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
};

export type SocialConnect_Input = {
  facebook?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
};

export enum StartYearWeekType {
  FirstFourdayWeek = 'FIRST_FOURDAY_WEEK',
  FirstFullWeek = 'FIRST_FULL_WEEK',
  FirstDayWeek = 'FIRST_DAY_WEEK'
}

export type SubscribedOrganizationData = {
   __typename?: 'SubscribedOrganizationData';
  /** Resources in the organization. */
  resources?: Maybe<Array<Maybe<OrganizationResourceData>>>;
  orgNameFilter?: Maybe<Scalars['String']>;
};

export type Subscription = {
   __typename?: 'Subscription';
  SubscribeToConfigurationUpdate?: Maybe<ConfigurationUpdateEvent>;
  SubscribeToOrganizationContext?: Maybe<SubscribedOrganizationData>;
  SubscribeToPermissionUpdate?: Maybe<ConfigurationUpdateEvent>;
  SubscribeToPolicyUpdate?: Maybe<ConfigurationUpdateEvent>;
  /**  Subscription fired when anyone increases counter  */
  counterUpdated?: Maybe<Counter>;
  dummy?: Maybe<Scalars['Int']>;
  moleculerCounterUpdate?: Maybe<Counter>;
};


export type SubscriptionSubscribeToConfigurationUpdateArgs = {
  orgName: Scalars['String'];
};


export type SubscriptionSubscribeToOrganizationContextArgs = {
  orgNameFilter?: Maybe<Scalars['String']>;
};


export type SubscriptionSubscribeToPermissionUpdateArgs = {
  orgName?: Maybe<Scalars['String']>;
};


export type SubscriptionSubscribeToPolicyUpdateArgs = {
  orgName?: Maybe<Scalars['String']>;
};

export type Tag = {
   __typename?: 'Tag';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Task = {
   __typename?: 'Task';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type TeamCreateRequest = {
  name: Scalars['String'];
  orgName: Scalars['String'];
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  teamMembers?: Maybe<Array<Maybe<TeamMember_Input>>>;
  parentTeam?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type TeamCreationRequest = {
  name: Scalars['String'];
  orgName: Scalars['String'];
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  parentTeam?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

/** TeamMember: A member of a team. */
export type TeamMember = {
   __typename?: 'TeamMember';
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  role?: Maybe<ApplicationRoles>;
  status?: Maybe<Scalars['String']>;
};

export type TeamMember_Input = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  role?: Maybe<ApplicationRoles>;
  status?: Maybe<Scalars['String']>;
};

export type TeamRemoveRequest = {
  teamId?: Maybe<Scalars['String']>;
  emails?: Maybe<Array<Maybe<Scalars['String']>>>;
  invitedBy?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  requestedUserId?: Maybe<Scalars['String']>;
};

export type TeamUpdateRequest = {
  id: Scalars['String'];
  payload?: Maybe<AccountTeam_Input>;
  requestedUserId?: Maybe<Scalars['String']>;
};

export type Template = {
  templateId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  html?: Maybe<Scalars['String']>;
  engine?: Maybe<Scalars['String']>;
  topic?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  variables?: Maybe<Scalars['AnyObject']>;
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
  userId?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['String']>;
  timesheetId?: Maybe<Scalars['String']>;
  editable?: Maybe<Scalars['Boolean']>;
};

export type TimeRecordRequest = {
  userId?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  taskName?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  isBillable?: Maybe<Scalars['Boolean']>;
  projectId?: Maybe<Scalars['String']>;
  clientId?: Maybe<Scalars['String']>;
  timesheetId?: Maybe<Scalars['String']>;
};

export type Timesheet = {
   __typename?: 'Timesheet';
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  state?: Maybe<TimesheetState>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  approvedBy?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Scalars['String']>;
  updatedOn?: Maybe<Scalars['DateTime']>;
};

export type TimesheetCreateRequest = {
  userId?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  state?: Maybe<TimesheetState>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  approvedBy?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Scalars['String']>;
  updatedOn?: Maybe<Scalars['DateTime']>;
};

export type TimesheetResponse = {
   __typename?: 'TimesheetResponse';
  id?: Maybe<Scalars['ID']>;
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  state?: Maybe<TimesheetState>;
  submittedOn?: Maybe<Scalars['DateTime']>;
  approvedOn?: Maybe<Scalars['DateTime']>;
  approvedBy?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Scalars['String']>;
  updatedOn?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['String']>;
  totalDuration?: Maybe<Scalars['Int']>;
};

export enum TimesheetState {
  Open = 'OPEN',
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

export type UpdatedClient_Input = {
  name?: Maybe<Name_Input>;
  companyName?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  clientPhone?: Maybe<ClientPhone_Input>;
  website?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  socialConnect?: Maybe<SocialConnect_Input>;
  billingAddress?: Maybe<AddressType_Input>;
  shippingAddress?: Maybe<AddressType_Input>;
  orgName?: Maybe<Scalars['String']>;
};

export type UpdateProject_Input = {
  name: Scalars['String'];
  clientId?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Maybe<Scalars['String']>>>;
  orgName?: Maybe<Scalars['String']>;
  integrationConfigurationId?: Maybe<Scalars['String']>;
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
export type UserAccount = Node & {
   __typename?: 'UserAccount';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  alias?: Maybe<Array<Maybe<Scalars['String']>>>;
  username?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  notificationEmail?: Maybe<Scalars['String']>;
};

export type UserAccount_Input = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  alias?: Maybe<Array<Maybe<Scalars['String']>>>;
  username?: Maybe<Scalars['String']>;
};

export type UserAccountCreatedDetailedEvent = {
   __typename?: 'UserAccountCreatedDetailedEvent';
  id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  emailVerified?: Maybe<Scalars['Boolean']>;
  notificationEmail?: Maybe<Scalars['String']>;
  alias?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UserAccountCreatedEvent = {
   __typename?: 'UserAccountCreatedEvent';
  createdUser?: Maybe<UserAccountCreatedDetailedEvent>;
  sourceUser?: Maybe<AuthUserRaw>;
};

export type UserAccountCreateRequest = {
  email: Scalars['String'];
  username: Scalars['String'];
  alias?: Maybe<Array<Maybe<Scalars['String']>>>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  notificationEmail?: Maybe<Scalars['String']>;
};

export type UserAccountRemovedEvent = {
   __typename?: 'UserAccountRemovedEvent';
  id?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  username: Scalars['String'];
  notificationEmail?: Maybe<Scalars['String']>;
};

export type UserAccountRemoveRequest = {
  id?: Maybe<Scalars['String']>;
};

export type UserAccountUpdateRequest = {
  id: Scalars['String'];
  paylaod?: Maybe<UserAccount_Input>;
};

export type UserAccountWhere = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  alias?: Maybe<Array<Maybe<Scalars['String']>>>;
  username?: Maybe<Scalars['String']>;
};

export type UserConfiguration = IConfigurationModel & {
   __typename?: 'UserConfiguration';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /** The URL to the user's settings. */
  resource: Scalars['URI'];
  target?: Maybe<Scalars['Int']>;
  contents?: Maybe<Scalars['AnyObject']>;
  keys?: Maybe<Array<Maybe<Scalars['String']>>>;
  overrides?: Maybe<Array<Maybe<Overrides>>>;
};

export type UserInfo = {
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

export enum UserOrderBy {
  Auth0UserIdAsc = 'auth0UserId_ASC',
  Auth0UserIdDesc = 'auth0UserId_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmailSubscriptionAsc = 'emailSubscription_ASC',
  EmailSubscriptionDesc = 'emailSubscription_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** The user/org M:F join, denormalized on the user/org tables. */
export type UserOrg = {
   __typename?: 'UserOrg';
  userId: Scalars['String'];
  role?: Maybe<ApplicationRoles>;
  inactive?: Maybe<Scalars['Boolean']>;
};

export type UserOrg_Input = {
  userId: Scalars['String'];
  role?: Maybe<ApplicationRoles>;
  inactive?: Maybe<Scalars['Boolean']>;
};

export type UserPreviousValues = {
   __typename?: 'UserPreviousValues';
  auth0UserId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  emailSubscription?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type UserProfile = IAuth0UserProfile & {
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
export type UserSettings = ISettingsSubject & {
   __typename?: 'UserSettings';
  /**  The ID.  */
  id?: Maybe<Scalars['ID']>;
  /**
   * The latest settings for the user.
   * 
   * Only the user and site admins can access this field.
   */
  latestSettings?: Maybe<Settings>;
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
  settingsCascade: SettingsCascade;
};

export type UserState = {
   __typename?: 'UserState';
  id?: Maybe<Scalars['String']>;
  auth0UserId?: Maybe<Scalars['String']>;
  profile?: Maybe<UserProfile>;
  isProfileFetching?: Maybe<Scalars['Boolean']>;
  isTokenExpired?: Maybe<Scalars['Boolean']>;
  isLoggingInToProceed?: Maybe<Scalars['Boolean']>;
  loginError?: Maybe<LoginError>;
};

export type ViewerSettingsInput = {
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

export type ViewerSettingsSubject = {
   __typename?: 'ViewerSettingsSubject';
  /**  The URL to the settings.  */
  settingsURL: Scalars['URI'];
  /** Graphql typed settings */
  settings?: Maybe<Preferences>;
};

export enum Visibility {
  Private = 'private',
  Public = 'public'
}

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
  String: ResolverTypeWrapper<Scalars['String']>,
  OrganizationInvitationDecode: ResolverTypeWrapper<OrganizationInvitationDecode>,
  SettingsGroup: ResolverTypeWrapper<SettingsGroup>,
  Range: ResolverTypeWrapper<Range>,
  Position: ResolverTypeWrapper<Position>,
  SettingsSection: ResolverTypeWrapper<SettingsSection>,
  ContributionSettings: ResolverTypeWrapper<ContributionSettings>,
  AnyObject: ResolverTypeWrapper<Scalars['AnyObject']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ConfigurationScope: ConfigurationScope,
  ConfigurationExtensionInfo: ResolverTypeWrapper<ConfigurationExtensionInfo>,
  PreferencesResponse: ResolverTypeWrapper<PreferencesResponse>,
  PreferencesType: ResolverTypeWrapper<PreferencesType>,
  DefaultSettings: ResolverTypeWrapper<DefaultSettings>,
  ISettingsSubject: ResolversTypes['DefaultSettings'] | ResolversTypes['UserSettings'] | ResolversTypes['LocalUserSettings'] | ResolversTypes['RemoteUserSettings'] | ResolversTypes['OrganizationResourceSettings'] | ResolversTypes['GlobalSettings'] | ResolversTypes['OrganizationSettings'] | ResolversTypes['MemorySettings'],
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Settings: ResolverTypeWrapper<Settings>,
  URI: ResolverTypeWrapper<Scalars['URI']>,
  SettingsCascade: ResolverTypeWrapper<Omit<SettingsCascade, 'subjects'> & { subjects?: Maybe<Array<Maybe<ResolversTypes['SettingsSubject']>>> }>,
  SettingsSubject: ResolversTypes['UserSettings'] | ResolversTypes['LocalUserSettings'] | ResolversTypes['RemoteUserSettings'] | ResolversTypes['OrganizationResourceSettings'] | ResolversTypes['GlobalSettings'] | ResolversTypes['OrganizationSettings'] | ResolversTypes['MemorySettings'] | ResolversTypes['DefaultSettings'],
  UserSettings: ResolverTypeWrapper<UserSettings>,
  LocalUserSettings: ResolverTypeWrapper<LocalUserSettings>,
  RemoteUserSettings: ResolverTypeWrapper<RemoteUserSettings>,
  OrganizationResourceSettings: ResolverTypeWrapper<OrganizationResourceSettings>,
  GlobalSettings: ResolverTypeWrapper<GlobalSettings>,
  OrganizationSettings: ResolverTypeWrapper<OrganizationSettings>,
  MemorySettings: ResolverTypeWrapper<MemorySettings>,
  Preferences: ResolverTypeWrapper<Preferences>,
  Preference_Account: ResolverTypeWrapper<Preference_Account>,
  Preference_Default: ResolverTypeWrapper<Preference_Default>,
  Preference_Notification: ResolverTypeWrapper<Preference_Notification>,
  Preference_Organization: ResolverTypeWrapper<Preference_Organization>,
  Preference_Teams: ResolverTypeWrapper<Preference_Teams>,
  Visibility: Visibility,
  Preference_Project: ResolverTypeWrapper<Preference_Project>,
  AuthUser: ResolverTypeWrapper<AuthUser>,
  IUser: ResolversTypes['AuthUser'],
  IntegrationConfigurationFilterInput: IntegrationConfigurationFilterInput,
  IntegrationConfiguration: ResolverTypeWrapper<IntegrationConfiguration>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  JSON: ResolverTypeWrapper<Scalars['JSON']>,
  UserAccountWhere: UserAccountWhere,
  UserAccount: ResolverTypeWrapper<UserAccount>,
  Node: ResolversTypes['UserAccount'] | ResolversTypes['OrgUserAccunt'],
  AsanaConnection: ResolverTypeWrapper<AsanaConnection>,
  AsanaConnectionState: ResolverTypeWrapper<AsanaConnectionState>,
  AsanaUser: ResolverTypeWrapper<AsanaUser>,
  AsanaProjects: ResolverTypeWrapper<AsanaProjects>,
  AsanaWorkspaces: ResolverTypeWrapper<AsanaWorkspaces>,
  ConfigurationInput: ConfigurationInput,
  URIInput: ResolverTypeWrapper<Scalars['URIInput']>,
  Configuration: ResolversTypes['DefaultConfiguration'] | ResolversTypes['UserConfiguration'] | ResolversTypes['OrganizationConfiguration'] | ResolversTypes['OrganizationResourceConfiguration'],
  DefaultConfiguration: ResolverTypeWrapper<DefaultConfiguration>,
  IConfigurationModel: ResolversTypes['DefaultConfiguration'] | ResolversTypes['UserConfiguration'] | ResolversTypes['OrganizationConfiguration'] | ResolversTypes['OrganizationResourceConfiguration'] | ResolversTypes['DefaultPolicy'] | ResolversTypes['OrganizationPolicy'] | ResolversTypes['ResourcePolicy'] | ResolversTypes['ApplicationPolicy'] | ResolversTypes['DefaultRole'] | ResolversTypes['OrganizationRole'] | ResolversTypes['ResourceRole'] | ResolversTypes['ApplicationRolePermission'],
  Overrides: ResolverTypeWrapper<Overrides>,
  UserConfiguration: ResolverTypeWrapper<UserConfiguration>,
  OrganizationConfiguration: ResolverTypeWrapper<OrganizationConfiguration>,
  OrganizationResourceConfiguration: ResolverTypeWrapper<OrganizationResourceConfiguration>,
  ConfigurationData: ResolverTypeWrapper<ConfigurationData>,
  ConfigurationPolicy: ResolversTypes['DefaultPolicy'] | ResolversTypes['OrganizationPolicy'] | ResolversTypes['ResourcePolicy'] | ResolversTypes['ApplicationPolicy'],
  DefaultPolicy: ResolverTypeWrapper<DefaultPolicy>,
  OrganizationPolicy: ResolverTypeWrapper<OrganizationPolicy>,
  ResourcePolicy: ResolverTypeWrapper<ResourcePolicy>,
  ApplicationPolicy: ResolverTypeWrapper<ApplicationPolicy>,
  ContributionRoles: ResolverTypeWrapper<Omit<ContributionRoles, 'permissions'> & { permissions?: Maybe<ResolversTypes['AccessRole']> }>,
  AccessRole: ResolversTypes['DefaultRole'] | ResolversTypes['OrganizationRole'] | ResolversTypes['ResourceRole'] | ResolversTypes['ApplicationRolePermission'],
  DefaultRole: ResolverTypeWrapper<DefaultRole>,
  OrganizationRole: ResolverTypeWrapper<OrganizationRole>,
  ResourceRole: ResolverTypeWrapper<ResourceRole>,
  ApplicationRolePermission: ResolverTypeWrapper<ApplicationRolePermission>,
  TimeRecord: ResolverTypeWrapper<TimeRecord>,
  TimesheetResponse: ResolverTypeWrapper<TimesheetResponse>,
  TimesheetState: TimesheetState,
  Environment: ResolverTypeWrapper<Environment>,
  ProjectWhereInput: ProjectWhereInput,
  Projects: ResolverTypeWrapper<Projects>,
  ProjectType: ProjectType,
  InvoiceType: ResolverTypeWrapper<InvoiceType>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  MemberInvoice: ResolverTypeWrapper<MemberInvoice>,
  ClientPhone: ResolverTypeWrapper<ClientPhone>,
  AddressType: ResolverTypeWrapper<AddressType>,
  ProjectInvoice: ResolverTypeWrapper<ProjectInvoice>,
  CustomerInvoice: ResolverTypeWrapper<CustomerInvoice>,
  Organization: ResolverTypeWrapper<Organization>,
  OrgUser: ResolverTypeWrapper<OrgUser>,
  IOrgUser: ResolversTypes['OrgUser'],
  ApplicationRoles: ApplicationRoles,
  OrgUserAccunt: ResolverTypeWrapper<OrgUserAccunt>,
  OrganizationInvitation: ResolverTypeWrapper<OrganizationInvitation>,
  InviteMember: ResolverTypeWrapper<InviteMember>,
  InviteStatus: InviteStatus,
  Client: ResolverTypeWrapper<Client>,
  NameType: ResolverTypeWrapper<NameType>,
  SocialConnect: ResolverTypeWrapper<SocialConnect>,
  OrganizationConfigValue_Input: OrganizationConfigValue_Input,
  ConfigurationOverrides_Input: ConfigurationOverrides_Input,
  OrgDetailWhere: OrgDetailWhere,
  OrgMember: ResolverTypeWrapper<OrgMember>,
  OrganizationData: ResolverTypeWrapper<OrganizationData>,
  OrganizationResourceData: ResolverTypeWrapper<OrganizationResourceData>,
  AccountTeam: ResolverTypeWrapper<AccountTeam>,
  TeamMember: ResolverTypeWrapper<TeamMember>,
  Project_Output: ResolverTypeWrapper<Project_Output>,
  RoleInput: RoleInput,
  Schedule: ResolverTypeWrapper<Schedule>,
  Tag: ResolverTypeWrapper<Tag>,
  Timeline: ResolverTypeWrapper<Timeline>,
  ResourceAccessRole: ResolverTypeWrapper<Omit<ResourceAccessRole, 'accessRoles'> & { accessRoles?: Maybe<Array<Maybe<ResolversTypes['AccessRole']>>> }>,
  ResourceUser: ResolverTypeWrapper<ResourceUser>,
  IResourceUserRole: ResolversTypes['ResourceUser'],
  PermissionSubject: ResolverTypeWrapper<PermissionSubject>,
  PolicySubject: ResolverTypeWrapper<PolicySubject>,
  ViewerSettingsInput: ViewerSettingsInput,
  ViewerSettingsSubject: ResolverTypeWrapper<ViewerSettingsSubject>,
  Mutation: ResolverTypeWrapper<{}>,
  OrganizationNotificationValues: OrganizationNotificationValues,
  ClientAddRequest: ClientAddRequest,
  Name_Input: Name_Input,
  ClientPhone_Input: ClientPhone_Input,
  SocialConnect_Input: SocialConnect_Input,
  AddressType_Input: AddressType_Input,
  ProjectAddRequest: ProjectAddRequest,
  ScheduleCreateRequest: ScheduleCreateRequest,
  TimelineCreateRequest: TimelineCreateRequest,
  AuthProvider: AuthProvider,
  IdToken: IdToken,
  UserInfo: UserInfo,
  IntegrationConfigurationInput: IntegrationConfigurationInput,
  IntegraitonConfigurationId: ResolverTypeWrapper<IntegraitonConfigurationId>,
  InvoiceCreateRequest: InvoiceCreateRequest,
  MemberInvoice_Input: MemberInvoice_Input,
  ProjectInvoice_Input: ProjectInvoice_Input,
  CustomerInvoice_Input: CustomerInvoice_Input,
  IntegrationConfigurationCreateOrUpdateInput: IntegrationConfigurationCreateOrUpdateInput,
  OrganizationCreateRequest: OrganizationCreateRequest,
  OrgUser_Input: OrgUser_Input,
  OrganizationInvitation_Input: OrganizationInvitation_Input,
  TeamCreationRequest: TeamCreationRequest,
  TimeRecordRequest: TimeRecordRequest,
  TimesheetCreateRequest: TimesheetCreateRequest,
  OrganizationRemoveRequest: OrganizationRemoveRequest,
  InvoiceMailRequest: InvoiceMailRequest,
  Template: Template,
  OrganizationInvitationRequest: OrganizationInvitationRequest,
  InvoiceUpdateRequest: InvoiceUpdateRequest,
  ClientUpdateRequest: ClientUpdateRequest,
  UpdatedClient_Input: UpdatedClient_Input,
  UpdateProject_Input: UpdateProject_Input,
  OrganizationUpdateRequest: OrganizationUpdateRequest,
  Organization_Input: Organization_Input,
  OrganizationResourceCreationData_Input: OrganizationResourceCreationData_Input,
  Subscription: ResolverTypeWrapper<{}>,
  ConfigurationUpdateEvent: ResolverTypeWrapper<ConfigurationUpdateEvent>,
  ConfigurationOverrides: ResolverTypeWrapper<ConfigurationOverrides>,
  SubscribedOrganizationData: ResolverTypeWrapper<SubscribedOrganizationData>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Time: ResolverTypeWrapper<Scalars['Time']>,
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>,
  FieldError: ResolverTypeWrapper<FieldError>,
  ConfigCollectionName: ConfigCollectionName,
  ConfigFragmentName: ConfigFragmentName,
  KeyPathSegment: KeyPathSegment,
  PreferenceItem: ResolverTypeWrapper<PreferenceItem>,
  IConfigurationChangeEvent: ResolverTypeWrapper<Omit<IConfigurationChangeEvent, 'changedConfiguration'> & { changedConfiguration?: Maybe<ResolversTypes['Configuration']> }>,
  ConfigurationTarget: ConfigurationTarget,
  ConfigurationModel: ResolverTypeWrapper<ConfigurationModel>,
  SettingValueType: SettingValueType,
  OrganizationIdentifier: ResolverTypeWrapper<OrganizationIdentifier>,
  OrganizationContextPubSubEvents: OrganizationContextPubSubEvents,
  PermissionType: PermissionType,
  PermissionAction: PermissionAction,
  PermissionResource: PermissionResource,
  PreDefinedRole: PreDefinedRole,
  EnvironmentPayload: EnvironmentPayload,
  IAuth0UserProfile: ResolversTypes['UserProfile'],
  UserProfile: ResolverTypeWrapper<UserProfile>,
  LoginError: ResolverTypeWrapper<LoginError>,
  UserState: ResolverTypeWrapper<UserState>,
  Role: Role,
  IAuthUser: ResolversTypes['AuthUserRaw'],
  AuthUserRaw: ResolverTypeWrapper<AuthUserRaw>,
  AuthUser_Input: AuthUser_Input,
  UserPreviousValues: ResolverTypeWrapper<UserPreviousValues>,
  UserOrderBy: UserOrderBy,
  Timesheet: ResolverTypeWrapper<Timesheet>,
  TimeTracker: ResolverTypeWrapper<TimeTracker>,
  StartYearWeekType: StartYearWeekType,
  Task: ResolverTypeWrapper<Task>,
  UserAccountCreateRequest: UserAccountCreateRequest,
  UserAccountCreatedEvent: ResolverTypeWrapper<UserAccountCreatedEvent>,
  UserAccountCreatedDetailedEvent: ResolverTypeWrapper<UserAccountCreatedDetailedEvent>,
  UserAccount_Input: UserAccount_Input,
  UserAccountUpdateRequest: UserAccountUpdateRequest,
  UserAccountRemoveRequest: UserAccountRemoveRequest,
  UserAccountRemovedEvent: ResolverTypeWrapper<UserAccountRemovedEvent>,
  AccountTeam_Input: AccountTeam_Input,
  TeamMember_Input: TeamMember_Input,
  TeamRemoveRequest: TeamRemoveRequest,
  TeamUpdateRequest: TeamUpdateRequest,
  TeamCreateRequest: TeamCreateRequest,
  OrgainizationInvitationRole: OrgainizationInvitationRole,
  OrgUserRole: OrgUserRole,
  UserOrg: ResolverTypeWrapper<UserOrg>,
  UserOrg_Input: UserOrg_Input,
  OrganizationMember: ResolverTypeWrapper<OrganizationMember>,
  ClientTypes: ClientTypes,
  PortalLanguage: PortalLanguage,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Counter: Counter,
  Int: Scalars['Int'],
  ClientCounter: ClientCounter,
  String: Scalars['String'],
  OrganizationInvitationDecode: OrganizationInvitationDecode,
  SettingsGroup: SettingsGroup,
  Range: Range,
  Position: Position,
  SettingsSection: SettingsSection,
  ContributionSettings: ContributionSettings,
  AnyObject: Scalars['AnyObject'],
  Boolean: Scalars['Boolean'],
  ConfigurationScope: ConfigurationScope,
  ConfigurationExtensionInfo: ConfigurationExtensionInfo,
  PreferencesResponse: PreferencesResponse,
  PreferencesType: PreferencesType,
  DefaultSettings: DefaultSettings,
  ISettingsSubject: ResolversParentTypes['DefaultSettings'] | ResolversParentTypes['UserSettings'] | ResolversParentTypes['LocalUserSettings'] | ResolversParentTypes['RemoteUserSettings'] | ResolversParentTypes['OrganizationResourceSettings'] | ResolversParentTypes['GlobalSettings'] | ResolversParentTypes['OrganizationSettings'] | ResolversParentTypes['MemorySettings'],
  ID: Scalars['ID'],
  Settings: Settings,
  URI: Scalars['URI'],
  SettingsCascade: Omit<SettingsCascade, 'subjects'> & { subjects?: Maybe<Array<Maybe<ResolversParentTypes['SettingsSubject']>>> },
  SettingsSubject: ResolversParentTypes['UserSettings'] | ResolversParentTypes['LocalUserSettings'] | ResolversParentTypes['RemoteUserSettings'] | ResolversParentTypes['OrganizationResourceSettings'] | ResolversParentTypes['GlobalSettings'] | ResolversParentTypes['OrganizationSettings'] | ResolversParentTypes['MemorySettings'] | ResolversParentTypes['DefaultSettings'],
  UserSettings: UserSettings,
  LocalUserSettings: LocalUserSettings,
  RemoteUserSettings: RemoteUserSettings,
  OrganizationResourceSettings: OrganizationResourceSettings,
  GlobalSettings: GlobalSettings,
  OrganizationSettings: OrganizationSettings,
  MemorySettings: MemorySettings,
  Preferences: Preferences,
  Preference_Account: Preference_Account,
  Preference_Default: Preference_Default,
  Preference_Notification: Preference_Notification,
  Preference_Organization: Preference_Organization,
  Preference_Teams: Preference_Teams,
  Visibility: Visibility,
  Preference_Project: Preference_Project,
  AuthUser: AuthUser,
  IUser: ResolversParentTypes['AuthUser'],
  IntegrationConfigurationFilterInput: IntegrationConfigurationFilterInput,
  IntegrationConfiguration: IntegrationConfiguration,
  DateTime: Scalars['DateTime'],
  JSON: Scalars['JSON'],
  UserAccountWhere: UserAccountWhere,
  UserAccount: UserAccount,
  Node: ResolversParentTypes['UserAccount'] | ResolversParentTypes['OrgUserAccunt'],
  AsanaConnection: AsanaConnection,
  AsanaConnectionState: AsanaConnectionState,
  AsanaUser: AsanaUser,
  AsanaProjects: AsanaProjects,
  AsanaWorkspaces: AsanaWorkspaces,
  ConfigurationInput: ConfigurationInput,
  URIInput: Scalars['URIInput'],
  Configuration: ResolversParentTypes['DefaultConfiguration'] | ResolversParentTypes['UserConfiguration'] | ResolversParentTypes['OrganizationConfiguration'] | ResolversParentTypes['OrganizationResourceConfiguration'],
  DefaultConfiguration: DefaultConfiguration,
  IConfigurationModel: ResolversParentTypes['DefaultConfiguration'] | ResolversParentTypes['UserConfiguration'] | ResolversParentTypes['OrganizationConfiguration'] | ResolversParentTypes['OrganizationResourceConfiguration'] | ResolversParentTypes['DefaultPolicy'] | ResolversParentTypes['OrganizationPolicy'] | ResolversParentTypes['ResourcePolicy'] | ResolversParentTypes['ApplicationPolicy'] | ResolversParentTypes['DefaultRole'] | ResolversParentTypes['OrganizationRole'] | ResolversParentTypes['ResourceRole'] | ResolversParentTypes['ApplicationRolePermission'],
  Overrides: Overrides,
  UserConfiguration: UserConfiguration,
  OrganizationConfiguration: OrganizationConfiguration,
  OrganizationResourceConfiguration: OrganizationResourceConfiguration,
  ConfigurationData: ConfigurationData,
  ConfigurationPolicy: ResolversParentTypes['DefaultPolicy'] | ResolversParentTypes['OrganizationPolicy'] | ResolversParentTypes['ResourcePolicy'] | ResolversParentTypes['ApplicationPolicy'],
  DefaultPolicy: DefaultPolicy,
  OrganizationPolicy: OrganizationPolicy,
  ResourcePolicy: ResourcePolicy,
  ApplicationPolicy: ApplicationPolicy,
  ContributionRoles: Omit<ContributionRoles, 'permissions'> & { permissions?: Maybe<ResolversParentTypes['AccessRole']> },
  AccessRole: ResolversParentTypes['DefaultRole'] | ResolversParentTypes['OrganizationRole'] | ResolversParentTypes['ResourceRole'] | ResolversParentTypes['ApplicationRolePermission'],
  DefaultRole: DefaultRole,
  OrganizationRole: OrganizationRole,
  ResourceRole: ResourceRole,
  ApplicationRolePermission: ApplicationRolePermission,
  TimeRecord: TimeRecord,
  TimesheetResponse: TimesheetResponse,
  TimesheetState: TimesheetState,
  Environment: Environment,
  ProjectWhereInput: ProjectWhereInput,
  Projects: Projects,
  ProjectType: ProjectType,
  InvoiceType: InvoiceType,
  Float: Scalars['Float'],
  MemberInvoice: MemberInvoice,
  ClientPhone: ClientPhone,
  AddressType: AddressType,
  ProjectInvoice: ProjectInvoice,
  CustomerInvoice: CustomerInvoice,
  Organization: Organization,
  OrgUser: OrgUser,
  IOrgUser: ResolversParentTypes['OrgUser'],
  ApplicationRoles: ApplicationRoles,
  OrgUserAccunt: OrgUserAccunt,
  OrganizationInvitation: OrganizationInvitation,
  InviteMember: InviteMember,
  InviteStatus: InviteStatus,
  Client: Client,
  NameType: NameType,
  SocialConnect: SocialConnect,
  OrganizationConfigValue_Input: OrganizationConfigValue_Input,
  ConfigurationOverrides_Input: ConfigurationOverrides_Input,
  OrgDetailWhere: OrgDetailWhere,
  OrgMember: OrgMember,
  OrganizationData: OrganizationData,
  OrganizationResourceData: OrganizationResourceData,
  AccountTeam: AccountTeam,
  TeamMember: TeamMember,
  Project_Output: Project_Output,
  RoleInput: RoleInput,
  Schedule: Schedule,
  Tag: Tag,
  Timeline: Timeline,
  ResourceAccessRole: Omit<ResourceAccessRole, 'accessRoles'> & { accessRoles?: Maybe<Array<Maybe<ResolversParentTypes['AccessRole']>>> },
  ResourceUser: ResourceUser,
  IResourceUserRole: ResolversParentTypes['ResourceUser'],
  PermissionSubject: PermissionSubject,
  PolicySubject: PolicySubject,
  ViewerSettingsInput: ViewerSettingsInput,
  ViewerSettingsSubject: ViewerSettingsSubject,
  Mutation: {},
  OrganizationNotificationValues: OrganizationNotificationValues,
  ClientAddRequest: ClientAddRequest,
  Name_Input: Name_Input,
  ClientPhone_Input: ClientPhone_Input,
  SocialConnect_Input: SocialConnect_Input,
  AddressType_Input: AddressType_Input,
  ProjectAddRequest: ProjectAddRequest,
  ScheduleCreateRequest: ScheduleCreateRequest,
  TimelineCreateRequest: TimelineCreateRequest,
  AuthProvider: AuthProvider,
  IdToken: IdToken,
  UserInfo: UserInfo,
  IntegrationConfigurationInput: IntegrationConfigurationInput,
  IntegraitonConfigurationId: IntegraitonConfigurationId,
  InvoiceCreateRequest: InvoiceCreateRequest,
  MemberInvoice_Input: MemberInvoice_Input,
  ProjectInvoice_Input: ProjectInvoice_Input,
  CustomerInvoice_Input: CustomerInvoice_Input,
  IntegrationConfigurationCreateOrUpdateInput: IntegrationConfigurationCreateOrUpdateInput,
  OrganizationCreateRequest: OrganizationCreateRequest,
  OrgUser_Input: OrgUser_Input,
  OrganizationInvitation_Input: OrganizationInvitation_Input,
  TeamCreationRequest: TeamCreationRequest,
  TimeRecordRequest: TimeRecordRequest,
  TimesheetCreateRequest: TimesheetCreateRequest,
  OrganizationRemoveRequest: OrganizationRemoveRequest,
  InvoiceMailRequest: InvoiceMailRequest,
  Template: Template,
  OrganizationInvitationRequest: OrganizationInvitationRequest,
  InvoiceUpdateRequest: InvoiceUpdateRequest,
  ClientUpdateRequest: ClientUpdateRequest,
  UpdatedClient_Input: UpdatedClient_Input,
  UpdateProject_Input: UpdateProject_Input,
  OrganizationUpdateRequest: OrganizationUpdateRequest,
  Organization_Input: Organization_Input,
  OrganizationResourceCreationData_Input: OrganizationResourceCreationData_Input,
  Subscription: {},
  ConfigurationUpdateEvent: ConfigurationUpdateEvent,
  ConfigurationOverrides: ConfigurationOverrides,
  SubscribedOrganizationData: SubscribedOrganizationData,
  Date: Scalars['Date'],
  Time: Scalars['Time'],
  JSONObject: Scalars['JSONObject'],
  FieldError: FieldError,
  ConfigCollectionName: ConfigCollectionName,
  ConfigFragmentName: ConfigFragmentName,
  KeyPathSegment: KeyPathSegment,
  PreferenceItem: PreferenceItem,
  IConfigurationChangeEvent: Omit<IConfigurationChangeEvent, 'changedConfiguration'> & { changedConfiguration?: Maybe<ResolversParentTypes['Configuration']> },
  ConfigurationTarget: ConfigurationTarget,
  ConfigurationModel: ConfigurationModel,
  SettingValueType: SettingValueType,
  OrganizationIdentifier: OrganizationIdentifier,
  OrganizationContextPubSubEvents: OrganizationContextPubSubEvents,
  PermissionType: PermissionType,
  PermissionAction: PermissionAction,
  PermissionResource: PermissionResource,
  PreDefinedRole: PreDefinedRole,
  EnvironmentPayload: EnvironmentPayload,
  IAuth0UserProfile: ResolversParentTypes['UserProfile'],
  UserProfile: UserProfile,
  LoginError: LoginError,
  UserState: UserState,
  Role: Role,
  IAuthUser: ResolversParentTypes['AuthUserRaw'],
  AuthUserRaw: AuthUserRaw,
  AuthUser_Input: AuthUser_Input,
  UserPreviousValues: UserPreviousValues,
  UserOrderBy: UserOrderBy,
  Timesheet: Timesheet,
  TimeTracker: TimeTracker,
  StartYearWeekType: StartYearWeekType,
  Task: Task,
  UserAccountCreateRequest: UserAccountCreateRequest,
  UserAccountCreatedEvent: UserAccountCreatedEvent,
  UserAccountCreatedDetailedEvent: UserAccountCreatedDetailedEvent,
  UserAccount_Input: UserAccount_Input,
  UserAccountUpdateRequest: UserAccountUpdateRequest,
  UserAccountRemoveRequest: UserAccountRemoveRequest,
  UserAccountRemovedEvent: UserAccountRemovedEvent,
  AccountTeam_Input: AccountTeam_Input,
  TeamMember_Input: TeamMember_Input,
  TeamRemoveRequest: TeamRemoveRequest,
  TeamUpdateRequest: TeamUpdateRequest,
  TeamCreateRequest: TeamCreateRequest,
  OrgainizationInvitationRole: OrgainizationInvitationRole,
  OrgUserRole: OrgUserRole,
  UserOrg: UserOrg,
  UserOrg_Input: UserOrg_Input,
  OrganizationMember: OrganizationMember,
  ClientTypes: ClientTypes,
  PortalLanguage: PortalLanguage,
};

export type IsAuthenticatedDirectiveArgs = {  };

export type IsAuthenticatedDirectiveResolver<Result, Parent, ContextType = any, Args = IsAuthenticatedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HasScopeDirectiveArgs = {   scope?: Maybe<Array<Maybe<Scalars['String']>>>; };

export type HasScopeDirectiveResolver<Result, Parent, ContextType = any, Args = HasScopeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ProfileDirectiveArgs = {  };

export type ProfileDirectiveResolver<Result, Parent, ContextType = any, Args = ProfileDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddAccountContextDirectiveArgs = {  };

export type AddAccountContextDirectiveResolver<Result, Parent, ContextType = any, Args = AddAccountContextDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddNamespaceContextDirectiveArgs = {  };

export type AddNamespaceContextDirectiveResolver<Result, Parent, ContextType = any, Args = AddNamespaceContextDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccessRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccessRole'] = ResolversParentTypes['AccessRole']> = {
  __resolveType: TypeResolveFn<'DefaultRole' | 'OrganizationRole' | 'ResourceRole' | 'ApplicationRolePermission', ParentType, ContextType>
};

export type AccountTeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountTeam'] = ResolversParentTypes['AccountTeam']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  settingsUri?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  parentTeam?: Resolver<Maybe<ResolversTypes['AccountTeam']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  teamMembers?: Resolver<Maybe<Array<Maybe<ResolversTypes['TeamMember']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AddressTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressType'] = ResolversParentTypes['AddressType']> = {
  attention?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  zip?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface AnyObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AnyObject'], any> {
  name: 'AnyObject'
}

export type ApplicationPolicyResolvers<ContextType = any, ParentType extends ResolversParentTypes['ApplicationPolicy'] = ResolversParentTypes['ApplicationPolicy']> = {
  resource?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ApplicationRolePermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ApplicationRolePermission'] = ResolversParentTypes['ApplicationRolePermission']> = {
  resource?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AsanaConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AsanaConnection'] = ResolversParentTypes['AsanaConnection']> = {
  asana?: Resolver<Maybe<ResolversTypes['AsanaConnectionState']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AsanaConnectionStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['AsanaConnectionState'] = ResolversParentTypes['AsanaConnectionState']> = {
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['AsanaUser']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AsanaProjectsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AsanaProjects'] = ResolversParentTypes['AsanaProjects']> = {
  gid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AsanaUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['AsanaUser'] = ResolversParentTypes['AsanaUser']> = {
  user_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AsanaWorkspacesResolvers<ContextType = any, ParentType extends ResolversParentTypes['AsanaWorkspaces'] = ResolversParentTypes['AsanaWorkspaces']> = {
  gid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AuthUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthUser'] = ResolversParentTypes['AuthUser']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  auth0UserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  emailVerified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  givenName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  familyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AuthUserRawResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthUserRaw'] = ResolversParentTypes['AuthUserRaw']> = {
  given_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  family_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email_verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  locale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updated_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  iss?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  sub?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  aud?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  iat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  exp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  at_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  nonce?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['NameType'], ParentType, ContextType>,
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  clientPhone?: Resolver<Maybe<ResolversTypes['ClientPhone']>, ParentType, ContextType>,
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  socialConnect?: Resolver<Maybe<ResolversTypes['SocialConnect']>, ParentType, ContextType>,
  billingAddress?: Resolver<Maybe<ResolversTypes['AddressType']>, ParentType, ContextType>,
  shippingAddress?: Resolver<Maybe<ResolversTypes['AddressType']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ClientCounterResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClientCounter'] = ResolversParentTypes['ClientCounter']> = {
  counter?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ClientPhoneResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClientPhone'] = ResolversParentTypes['ClientPhone']> = {
  workPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Configuration'] = ResolversParentTypes['Configuration']> = {
  __resolveType: TypeResolveFn<'DefaultConfiguration' | 'UserConfiguration' | 'OrganizationConfiguration' | 'OrganizationResourceConfiguration', ParentType, ContextType>
};

export type ConfigurationDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConfigurationData'] = ResolversParentTypes['ConfigurationData']> = {
  defaults?: Resolver<Maybe<ResolversTypes['IConfigurationModel']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['IConfigurationModel']>, ParentType, ContextType>,
  organization?: Resolver<Maybe<ResolversTypes['IConfigurationModel']>, ParentType, ContextType>,
  resources?: Resolver<Maybe<Array<Maybe<ResolversTypes['IConfigurationModel']>>>, ParentType, ContextType>,
  isComplete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ConfigurationExtensionInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConfigurationExtensionInfo'] = ResolversParentTypes['ConfigurationExtensionInfo']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ConfigurationModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConfigurationModel'] = ResolversParentTypes['ConfigurationModel']> = {
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ConfigurationOverridesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConfigurationOverrides'] = ResolversParentTypes['ConfigurationOverrides']> = {
  resource?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  overrideIdentifier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ConfigurationPolicyResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConfigurationPolicy'] = ResolversParentTypes['ConfigurationPolicy']> = {
  __resolveType: TypeResolveFn<'DefaultPolicy' | 'OrganizationPolicy' | 'ResourcePolicy' | 'ApplicationPolicy', ParentType, ContextType>
};

export type ConfigurationUpdateEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConfigurationUpdateEvent'] = ResolversParentTypes['ConfigurationUpdateEvent']> = {
  resource?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<ResolversTypes['ConfigurationOverrides']>, ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ContributionRolesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributionRoles'] = ResolversParentTypes['ContributionRoles']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  permissions?: Resolver<Maybe<ResolversTypes['AccessRole']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ContributionSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContributionSettings'] = ResolversParentTypes['ContributionSettings']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  range?: Resolver<Maybe<ResolversTypes['Range']>, ParentType, ContextType>,
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  keyRange?: Resolver<Maybe<ResolversTypes['Range']>, ParentType, ContextType>,
  default?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  value?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  valueRange?: Resolver<Maybe<ResolversTypes['Range']>, ParentType, ContextType>,
  description?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  descriptionIsMarkdown?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  descriptionRanges?: Resolver<Maybe<Array<Maybe<ResolversTypes['Range']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['ContributionSettings']>>>, ParentType, ContextType>,
  overrideOf?: Resolver<Maybe<ResolversTypes['ContributionSettings']>, ParentType, ContextType>,
  deprecationMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  scope?: Resolver<Maybe<ResolversTypes['ConfigurationScope']>, ParentType, ContextType>,
  type?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  enum?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  enumDescriptions?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  enumDescriptionsAreMarkdown?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  extensionInfo?: Resolver<Maybe<ResolversTypes['ConfigurationExtensionInfo']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CounterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Counter'] = ResolversParentTypes['Counter']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CustomerInvoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerInvoice'] = ResolversParentTypes['CustomerInvoice']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['ClientPhone']>, ParentType, ContextType>,
  billingAddress?: Resolver<Maybe<ResolversTypes['AddressType']>, ParentType, ContextType>,
  shippingAddress?: Resolver<Maybe<ResolversTypes['AddressType']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type DefaultConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['DefaultConfiguration'] = ResolversParentTypes['DefaultConfiguration']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  resource?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type DefaultPolicyResolvers<ContextType = any, ParentType extends ResolversParentTypes['DefaultPolicy'] = ResolversParentTypes['DefaultPolicy']> = {
  resource?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type DefaultRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['DefaultRole'] = ResolversParentTypes['DefaultRole']> = {
  resource?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type DefaultSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['DefaultSettings'] = ResolversParentTypes['DefaultSettings']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<ResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<ResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type EnvironmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Environment'] = ResolversParentTypes['Environment']> = {
  args?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type FieldErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['FieldError'] = ResolversParentTypes['FieldError']> = {
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GlobalSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GlobalSettings'] = ResolversParentTypes['GlobalSettings']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<ResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<ResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IAuth0UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['IAuth0UserProfile'] = ResolversParentTypes['IAuth0UserProfile']> = {
  __resolveType: TypeResolveFn<'UserProfile', ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  picture?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  given_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  family_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email_verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  clientID?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  locale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sub?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user_metadata?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  app_metadata?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
};

export type IAuthUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['IAuthUser'] = ResolversParentTypes['IAuthUser']> = {
  __resolveType: TypeResolveFn<'AuthUserRaw', ParentType, ContextType>,
  given_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  family_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  locale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updated_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  iss?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  sub?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  aud?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  iat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  exp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  at_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  nonce?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type IConfigurationChangeEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['IConfigurationChangeEvent'] = ResolversParentTypes['IConfigurationChangeEvent']> = {
  source?: Resolver<Maybe<ResolversTypes['ConfigurationTarget']>, ParentType, ContextType>,
  affectedKeys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  sourceConfig?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  changedConfiguration?: Resolver<Maybe<ResolversTypes['Configuration']>, ParentType, ContextType>,
  changedConfigurationByResource?: Resolver<Maybe<ResolversTypes['OrganizationResourceConfiguration']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IConfigurationModelResolvers<ContextType = any, ParentType extends ResolversParentTypes['IConfigurationModel'] = ResolversParentTypes['IConfigurationModel']> = {
  __resolveType: TypeResolveFn<'DefaultConfiguration' | 'UserConfiguration' | 'OrganizationConfiguration' | 'OrganizationResourceConfiguration' | 'DefaultPolicy' | 'OrganizationPolicy' | 'ResourcePolicy' | 'ApplicationPolicy' | 'DefaultRole' | 'OrganizationRole' | 'ResourceRole' | 'ApplicationRolePermission', ParentType, ContextType>,
  resource?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
};

export type IntegraitonConfigurationIdResolvers<ContextType = any, ParentType extends ResolversParentTypes['IntegraitonConfigurationId'] = ResolversParentTypes['IntegraitonConfigurationId']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IntegrationConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['IntegrationConfiguration'] = ResolversParentTypes['IntegrationConfiguration']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  integrationName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  integrationInfo?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type InviteMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['InviteMember'] = ResolversParentTypes['InviteMember']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  teamId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  teamName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  status?: Resolver<Maybe<ResolversTypes['InviteStatus']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type InvoiceTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceType'] = ResolversParentTypes['InvoiceType']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  discount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  from?: Resolver<Maybe<ResolversTypes['MemberInvoice']>, ParentType, ContextType>,
  invoiceDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  terms?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  invoiceNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  orderNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  invoiceVendor?: Resolver<Maybe<ResolversTypes['MemberInvoice']>, ParentType, ContextType>,
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  overdue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  paymentStatus?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectInvoice']>>>, ParentType, ContextType>,
  sendingStatus?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  subTotal?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  tax?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  conditions?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  timezoneOffset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  to?: Resolver<Maybe<ResolversTypes['CustomerInvoice']>, ParentType, ContextType>,
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type IOrgUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['IOrgUser'] = ResolversParentTypes['IOrgUser']> = {
  __resolveType: TypeResolveFn<'OrgUser', ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  inactive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
};

export type IResourceUserRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['IResourceUserRole'] = ResolversParentTypes['IResourceUserRole']> = {
  __resolveType: TypeResolveFn<'ResourceUser', ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  isSelf?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type ISettingsSubjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['ISettingsSubject'] = ResolversParentTypes['ISettingsSubject']> = {
  __resolveType: TypeResolveFn<'DefaultSettings' | 'UserSettings' | 'LocalUserSettings' | 'RemoteUserSettings' | 'OrganizationResourceSettings' | 'GlobalSettings' | 'OrganizationSettings' | 'MemorySettings', ParentType, ContextType>,
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<ResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<ResolversTypes['SettingsCascade'], ParentType, ContextType>,
};

export type IUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['IUser'] = ResolversParentTypes['IUser']> = {
  __resolveType: TypeResolveFn<'AuthUser', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject'
}

export type LocalUserSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocalUserSettings'] = ResolversParentTypes['LocalUserSettings']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<ResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<ResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type LoginErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginError'] = ResolversParentTypes['LoginError']> = {
  timeStamp?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  error?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MemberInvoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberInvoice'] = ResolversParentTypes['MemberInvoice']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['ClientPhone']>, ParentType, ContextType>,
  address?: Resolver<Maybe<ResolversTypes['AddressType']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MemorySettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemorySettings'] = ResolversParentTypes['MemorySettings']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<ResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<ResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptOrganizationInvitation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAcceptOrganizationInvitationArgs, 'id'>>,
  addClient?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddClientArgs, 'client'>>,
  addContributionRole?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddContributionRoleArgs, 'name'>>,
  addCounter?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType, RequireFields<MutationAddCounterArgs, never>>,
  addCounterState?: Resolver<Maybe<ResolversTypes['ClientCounter']>, ParentType, ContextType, RequireFields<MutationAddCounterStateArgs, 'amount'>>,
  addMoleculerCounter?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType, RequireFields<MutationAddMoleculerCounterArgs, never>>,
  addOrgProject?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddOrgProjectArgs, 'project'>>,
  addScheduleEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddScheduleEventArgs, never>>,
  addTeamMembers?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddTeamMembersArgs, 'orgName' | 'teamName' | 'memberIds'>>,
  addTimelineEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddTimelineEventArgs, never>>,
  changeMemberRole?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationChangeMemberRoleArgs, 'orgName' | 'teamName' | 'memberId' | 'role'>>,
  changeOrgMemberRole?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationChangeOrgMemberRoleArgs, 'userId' | 'role'>>,
  createAuth0User?: Resolver<Maybe<ResolversTypes['AuthUser']>, ParentType, ContextType, RequireFields<MutationCreateAuth0UserArgs, never>>,
  createIntegrationConfiguration?: Resolver<Maybe<ResolversTypes['IntegraitonConfigurationId']>, ParentType, ContextType, RequireFields<MutationCreateIntegrationConfigurationArgs, never>>,
  createInvoice?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreateInvoiceArgs, 'invoice'>>,
  createOrUpdateIntegrationConfiguration?: Resolver<Maybe<ResolversTypes['IntegraitonConfigurationId']>, ParentType, ContextType, RequireFields<MutationCreateOrUpdateIntegrationConfigurationArgs, never>>,
  createOrganization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<MutationCreateOrganizationArgs, 'organization'>>,
  createTeam?: Resolver<Maybe<ResolversTypes['AccountTeam']>, ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'request'>>,
  createTimeRecord?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateTimeRecordArgs, never>>,
  createTimesheet?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCreateTimesheetArgs, never>>,
  declineOrganizationInvitation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeclineOrganizationInvitationArgs, 'id'>>,
  deleteIntegrationConfiguration?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteIntegrationConfigurationArgs, 'id'>>,
  dummy?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  initiateConfigurationValue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationInitiateConfigurationValueArgs, never>>,
  initiatePolicyValue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationInitiatePolicyValueArgs, never>>,
  onAuth0UserCreated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  removeDurationTimeRecords?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveDurationTimeRecordsArgs, never>>,
  removeInvoice?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveInvoiceArgs, never>>,
  removeOrgClient?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveOrgClientArgs, 'clientId'>>,
  removeOrgMember?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveOrgMemberArgs, 'memberId'>>,
  removeOrganization?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveOrganizationArgs, 'organization'>>,
  removeScheduleEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveScheduleEventArgs, never>>,
  removeTeam?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveTeamArgs, 'teamId'>>,
  removeTeamMember?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveTeamMemberArgs, 'orgName' | 'teamName' | 'memberId'>>,
  removeTimeRecord?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveTimeRecordArgs, never>>,
  removeTimelineEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveTimelineEventArgs, never>>,
  removeTimesheet?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationRemoveTimesheetArgs, never>>,
  resendOrganizationInvitation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationResendOrganizationInvitationArgs, 'id'>>,
  sendInvoiceMail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendInvoiceMailArgs, 'request'>>,
  sendOrganizationInvitation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendOrganizationInvitationArgs, never>>,
  setSettingsValueByResource?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSetSettingsValueByResourceArgs, never>>,
  syncCachedCounter?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  updateConfigurationPolicyValue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateConfigurationPolicyValueArgs, 'key' | 'value'>>,
  updateConfigurationPolicyValueByUri?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateConfigurationPolicyValueByUriArgs, 'key' | 'value'>>,
  updateConfigurationValue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateConfigurationValueArgs, 'key' | 'value'>>,
  updateConfigurationValueByUri?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateConfigurationValueByUriArgs, 'key' | 'value'>>,
  updateInvoice?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateInvoiceArgs, never>>,
  updateOrgClient?: Resolver<Maybe<ResolversTypes['Client']>, ParentType, ContextType, RequireFields<MutationUpdateOrgClientArgs, never>>,
  updateOrgMemberTeams?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateOrgMemberTeamsArgs, 'userId' | 'orgName'>>,
  updateOrgProject?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateOrgProjectArgs, 'where'>>,
  updateOrganization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<MutationUpdateOrganizationArgs, 'organization'>>,
  updateOrganizationContextAddResources?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrganizationResourceData']>>>, ParentType, ContextType, RequireFields<MutationUpdateOrganizationContextAddResourcesArgs, 'resourcesToAdd'>>,
  updateOrganizationContextRemoveResources?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrganizationResourceData']>>>, ParentType, ContextType, RequireFields<MutationUpdateOrganizationContextRemoveResourcesArgs, 'resourcesToRemove'>>,
  updateOrganizationContextUpdateResources?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrganizationResourceData']>>>, ParentType, ContextType, RequireFields<MutationUpdateOrganizationContextUpdateResourcesArgs, 'resourcesToAdd' | 'resourcesToRemove'>>,
  updateProjectStatus?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateProjectStatusArgs, 'id'>>,
  updateRoleValue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateRoleValueArgs, 'key' | 'value'>>,
  updateScheduleEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateScheduleEventArgs, never>>,
  updateTimeRecord?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateTimeRecordArgs, never>>,
  updateTimelineEvent?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateTimelineEventArgs, never>>,
  updateTimesheet?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateTimesheetArgs, never>>,
  updateTimesheetStatus?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateTimesheetStatusArgs, never>>,
  upsertProjectThroughIntegration?: Resolver<Maybe<ResolversTypes['Projects']>, ParentType, ContextType, RequireFields<MutationUpsertProjectThroughIntegrationArgs, 'where'>>,
};

export type NameTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['NameType'] = ResolversParentTypes['NameType']> = {
  salutation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'UserAccount' | 'OrgUserAccunt', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
};

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  stripeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  namespace?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  orgUserCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  orgMembers?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrgUser']>>>, ParentType, ContextType>,
  periodStart?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  periodStop?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  billingLeaders?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  billingEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  isBillingLeader?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  mainBilingLeaderId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  stripeSubscriptionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  invitations?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrganizationInvitation']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrganizationConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationConfiguration'] = ResolversParentTypes['OrganizationConfiguration']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  resource?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrganizationDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationData'] = ResolversParentTypes['OrganizationData']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  resources?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrganizationResourceData']>>>, ParentType, ContextType>,
  configuration?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrganizationIdentifierResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationIdentifier'] = ResolversParentTypes['OrganizationIdentifier']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  configPath?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrganizationInvitationResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationInvitation'] = ResolversParentTypes['OrganizationInvitation']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  teamId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  inviteCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  invitedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  acceptedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  tokenExpiration?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrganizationInvitationDecodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationInvitationDecode'] = ResolversParentTypes['OrganizationInvitationDecode']> = {
  orgName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  teamName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  invitationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  invitedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrganizationMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationMember'] = ResolversParentTypes['OrganizationMember']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['AuthUser']>, ParentType, ContextType>,
  isBillingLeader?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrganizationPolicyResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationPolicy'] = ResolversParentTypes['OrganizationPolicy']> = {
  resource?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrganizationResourceConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationResourceConfiguration'] = ResolversParentTypes['OrganizationResourceConfiguration']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  resource?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrganizationResourceDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationResourceData'] = ResolversParentTypes['OrganizationResourceData']> = {
  uri?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrganizationResourceSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationResourceSettings'] = ResolversParentTypes['OrganizationResourceSettings']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<ResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<ResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrganizationRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationRole'] = ResolversParentTypes['OrganizationRole']> = {
  resource?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrganizationSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrganizationSettings'] = ResolversParentTypes['OrganizationSettings']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<ResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<ResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrgMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgMember'] = ResolversParentTypes['OrgMember']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  inactive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  crossCheckEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  teamNames?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrgUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgUser'] = ResolversParentTypes['OrgUser']> = {
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  inactive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  orgName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['OrgUserAccunt'], ParentType, ContextType>,
  isSelf?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  crossCheckEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OrgUserAccuntResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgUserAccunt'] = ResolversParentTypes['OrgUserAccunt']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  alias?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  emailVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type OverridesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Overrides'] = ResolversParentTypes['Overrides']> = {
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  identifiers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PermissionSubjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['PermissionSubject'] = ResolversParentTypes['PermissionSubject']> = {
  roleURL?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  permissions?: Resolver<ResolversTypes['AnyObject'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PolicySubjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['PolicySubject'] = ResolversParentTypes['PolicySubject']> = {
  policyURL?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  policies?: Resolver<ResolversTypes['AnyObject'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PositionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Position'] = ResolversParentTypes['Position']> = {
  line?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  character?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Preference_AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preference_Account'] = ResolversParentTypes['Preference_Account']> = {
  default?: Resolver<Maybe<ResolversTypes['Preference_Default']>, ParentType, ContextType>,
  notification?: Resolver<Maybe<ResolversTypes['Preference_Notification']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Preference_DefaultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preference_Default'] = ResolversParentTypes['Preference_Default']> = {
  organization?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Preference_NotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preference_Notification'] = ResolversParentTypes['Preference_Notification']> = {
  billing?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  primaryEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  onChangeAccountSettings?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Preference_OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preference_Organization'] = ResolversParentTypes['Preference_Organization']> = {
  teams?: Resolver<Maybe<ResolversTypes['Preference_Teams']>, ParentType, ContextType>,
  project?: Resolver<Maybe<ResolversTypes['Preference_Project']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Preference_ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preference_Project'] = ResolversParentTypes['Preference_Project']> = {
  visibility?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tags?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Preference_TeamsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preference_Teams'] = ResolversParentTypes['Preference_Teams']> = {
  visibility?: Resolver<Maybe<ResolversTypes['Visibility']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PreferenceItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['PreferenceItem'] = ResolversParentTypes['PreferenceItem']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  default?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  categoryType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  settings?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  enum?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  enumDescriptions?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PreferencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Preferences'] = ResolversParentTypes['Preferences']> = {
  account?: Resolver<Maybe<ResolversTypes['Preference_Account']>, ParentType, ContextType>,
  defaultSetting?: Resolver<Maybe<Array<Maybe<ResolversTypes['SettingsGroup']>>>, ParentType, ContextType>,
  dummy?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  organization?: Resolver<Maybe<ResolversTypes['Preference_Organization']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PreferencesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PreferencesResponse'] = ResolversParentTypes['PreferencesResponse']> = {
  preferences?: Resolver<Maybe<Array<Maybe<ResolversTypes['PreferencesType']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PreferencesTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['PreferencesType'] = ResolversParentTypes['PreferencesType']> = {
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['ContributionSettings']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Project_OutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project_Output'] = ResolversParentTypes['Project_Output']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  clientId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  integrationConfigurationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ProjectInvoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectInvoice'] = ResolversParentTypes['ProjectInvoice']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  hours?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  projectName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  rate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  subTotal?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ProjectsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Projects'] = ResolversParentTypes['Projects']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  clientId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['ProjectType']>, ParentType, ContextType>,
  integrationConfigurationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  templateId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  counter?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType>,
  counterCache?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType>,
  counterState?: Resolver<Maybe<ResolversTypes['ClientCounter']>, ParentType, ContextType>,
  decodeOrganizationInvitation?: Resolver<Maybe<ResolversTypes['OrganizationInvitationDecode']>, ParentType, ContextType, RequireFields<QueryDecodeOrganizationInvitationArgs, 'token'>>,
  defaultPermissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['SettingsGroup']>>>, ParentType, ContextType, RequireFields<QueryDefaultPermissionsArgs, never>>,
  defaultPolicies?: Resolver<Maybe<Array<Maybe<ResolversTypes['SettingsGroup']>>>, ParentType, ContextType, RequireFields<QueryDefaultPoliciesArgs, never>>,
  defaultPreferences?: Resolver<Maybe<ResolversTypes['PreferencesResponse']>, ParentType, ContextType>,
  defaultSetting?: Resolver<Maybe<ResolversTypes['ContributionSettings']>, ParentType, ContextType>,
  defaultViewerSettingsSubject?: Resolver<ResolversTypes['DefaultSettings'], ParentType, ContextType, RequireFields<QueryDefaultViewerSettingsSubjectArgs, never>>,
  dummy?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  fetchAuth0User?: Resolver<Maybe<ResolversTypes['AuthUser']>, ParentType, ContextType, RequireFields<QueryFetchAuth0UserArgs, 'auth0UserId'>>,
  filterIntegrationConfiguration?: Resolver<Maybe<Array<Maybe<ResolversTypes['IntegrationConfiguration']>>>, ParentType, ContextType, RequireFields<QueryFilterIntegrationConfigurationArgs, never>>,
  getAccounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserAccount']>>>, ParentType, ContextType, RequireFields<QueryGetAccountsArgs, never>>,
  getAllIntegrationConfigurations?: Resolver<Maybe<Array<Maybe<ResolversTypes['IntegrationConfiguration']>>>, ParentType, ContextType>,
  getAsanaConnectionState?: Resolver<Maybe<ResolversTypes['AsanaConnection']>, ParentType, ContextType>,
  getAsanaWorkspaceProjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['AsanaProjects']>>>, ParentType, ContextType, RequireFields<QueryGetAsanaWorkspaceProjectsArgs, 'workspaceId'>>,
  getAsanaWorkspaces?: Resolver<Maybe<Array<Maybe<ResolversTypes['AsanaWorkspaces']>>>, ParentType, ContextType>,
  getConfiguration?: Resolver<Maybe<Array<Maybe<ResolversTypes['Configuration']>>>, ParentType, ContextType, RequireFields<QueryGetConfigurationArgs, never>>,
  getConfigurationData?: Resolver<Maybe<ResolversTypes['ConfigurationData']>, ParentType, ContextType>,
  getConfigurationPolicies?: Resolver<Maybe<Array<Maybe<ResolversTypes['ConfigurationPolicy']>>>, ParentType, ContextType, RequireFields<QueryGetConfigurationPoliciesArgs, never>>,
  getContributionRoles?: Resolver<Maybe<Array<Maybe<ResolversTypes['ContributionRoles']>>>, ParentType, ContextType>,
  getDefaultInvoiceNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  getDurationTimeRecords?: Resolver<Maybe<Array<Maybe<ResolversTypes['TimeRecord']>>>, ParentType, ContextType, RequireFields<QueryGetDurationTimeRecordsArgs, never>>,
  getDurationTimesheets?: Resolver<Maybe<Array<Maybe<ResolversTypes['TimesheetResponse']>>>, ParentType, ContextType, RequireFields<QueryGetDurationTimesheetsArgs, never>>,
  getEnvironment?: Resolver<Maybe<ResolversTypes['Environment']>, ParentType, ContextType>,
  getFilteredProjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Projects']>>>, ParentType, ContextType, RequireFields<QueryGetFilteredProjectsArgs, 'filter'>>,
  getIntegrationConfiguration?: Resolver<Maybe<ResolversTypes['IntegrationConfiguration']>, ParentType, ContextType, RequireFields<QueryGetIntegrationConfigurationArgs, 'id'>>,
  getInvoices?: Resolver<Maybe<Array<Maybe<ResolversTypes['InvoiceType']>>>, ParentType, ContextType>,
  getManageableOrganizations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Organization']>>>, ParentType, ContextType>,
  getOrgInvitationMembers?: Resolver<Maybe<Array<Maybe<ResolversTypes['InviteMember']>>>, ParentType, ContextType>,
  getOrgTeamInvitations?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrganizationInvitation']>>>, ParentType, ContextType, RequireFields<QueryGetOrgTeamInvitationsArgs, never>>,
  getOrganizationClients?: Resolver<Maybe<Array<Maybe<ResolversTypes['Client']>>>, ParentType, ContextType>,
  getOrganizationConfigValue?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType, RequireFields<QueryGetOrganizationConfigValueArgs, never>>,
  getOrganizationDetail?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<QueryGetOrganizationDetailArgs, 'where'>>,
  getOrganizationDetailUnsecured?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType, RequireFields<QueryGetOrganizationDetailUnsecuredArgs, 'where'>>,
  getOrganizationInvitation?: Resolver<Maybe<ResolversTypes['OrganizationInvitation']>, ParentType, ContextType, RequireFields<QueryGetOrganizationInvitationArgs, 'id'>>,
  getOrganizationMembers?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrgMember']>>>, ParentType, ContextType>,
  getOrganizationResourceContext?: Resolver<Maybe<ResolversTypes['OrganizationData']>, ParentType, ContextType, RequireFields<QueryGetOrganizationResourceContextArgs, never>>,
  getOrganizationTeams?: Resolver<Maybe<Array<Maybe<ResolversTypes['AccountTeam']>>>, ParentType, ContextType, RequireFields<QueryGetOrganizationTeamsArgs, never>>,
  getPlayingTimeRecord?: Resolver<Maybe<ResolversTypes['TimeRecord']>, ParentType, ContextType>,
  getProjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project_Output']>>>, ParentType, ContextType>,
  getRole?: Resolver<Maybe<ResolversTypes['AccessRole']>, ParentType, ContextType, RequireFields<QueryGetRoleArgs, never>>,
  getRoles?: Resolver<Maybe<Array<Maybe<ResolversTypes['AccessRole']>>>, ParentType, ContextType, RequireFields<QueryGetRolesArgs, never>>,
  getScheduleEvents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Schedule']>>>, ParentType, ContextType, RequireFields<QueryGetScheduleEventsArgs, never>>,
  getSettings?: Resolver<Maybe<ResolversTypes['Settings']>, ParentType, ContextType>,
  getTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['Tag']>>>, ParentType, ContextType>,
  getTeam?: Resolver<Maybe<ResolversTypes['AccountTeam']>, ParentType, ContextType, RequireFields<QueryGetTeamArgs, 'orgName' | 'teamName'>>,
  getTimeRecords?: Resolver<Maybe<Array<Maybe<ResolversTypes['TimeRecord']>>>, ParentType, ContextType, RequireFields<QueryGetTimeRecordsArgs, never>>,
  getTimelineEvents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Timeline']>>>, ParentType, ContextType, RequireFields<QueryGetTimelineEventsArgs, never>>,
  getTimesheets?: Resolver<Maybe<Array<Maybe<ResolversTypes['TimesheetResponse']>>>, ParentType, ContextType, RequireFields<QueryGetTimesheetsArgs, never>>,
  getUserAccessRole?: Resolver<Maybe<ResolversTypes['ResourceAccessRole']>, ParentType, ContextType, RequireFields<QueryGetUserAccessRoleArgs, never>>,
  getUserAccount?: Resolver<Maybe<ResolversTypes['UserAccount']>, ParentType, ContextType, RequireFields<QueryGetUserAccountArgs, 'userId'>>,
  getUserOrganizations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Organization']>>>, ParentType, ContextType, RequireFields<QueryGetUserOrganizationsArgs, never>>,
  getUserOrganizationsWithRole?: Resolver<Maybe<Array<Maybe<ResolversTypes['Organization']>>>, ParentType, ContextType, RequireFields<QueryGetUserOrganizationsWithRoleArgs, never>>,
  getUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserAccount']>>>, ParentType, ContextType, RequireFields<QueryGetUsersArgs, never>>,
  getViewerPermissions?: Resolver<Maybe<ResolversTypes['PermissionSubject']>, ParentType, ContextType, RequireFields<QueryGetViewerPermissionsArgs, never>>,
  getViewerPolicies?: Resolver<Maybe<ResolversTypes['PolicySubject']>, ParentType, ContextType, RequireFields<QueryGetViewerPoliciesArgs, never>>,
  mergedApplicationPermissions?: Resolver<Maybe<Array<Maybe<ResolversTypes['ContributionSettings']>>>, ParentType, ContextType, RequireFields<QueryMergedApplicationPermissionsArgs, never>>,
  moleculerCounter?: Resolver<Maybe<ResolversTypes['Counter']>, ParentType, ContextType>,
  organizations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Organization']>>>, ParentType, ContextType>,
  team?: Resolver<Maybe<ResolversTypes['AccountTeam']>, ParentType, ContextType, RequireFields<QueryTeamArgs, 'teamId'>>,
  teams?: Resolver<Maybe<Array<Maybe<ResolversTypes['AccountTeam']>>>, ParentType, ContextType>,
  viewerSettings?: Resolver<ResolversTypes['ViewerSettingsSubject'], ParentType, ContextType, RequireFields<QueryViewerSettingsArgs, never>>,
};

export type RangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Range'] = ResolversParentTypes['Range']> = {
  start?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType>,
  end?: Resolver<Maybe<ResolversTypes['Position']>, ParentType, ContextType>,
  startLineNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  startColumn?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  endLineNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  endColumn?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type RemoteUserSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoteUserSettings'] = ResolversParentTypes['RemoteUserSettings']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<ResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<ResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ResourceAccessRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResourceAccessRole'] = ResolversParentTypes['ResourceAccessRole']> = {
  accessRoles?: Resolver<Maybe<Array<Maybe<ResolversTypes['AccessRole']>>>, ParentType, ContextType>,
  resourceUserRoles?: Resolver<Maybe<Array<Maybe<ResolversTypes['ResourceUser']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ResourcePolicyResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResourcePolicy'] = ResolversParentTypes['ResourcePolicy']> = {
  resource?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ResourceRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResourceRole'] = ResolversParentTypes['ResourceRole']> = {
  resource?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ResourceUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResourceUser'] = ResolversParentTypes['ResourceUser']> = {
  resource?: Resolver<Maybe<ResolversTypes['URI']>, ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  isSelf?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  orgName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
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

export type SettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Settings'] = ResolversParentTypes['Settings']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  contents?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SettingsCascadeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SettingsCascade'] = ResolversParentTypes['SettingsCascade']> = {
  subjects?: Resolver<Maybe<Array<Maybe<ResolversTypes['SettingsSubject']>>>, ParentType, ContextType>,
  final?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  finalConfiguration?: Resolver<Maybe<ResolversTypes['Preferences']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SettingsGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['SettingsGroup'] = ResolversParentTypes['SettingsGroup']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  range?: Resolver<Maybe<ResolversTypes['Range']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  titleRange?: Resolver<Maybe<ResolversTypes['Range']>, ParentType, ContextType>,
  sections?: Resolver<Maybe<Array<Maybe<ResolversTypes['SettingsSection']>>>, ParentType, ContextType>,
  contributedByExtension?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SettingsSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SettingsSection'] = ResolversParentTypes['SettingsSection']> = {
  titleRange?: Resolver<Maybe<ResolversTypes['Range']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  settings?: Resolver<Maybe<Array<Maybe<ResolversTypes['ContributionSettings']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SettingsSubjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['SettingsSubject'] = ResolversParentTypes['SettingsSubject']> = {
  __resolveType: TypeResolveFn<'UserSettings' | 'LocalUserSettings' | 'RemoteUserSettings' | 'OrganizationResourceSettings' | 'GlobalSettings' | 'OrganizationSettings' | 'MemorySettings' | 'DefaultSettings', ParentType, ContextType>
};

export type SocialConnectResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialConnect'] = ResolversParentTypes['SocialConnect']> = {
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SubscribedOrganizationDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscribedOrganizationData'] = ResolversParentTypes['SubscribedOrganizationData']> = {
  resources?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrganizationResourceData']>>>, ParentType, ContextType>,
  orgNameFilter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  SubscribeToConfigurationUpdate?: SubscriptionResolver<Maybe<ResolversTypes['ConfigurationUpdateEvent']>, "SubscribeToConfigurationUpdate", ParentType, ContextType, RequireFields<SubscriptionSubscribeToConfigurationUpdateArgs, 'orgName'>>,
  SubscribeToOrganizationContext?: SubscriptionResolver<Maybe<ResolversTypes['SubscribedOrganizationData']>, "SubscribeToOrganizationContext", ParentType, ContextType, RequireFields<SubscriptionSubscribeToOrganizationContextArgs, never>>,
  SubscribeToPermissionUpdate?: SubscriptionResolver<Maybe<ResolversTypes['ConfigurationUpdateEvent']>, "SubscribeToPermissionUpdate", ParentType, ContextType, RequireFields<SubscriptionSubscribeToPermissionUpdateArgs, never>>,
  SubscribeToPolicyUpdate?: SubscriptionResolver<Maybe<ResolversTypes['ConfigurationUpdateEvent']>, "SubscribeToPolicyUpdate", ParentType, ContextType, RequireFields<SubscriptionSubscribeToPolicyUpdateArgs, never>>,
  counterUpdated?: SubscriptionResolver<Maybe<ResolversTypes['Counter']>, "counterUpdated", ParentType, ContextType>,
  dummy?: SubscriptionResolver<Maybe<ResolversTypes['Int']>, "dummy", ParentType, ContextType>,
  moleculerCounterUpdate?: SubscriptionResolver<Maybe<ResolversTypes['Counter']>, "moleculerCounterUpdate", ParentType, ContextType>,
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TeamMemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['TeamMember'] = ResolversParentTypes['TeamMember']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
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
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  orgId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  timesheetId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  editable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TimesheetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Timesheet'] = ResolversParentTypes['Timesheet']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  state?: Resolver<Maybe<ResolversTypes['TimesheetState']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  approvedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  approvedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TimesheetResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimesheetResponse'] = ResolversParentTypes['TimesheetResponse']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  startDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  endDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  state?: Resolver<Maybe<ResolversTypes['TimesheetState']>, ParentType, ContextType>,
  submittedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  approvedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  approvedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  orgId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  totalDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TimeTrackerResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimeTracker'] = ResolversParentTypes['TimeTracker']> = {
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  orgId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  timeRecords?: Resolver<Maybe<Array<Maybe<ResolversTypes['TimeRecord']>>>, ParentType, ContextType>,
  timesheets?: Resolver<Maybe<Array<Maybe<ResolversTypes['Timesheet']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface UriScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URI'], any> {
  name: 'URI'
}

export interface UriInputScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URIInput'], any> {
  name: 'URIInput'
}

export type UserAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAccount'] = ResolversParentTypes['UserAccount']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  alias?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  emailVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  notificationEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserAccountCreatedDetailedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAccountCreatedDetailedEvent'] = ResolversParentTypes['UserAccountCreatedDetailedEvent']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  emailVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  notificationEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  alias?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserAccountCreatedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAccountCreatedEvent'] = ResolversParentTypes['UserAccountCreatedEvent']> = {
  createdUser?: Resolver<Maybe<ResolversTypes['UserAccountCreatedDetailedEvent']>, ParentType, ContextType>,
  sourceUser?: Resolver<Maybe<ResolversTypes['AuthUserRaw']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserAccountRemovedEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserAccountRemovedEvent'] = ResolversParentTypes['UserAccountRemovedEvent']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  notificationEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserConfiguration'] = ResolversParentTypes['UserConfiguration']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  resource?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  target?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  contents?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  keys?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  overrides?: Resolver<Maybe<Array<Maybe<ResolversTypes['Overrides']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserOrgResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserOrg'] = ResolversParentTypes['UserOrg']> = {
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  role?: Resolver<Maybe<ResolversTypes['ApplicationRoles']>, ParentType, ContextType>,
  inactive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserPreviousValuesResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPreviousValues'] = ResolversParentTypes['UserPreviousValues']> = {
  auth0UserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  emailSubscription?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserProfile'] = ResolversParentTypes['UserProfile']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  picture?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  given_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  family_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email_verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  clientID?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  locale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  sub?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user_metadata?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  app_metadata?: Resolver<Maybe<ResolversTypes['AnyObject']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSettings'] = ResolversParentTypes['UserSettings']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  latestSettings?: Resolver<Maybe<ResolversTypes['Settings']>, ParentType, ContextType>,
  settingsURL?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  viewerCanAdminister?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  settingsCascade?: Resolver<ResolversTypes['SettingsCascade'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserState'] = ResolversParentTypes['UserState']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  auth0UserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  profile?: Resolver<Maybe<ResolversTypes['UserProfile']>, ParentType, ContextType>,
  isProfileFetching?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  isTokenExpired?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  isLoggingInToProceed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  loginError?: Resolver<Maybe<ResolversTypes['LoginError']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ViewerSettingsSubjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['ViewerSettingsSubject'] = ResolversParentTypes['ViewerSettingsSubject']> = {
  settingsURL?: Resolver<ResolversTypes['URI'], ParentType, ContextType>,
  settings?: Resolver<Maybe<ResolversTypes['Preferences']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  AccessRole?: AccessRoleResolvers,
  AccountTeam?: AccountTeamResolvers<ContextType>,
  AddressType?: AddressTypeResolvers<ContextType>,
  AnyObject?: GraphQLScalarType,
  ApplicationPolicy?: ApplicationPolicyResolvers<ContextType>,
  ApplicationRolePermission?: ApplicationRolePermissionResolvers<ContextType>,
  AsanaConnection?: AsanaConnectionResolvers<ContextType>,
  AsanaConnectionState?: AsanaConnectionStateResolvers<ContextType>,
  AsanaProjects?: AsanaProjectsResolvers<ContextType>,
  AsanaUser?: AsanaUserResolvers<ContextType>,
  AsanaWorkspaces?: AsanaWorkspacesResolvers<ContextType>,
  AuthUser?: AuthUserResolvers<ContextType>,
  AuthUserRaw?: AuthUserRawResolvers<ContextType>,
  Client?: ClientResolvers<ContextType>,
  ClientCounter?: ClientCounterResolvers<ContextType>,
  ClientPhone?: ClientPhoneResolvers<ContextType>,
  Configuration?: ConfigurationResolvers,
  ConfigurationData?: ConfigurationDataResolvers<ContextType>,
  ConfigurationExtensionInfo?: ConfigurationExtensionInfoResolvers<ContextType>,
  ConfigurationModel?: ConfigurationModelResolvers<ContextType>,
  ConfigurationOverrides?: ConfigurationOverridesResolvers<ContextType>,
  ConfigurationPolicy?: ConfigurationPolicyResolvers,
  ConfigurationUpdateEvent?: ConfigurationUpdateEventResolvers<ContextType>,
  ContributionRoles?: ContributionRolesResolvers<ContextType>,
  ContributionSettings?: ContributionSettingsResolvers<ContextType>,
  Counter?: CounterResolvers<ContextType>,
  CustomerInvoice?: CustomerInvoiceResolvers<ContextType>,
  Date?: GraphQLScalarType,
  DateTime?: GraphQLScalarType,
  DefaultConfiguration?: DefaultConfigurationResolvers<ContextType>,
  DefaultPolicy?: DefaultPolicyResolvers<ContextType>,
  DefaultRole?: DefaultRoleResolvers<ContextType>,
  DefaultSettings?: DefaultSettingsResolvers<ContextType>,
  Environment?: EnvironmentResolvers<ContextType>,
  FieldError?: FieldErrorResolvers<ContextType>,
  GlobalSettings?: GlobalSettingsResolvers<ContextType>,
  IAuth0UserProfile?: IAuth0UserProfileResolvers,
  IAuthUser?: IAuthUserResolvers,
  IConfigurationChangeEvent?: IConfigurationChangeEventResolvers<ContextType>,
  IConfigurationModel?: IConfigurationModelResolvers,
  IntegraitonConfigurationId?: IntegraitonConfigurationIdResolvers<ContextType>,
  IntegrationConfiguration?: IntegrationConfigurationResolvers<ContextType>,
  InviteMember?: InviteMemberResolvers<ContextType>,
  InvoiceType?: InvoiceTypeResolvers<ContextType>,
  IOrgUser?: IOrgUserResolvers,
  IResourceUserRole?: IResourceUserRoleResolvers,
  ISettingsSubject?: ISettingsSubjectResolvers,
  IUser?: IUserResolvers,
  JSON?: GraphQLScalarType,
  JSONObject?: GraphQLScalarType,
  LocalUserSettings?: LocalUserSettingsResolvers<ContextType>,
  LoginError?: LoginErrorResolvers<ContextType>,
  MemberInvoice?: MemberInvoiceResolvers<ContextType>,
  MemorySettings?: MemorySettingsResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  NameType?: NameTypeResolvers<ContextType>,
  Node?: NodeResolvers,
  Organization?: OrganizationResolvers<ContextType>,
  OrganizationConfiguration?: OrganizationConfigurationResolvers<ContextType>,
  OrganizationData?: OrganizationDataResolvers<ContextType>,
  OrganizationIdentifier?: OrganizationIdentifierResolvers<ContextType>,
  OrganizationInvitation?: OrganizationInvitationResolvers<ContextType>,
  OrganizationInvitationDecode?: OrganizationInvitationDecodeResolvers<ContextType>,
  OrganizationMember?: OrganizationMemberResolvers<ContextType>,
  OrganizationPolicy?: OrganizationPolicyResolvers<ContextType>,
  OrganizationResourceConfiguration?: OrganizationResourceConfigurationResolvers<ContextType>,
  OrganizationResourceData?: OrganizationResourceDataResolvers<ContextType>,
  OrganizationResourceSettings?: OrganizationResourceSettingsResolvers<ContextType>,
  OrganizationRole?: OrganizationRoleResolvers<ContextType>,
  OrganizationSettings?: OrganizationSettingsResolvers<ContextType>,
  OrgMember?: OrgMemberResolvers<ContextType>,
  OrgUser?: OrgUserResolvers<ContextType>,
  OrgUserAccunt?: OrgUserAccuntResolvers<ContextType>,
  Overrides?: OverridesResolvers<ContextType>,
  PermissionSubject?: PermissionSubjectResolvers<ContextType>,
  PolicySubject?: PolicySubjectResolvers<ContextType>,
  Position?: PositionResolvers<ContextType>,
  Preference_Account?: Preference_AccountResolvers<ContextType>,
  Preference_Default?: Preference_DefaultResolvers<ContextType>,
  Preference_Notification?: Preference_NotificationResolvers<ContextType>,
  Preference_Organization?: Preference_OrganizationResolvers<ContextType>,
  Preference_Project?: Preference_ProjectResolvers<ContextType>,
  Preference_Teams?: Preference_TeamsResolvers<ContextType>,
  PreferenceItem?: PreferenceItemResolvers<ContextType>,
  Preferences?: PreferencesResolvers<ContextType>,
  PreferencesResponse?: PreferencesResponseResolvers<ContextType>,
  PreferencesType?: PreferencesTypeResolvers<ContextType>,
  Project_Output?: Project_OutputResolvers<ContextType>,
  ProjectInvoice?: ProjectInvoiceResolvers<ContextType>,
  Projects?: ProjectsResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Range?: RangeResolvers<ContextType>,
  RemoteUserSettings?: RemoteUserSettingsResolvers<ContextType>,
  ResourceAccessRole?: ResourceAccessRoleResolvers<ContextType>,
  ResourcePolicy?: ResourcePolicyResolvers<ContextType>,
  ResourceRole?: ResourceRoleResolvers<ContextType>,
  ResourceUser?: ResourceUserResolvers<ContextType>,
  Schedule?: ScheduleResolvers<ContextType>,
  Settings?: SettingsResolvers<ContextType>,
  SettingsCascade?: SettingsCascadeResolvers<ContextType>,
  SettingsGroup?: SettingsGroupResolvers<ContextType>,
  SettingsSection?: SettingsSectionResolvers<ContextType>,
  SettingsSubject?: SettingsSubjectResolvers,
  SocialConnect?: SocialConnectResolvers<ContextType>,
  SubscribedOrganizationData?: SubscribedOrganizationDataResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  Tag?: TagResolvers<ContextType>,
  Task?: TaskResolvers<ContextType>,
  TeamMember?: TeamMemberResolvers<ContextType>,
  Time?: GraphQLScalarType,
  Timeline?: TimelineResolvers<ContextType>,
  TimeRecord?: TimeRecordResolvers<ContextType>,
  Timesheet?: TimesheetResolvers<ContextType>,
  TimesheetResponse?: TimesheetResponseResolvers<ContextType>,
  TimeTracker?: TimeTrackerResolvers<ContextType>,
  URI?: GraphQLScalarType,
  URIInput?: GraphQLScalarType,
  UserAccount?: UserAccountResolvers<ContextType>,
  UserAccountCreatedDetailedEvent?: UserAccountCreatedDetailedEventResolvers<ContextType>,
  UserAccountCreatedEvent?: UserAccountCreatedEventResolvers<ContextType>,
  UserAccountRemovedEvent?: UserAccountRemovedEventResolvers<ContextType>,
  UserConfiguration?: UserConfigurationResolvers<ContextType>,
  UserOrg?: UserOrgResolvers<ContextType>,
  UserPreviousValues?: UserPreviousValuesResolvers<ContextType>,
  UserProfile?: UserProfileResolvers<ContextType>,
  UserSettings?: UserSettingsResolvers<ContextType>,
  UserState?: UserStateResolvers<ContextType>,
  ViewerSettingsSubject?: ViewerSettingsSubjectResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  isAuthenticated?: IsAuthenticatedDirectiveResolver<any, any, ContextType>,
  hasScope?: HasScopeDirectiveResolver<any, any, ContextType>,
  profile?: ProfileDirectiveResolver<any, any, ContextType>,
  addAccountContext?: AddAccountContextDirectiveResolver<any, any, ContextType>,
  addNamespaceContext?: AddNamespaceContextDirectiveResolver<any, any, ContextType>,
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;

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