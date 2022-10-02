export const resolvers = {
  Query: {
    events: async (_, __, {dataSources}) => {
      return dataSources.eventAPI.events()
    },
    eventById: async (_, {id}, {dataSources}) => {
      return dataSources.eventAPI.eventById(Number.parseInt(id));
    },
  },
  Event: {
    __resolveReference: async ({id}, {dataSources}) => {
      const res = await dataSources.eventAPI.eventById(
        Number.parseInt(id)
      );
      return res.data.results[0] || null;
    },
    characters: async (event) => {
      const items = event.characters.items.map(({name, resourceURI}) => {
        const id = resourceURI.split("/").pop();
        return {id, name, resourceURI};
      })
      return {
        ...event.characters,
        items
      }
    },
    comics: async (event) => {
      const items = event.comics.items.map(({name, resourceURI}) => {
        const id = resourceURI.split("/").pop();
        return {id, name, resourceURI};
      })
      return {
        ...event.comics,
        items
      }
    },
    creators: async (event) => {
      const items = event.creators.items.map((creator) => ({
        ...creator,
        id: creator.resourceURI.split("/").pop()
      }));
      return {
        ...event.creators,
        items,
      }
    },
  },
};