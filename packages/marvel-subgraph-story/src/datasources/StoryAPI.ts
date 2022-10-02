import {RESTDataSource} from 'apollo-datasource-rest';

const mockedResponse = require("./stories.json");

export class StoryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://gateway.marvel.com/v1/public';
  }

  stories() {
    return mockedResponse;
  }

  storyById(seriesId: number) {
    const result = mockedResponse.data.results.find(result => result.id === seriesId);
    return {
      ...mockedResponse,
      data: {
        ...mockedResponse.data,
        total: 1,
        count: 1,
        results: [result]
      }
    }
  }
}

