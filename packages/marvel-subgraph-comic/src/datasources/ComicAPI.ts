import { RESTDataSource } from 'apollo-datasource-rest';

const ComicResponse = require("./comics.json");

export class ComicAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://gateway.marvel.com/v1/public';
  }

  comics() {
    return ComicResponse; //this.get("comics");
  }

  comicById( comicId: number ) {
    const result = ComicResponse.data.results.find(result => result.id == comicId );
    return {
      ...ComicResponse,
      data: {
        ...ComicResponse.data,
        total: 1,
        count: 1,
        results: [result]
      }
    }
    // return this.get(`comics/${characterId}`);
  }
}

