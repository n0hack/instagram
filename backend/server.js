require('dotenv').config();

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from './schema';

const server = new ApolloServer({ schema });
(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT },
  });
  console.log(`🚀 Server ready at ${url}`);
})();
