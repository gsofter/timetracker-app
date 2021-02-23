import moment from 'moment';
import { GET_PROJECTS_CLIENT, GET_TAGS_CLIENT, GET_MEMBERS_CLIENT } from '../queries';

export const defaults = {
  getProjects: [
    {
      id: '1',
      name: 'ProjectA',
      clientId: 'ClientA',
      teams: ['teamA', 'teamB'],
      orgName: 'OrgA',
      tasks: [{ id: 'task1', name: 'PATaskA', __typename: 'Task' }],
      updatedAt: moment().add('-1', 'day'),
      createdAt: moment().add('-1', 'day'),
      __typename: 'Project',
    },
    {
      id: '2',
      name: 'ProjectB',
      clientId: 'ClientB',
      teams: ['teamA', 'teamB'],
      orgName: 'OrgA',
      tasks: [{ id: 'task2', name: 'PBTaskA', __typename: 'Task' }],
      updatedAt: moment().add('-1', 'day'),
      createdAt: moment().add('-1', 'day'),
      __typename: 'Project',
    },
    {
      id: '3',
      name: 'ProjectC',
      clientId: 'ClientA',
      teams: ['teamA', 'teamB'],
      orgName: 'OrgA',
      tasks: [{ id: 'task3', name: 'PCTaskA', __typename: 'Task' }],
      updatedAt: moment().add('-1', 'day'),
      createdAt: moment().add('-1', 'day'),
      __typename: 'Project',
    },
    {
      id: '4',
      name: 'ProjectD',
      clientId: 'ClientA',
      teams: ['teamA', 'teamB'],
      orgName: 'OrgA',
      tasks: [{ id: 'task4', name: 'PDTaskA', __typename: 'Task' }],
      updatedAt: moment().add('-1', 'day'),
      createdAt: moment().add('-1', 'day'),
      __typename: 'Project',
    },
    {
      id: '5',
      name: 'ProjectE',
      clientId: 'ClientA',
      teams: ['teamA', 'teamB'],
      orgName: 'OrgD',
      tasks: [{ id: 'task5', name: 'PETaskA', __typename: 'Task' }],
      updatedAt: moment().add('-1', 'day'),
      createdAt: moment().add('-1', 'day'),
      __typename: 'Project',
    },
    {
      id: '5',
      name: 'ProjectF',
      clientId: 'ClientA',
      teams: ['teamA', 'teamB'],
      orgName: 'OrgD',
      tasks: [{ id: 'task6', name: 'PETaskA', __typename: 'Task' }],
      updatedAt: moment().add('-1', 'day'),
      createdAt: moment().add('-1', 'day'),
      __typename: 'Project',
    },
    {
      id: '6',
      name: 'ProjectG',
      clientId: 'ClientB',
      teams: ['teamA', 'teamB'],
      orgName: 'OrgD',
      tasks: [{ id: 'task7', name: 'PFTaskA', __typename: 'Task' }],
      updatedAt: moment().add('-1', 'day'),
      createdAt: moment().add('-1', 'day'),
      __typename: 'Project',
    },
    {
      id: '7',
      name: 'ProjectH',
      clientId: 'ClientA',
      teams: ['teamA', 'teamB'],
      orgName: 'OrgD',
      tasks: [{ id: 'task8', name: 'PETaskA', __typename: 'Task' }],
      updatedAt: moment().add('-1', 'day'),
      createdAt: moment().add('-1', 'day'),
      __typename: 'Project',
    },
    {
      id: '8',
      name: 'ProjectI',
      clientId: 'ClientH',
      teams: ['teamA', 'teamB'],
      orgName: 'OrgD',
      tasks: [{ id: 'task9', name: 'PETaskA', __typename: 'Task' }],
      updatedAt: moment().add('-1', 'day'),
      createdAt: moment().add('-1', 'day'),
      __typename: 'Project',
    },
    {
      id: '9',
      name: 'ProjectJ',
      clientId: 'ClientI',
      teams: ['teamA', 'teamB'],
      orgName: 'OrgD',
      tasks: [{ id: 'task9', name: 'PITaskA', __typename: 'Task' }],
      updatedAt: moment().add('-1', 'day'),
      createdAt: moment().add('-1', 'day'),
      __typename: 'Project',
    },
    {
      id: '10',
      name: 'ProjectK',
      clientId: 'ClientJ',
      teams: ['teamA', 'teamB'],
      orgName: 'OrgD',
      tasks: [{ id: 'task10', name: 'PJTaskA', __typename: 'Task' }],
      updatedAt: moment().add('-1', 'day'),
      createdAt: moment().add('-1', 'day'),
      __typename: 'Project',
    },
  ],
  getTags: [
    { id: 'tag1', name: 'TagA', active: true, __typename: 'Task' },
    { id: 'tag2', name: 'TagB', active: true, __typename: 'Task' },
  ],

  getMembers: [
    {
      id: 'user1',
      name: 'userA',
      __typename: 'Member',
    },
    { id: 'user2', name: 'userB', __typename: 'Member' },
  ],
};
export const resolvers = {
  Query: {
    getProjects: (_, args, { cache }) => {
      const data = cache.readQuery({ query: GET_PROJECTS_CLIENT });
      return data.getProjects;
    },

    getTags: (_, args, { cache }) => {
      const data = cache.readQuery({ query: GET_TAGS_CLIENT });
      return data.getTags;
    },

    getMembers: (_, args, { cache }) => {
      const data = cache.readQuery({ query: GET_MEMBERS_CLIENT });
      return data.getMembers;
    },
  },
};
