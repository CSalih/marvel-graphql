export const resolvers = {
  Query: {
    comics: async (_, __, {dataSources}) => {
      return dataSources.comicAPI.comics();
    },
    comic:  async (_, { id }, {dataSources}) => {
      return dataSources.comicAPI.comicById(Number.parseInt(id));
    },
  },
  Comic: {
    __resolveReference: async (comic, {dataSources}) => {
      const res = await dataSources.comicAPI.comicById(
        Number.parseInt(comic.id)
      );
      return res.data.results[0] || null;
    },
    characters: async (comic) => {
      return comic.characters.items.map(({ name, resourceURI }) => {
        const id = resourceURI.split("/").pop();
        return { id, name, resourceURI };
      })
    },
    series: async (comic) => {
      const items = comic.series.items.map((comic) => ({
        ...comic,
        id: comic.resourceURI.split("/").pop()
      }));
      return {
        ...comic.series,
        items,
      }
    },
  }
};