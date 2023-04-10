import client from '../client';

export default {
  Query: {
    movies: async () => await client.movie.findMany(),
    movie: async (_, { id }) => await client.movie.findUnique({ where: { id } }),
  },
};
