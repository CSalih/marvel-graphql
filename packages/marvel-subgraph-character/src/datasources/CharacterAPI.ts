import { RESTDataSource } from 'apollo-datasource-rest';

const CharactersResponse = require("./characters.json");

export class CharacterAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://gateway.marvel.com/v1/public';
  }

  characters() {
    return CharactersResponse; //this.get("characters");
  }

  characterById( characterId: number ) {
    const result = CharactersResponse.data.results.find(character => character.id == characterId );
    return {
      ...CharactersResponse,
      data: {
        ...CharactersResponse.data,
        total: 1,
        count: 1,
        results: [result]
      }
    }
    // return this.get(`characters/${characterId}`);
  }
}

