import {SeriesAPI} from "./datasources/SeriesAPI";
import {resolvers} from "./resolvers";
import {ApolloServer, gql} from "apollo-server";
import {readFileSync} from "fs";
import {buildSubgraphSchema} from "@apollo/subgraph";

const port = process.env.PORT || 4003;
const {name} = require('../package.json');
const typeDefs = gql(readFileSync(__dirname + '/schema.graphql', {encoding: 'utf-8'}));

const server = new ApolloServer({
  schema: buildSubgraphSchema({typeDefs, resolvers}),
  dataSources: () => ({
    seriesAPI: new SeriesAPI(),
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