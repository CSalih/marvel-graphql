import { RESTDataSource } from 'apollo-datasource-rest';

const mockedResponse = require("./series.json");

export class SeriesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://gateway.marvel.com/v1/public';
  }

  series() {
    return mockedResponse;
  }

  seriesById( seriesId: number ) {
    const result = mockedResponse.data.results.find(result => result.id === seriesId );
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

