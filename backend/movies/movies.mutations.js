import client from '../client';

export default {
  Mutation: {
    createMovie: async (_, { title, year, genre }) => await client.movie.create({ data: { title, year, genre } }),
    updateMovie: async (_, { id, title, year, genre }) =>
      await client.movie.update({ where: { id }, data: { title, year, genre } }),
    deleteMovie: async (_, { id }) => await client.movie.delete({ where: { id } }),
  },
};
