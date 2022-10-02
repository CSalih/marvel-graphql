export const resolvers = {
  Query: {
    stories: async (_, __, {dataSources}) => {
      return dataSources.storyAPI.stories()
    },
    storyById: async (_, {id}, {dataSources}) => {
      return dataSources.storyAPI.storyById(Number.parseInt(id));
    },
  },
  Story: {
    __resolveReference: async ({id}, {dataSources}) => {
      const res = await dataSources.storyAPI.storyById(
        Number.parseInt(id)
      );
      return res.data.results[0] || null;
    },
    characters: async (story) => {
      const items = story.characters.items.map(({name, resourceURI}) => {
        const id = resourceURI.split("/").pop();
        return {id, name, resourceURI};
      })
      return {
        ...story.characters,
        items
      }
    },
    originalissue: (story) => {
      const {name, resourceURI} = story.originalissue;
      const id = resourceURI.split("/").pop();
      return {id, name, resourceURI}
    },
    comics: async (story) => {
      const items = story.comics.items.map(({name, resourceURI}) => {
        const id = resourceURI.split("/").pop();
        return {id, name, resourceURI};
      })
      return {
        ...story.comics,
        items
      }
    },
    creators: async (story) => {
      const items = story.creators.items.map((creator) => ({
        ...creator,
        id: creator.resourceURI.split("/").pop()
      }));
      return {
        ...story.creators,
        items,
      }
    },
    events: async (story) => {
      const items = story.events.items.map((event) => ({
        ...event,
        id: event.resourceURI.split("/").pop()
      }));
      return {
        ...story.events,
        items,
      }
    },
  },
};