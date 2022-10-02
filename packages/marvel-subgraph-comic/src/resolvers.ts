export const resolvers = {
  Query: {
    comics: async (_, __, {dataSources}) => {
      return dataSources.comicAPI.comics();
    },
    comic:  async (_, { id }, {dataSources}) => {
      return dataSources.comicAPI.comicById(id);
    },
  }
};