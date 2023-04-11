import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';

const dirname = path.resolve();

const loadedTypes = loadFilesSync(`${dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${dirname}/**/*.resolvers.js`);
export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
