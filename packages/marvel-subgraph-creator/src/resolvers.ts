export const resolvers = {
  Query: {
    creators: async (_, __, {dataSources}) => {
      return dataSources.creatorAPI.creators()
    },
    creatorById:  async (_, { id }, {dataSources}) => {
      return dataSources.creatorAPI.creatorById(Number.parseInt(id));
    },
  },
  Creator: {
    __resolveReference: async (comic, {dataSources}) => {
      const res = await dataSources.creatorAPI.creatorById(
        Number.parseInt(comic.id)
      );
      return res.data.results[0] || null;
    },
    characters: async (creator) => {
      const items = creator.characters.items.map(({ name, resourceURI }) => {
        const id = resourceURI.split("/").pop();
        return { id, name, resourceURI };
      })
      return {
        ...creator.characters,
        items
      }
    },
    comics: async (creator) => {
      const items = creator.comics.items.map(({ name, resourceURI }) => {
        const id = resourceURI.split("/").pop();
        return { id, name, resourceURI };
      })
      return {
        ...creator.comics,
        items
      }
    },
    series: async (creator) => {
      const items = creator.series.items.map((series) => ({
        ...series,
        id: series.resourceURI.split("/").pop()
      }));
      return {
        ...creator.series,
        items,
      }
    },
    events: async (creator) => {
      const items = creator.events.items.map((event) => ({
        ...event,
        id: event.resourceURI.split("/").pop()
      }));
      return {
        ...creator.events,
        items,
      }
    },
  },
};