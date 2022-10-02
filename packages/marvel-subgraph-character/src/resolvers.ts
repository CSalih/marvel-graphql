export const resolvers = {
  Query: {
    characters: async (_, __, {dataSources}) => {
      return dataSources.characterAPI.characters();
    },
    character: async (_, {id}, {dataSources}) => {
      return dataSources.characterAPI.characterById(
        Number.parseInt(id)
      );
    },
  },
  Character: {
    __resolveReference: async ({id}, {dataSources}) => {
      console.log("Character.__resolveReference", id)
      const res = await dataSources.characterAPI.characterById(
        Number.parseInt(id)
      );
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
    },
    series: async (character) => {
      const items = character.series.items.map((comic) => ({
        ...comic,
        id: comic.resourceURI.split("/").pop()
      }));
      return {
        ...character.series,
        items,
      }
    },
    events: async (character) => {
      const items = character.events.items.map((event) => ({
        ...event,
        id: event.resourceURI.split("/").pop()
      }));
      return {
        ...character.events,
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
  }
};