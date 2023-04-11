require('dotenv').config();

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from './schema';
import { getUser } from './users/users.utils';

const server = new ApolloServer({ schema });
(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT },
    context: async ({ req }) => {
      const loggedInUser = await getUser(req.headers.token);

      return {
        loggedInUser,
      };
    },
  });
  console.log(`🚀 Server ready at ${url}`);
})();
