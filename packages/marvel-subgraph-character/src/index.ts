import {CharacterAPI} from "./datasources/CharacterAPI";
import {resolvers} from "./resolvers";
import {ApolloServer, gql} from "apollo-server";
import {readFileSync} from "fs";
import { buildSubgraphSchema } from "@apollo/subgraph";

const port = process.env.PORT || 4001;
const { name } = require('../package.json');
const typeDefs = gql(readFileSync(__dirname + '/schema.graphql', {encoding: 'utf-8'}));

const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  dataSources: () => ({
    characterAPI: new CharacterAPI(),
  }),
});

server
  .listen({port})
  .then(({url}) => {
    console.log(`🚀 Subgraph ${name} running at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });