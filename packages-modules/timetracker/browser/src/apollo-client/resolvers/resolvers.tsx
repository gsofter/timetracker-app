export const resolvers = {
  Query: {
    counterState: (_, args, { cache }) => {},
  },
  Mutation: {
    addCounterState: async (_, { amount }, { cache }) => {},
  },
};
