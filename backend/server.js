import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Movie {
    id: Int
    title: String
    year: Int
  }


  type Query {
    movies: [Movie]
    movie: Movie
  }

  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => [],
    movie: () => ({ title: 'Hello', year: 2023 }),
  },
  Mutation: {
    createMovie: (_, args) => {
      console.log(args);
      return true;
    },
    deleteMovie: (_, args) => {
      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
