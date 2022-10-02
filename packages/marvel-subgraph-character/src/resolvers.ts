export const resolvers = {
  Query: {
    characters: async (_, __, {dataSources}) => {
      return dataSources.characterAPI.characters();
    },
    character:  async (_, { id }, {dataSources}) => {
      return dataSources.characterAPI.characterById(id);
    },
  }
};