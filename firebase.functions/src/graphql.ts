import { ApolloServer, gql } from "apollo-server-cloud-functions";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_: unknown, { name }: { name?: string }) =>
      `Hello ${name || "world"}!`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

export const handler = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: true,
    path: "/",
  },
});
