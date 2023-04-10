import client from './client';

const typeDefs = `#graphql
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }


  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }

  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    updateMovie(id: Int!, title: String, year: Int, genre: String): Movie
    deleteMovie(id: Int!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: async () => await client.movie.findMany(),
    movie: async (_, { id }) => await client.movie.findUnique({ where: { id } }),
  },
  Mutation: {
    createMovie: async (_, { title, year, genre }) => await client.movie.create({ data: { title, year, genre } }),
    updateMovie: async (_, { id, title, year, genre }) =>
      await client.movie.update({ where: { id }, data: { title, year, genre } }),
    deleteMovie: async (_, { id }) => await client.movie.delete({ where: { id } }),
  },
};

export { typeDefs, resolvers };
