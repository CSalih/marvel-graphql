export const resolvers = {
  Query: {
    series: async (_, __, {dataSources}) => {
      return dataSources.seriesAPI.series()
    },
    seriesById: async (_, {id}, {dataSources}) => {
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
      const items = series.characters.items.map(({name, resourceURI}) => {
        const id = resourceURI.split("/").pop();
        return {id, name, resourceURI};
      })
      return {
        ...series.characters,
        items
      }
    },
    comics: async (series) => {
      const items = series.comics.items.map(({name, resourceURI}) => {
        const id = resourceURI.split("/").pop();
        return {id, name, resourceURI};
      })
      return {
        ...series.comics,
        items
      }
    },
    creators: async (series) => {
      const items = series.creators.items.map((creator) => ({
        ...creator,
        id: creator.resourceURI.split("/").pop()
      }));
      return {
        ...series.creators,
        items,
      }
    },
    events: async (series) => {
      const items = series.events.items.map((event) => ({
        ...event,
        id: event.resourceURI.split("/").pop()
      }));
      return {
        ...series.events,
        items,
      }
    },
    stories: async ({stories}) => {
      const items = stories.items.map((event) => ({
        ...event,
        id: event.resourceURI.split("/").pop()
      }));
      return {
        ...stories,
        items,
      }
    },
  },
};