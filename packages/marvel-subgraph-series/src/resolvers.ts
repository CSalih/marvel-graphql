export const resolvers = {
  Query: {
    series: async (_, __, {dataSources}) => {
      return dataSources.seriesAPI.series()
    },
    seriesById:  async (_, { id }, {dataSources}) => {
      return dataSources.seriesAPI.seriesById(Number.parseInt(id));
    },
  },
  Series: {
    __resolveReference: async (comic, {dataSources}) => {
      const res = await dataSources.seriesAPI.seriesById(
        Number.parseInt(comic.id)
      );
      return res.data.results[0] || null;
    },
    characters: async (series) => {
      const items = series.characters.items.map(({ name, resourceURI }) => {
        const id = resourceURI.split("/").pop();
        return { id, name, resourceURI };
      })
      return {
        ...series.characters,
        items
      }
    },
    comics: async (series) => {
      const items = series.comics.items.map(({ name, resourceURI }) => {
        const id = resourceURI.split("/").pop();
        return { id, name, resourceURI };
      })
      return {
        ...series.comics,
        items
      }
    },
  },
};