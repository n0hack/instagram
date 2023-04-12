import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { getUser } from './users/users.utils.js';
import typeDefs from './users/users.typeDefs.js';
import resolvers from './users/users.resolvers.js';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';

// 파일 업로드를 위해 Express 미들웨어로 테스트
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start().then(() => {
  app.use(
    '/',
    express.static('uploads'),
    cors(),
    express.json(),
    graphqlUploadExpress(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const loggedInUser = await getUser(req.headers.token);

        return {
          loggedInUser,
        };
      },
    })
  );
});

(async () => {
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
})();

// const server = new ApolloServer({ typeDefs, resolvers });
// (async () => {
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: process.env.PORT },
//     context: async ({ req }) => {
//       const loggedInUser = await getUser(req.headers.token);

//       return {
//         loggedInUser,
//       };
//     },
//   });
//   console.log(`🚀 Server ready at ${url}`);
// })();
