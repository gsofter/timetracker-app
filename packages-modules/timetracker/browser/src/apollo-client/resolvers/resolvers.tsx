import moment from 'moment';
import { GET_PROJECTS_CLIENT, GET_TAGS_CLIENT, GET_MEMBERS_CLIENT } from '../queries';

export const defaults = {
  getProjects: [
    {
      id: '1',
      name: 'ProjectB',
      clientId: 'ClientB',
      teams: ['teamA', 'teamB'],
      orgName: 'OrgA',
      tasks: [
        { id: 'task1', name: 'PATaskA' },
        { id: 'task2', name: 'PATaskB' },
      ],
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
      tasks: [
        { id: 'task1', name: 'PATaskA' },
        { id: 'task2', name: 'PATaskB' },
      ],
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
