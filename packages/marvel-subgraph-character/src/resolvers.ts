export const resolvers = {
  Query: {
    characters: async (_, __, {dataSources}) => {
      return dataSources.characterAPI.characters();
    },
    character:  async (_, { id }, {dataSources}) => {
      return dataSources.characterAPI.characterById(id);
    },
  },
  Character: {
    __resolveReference: async ({id}, {dataSources}) => {
      const res = await dataSources.characterAPI.characterById(id);
      return res.data.results[0] || null;
    },
    comics: async (character) => {
      const items = character.comics.items.map((comic) => ({
        ...comic,
        id: comic.resourceURI.split("/").pop()
      }));
      return {
        ...character.comics,
        items,
      }
    }
  }
};