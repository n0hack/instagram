// 도메인으로 파일 분리 (분할 정복)
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

export default typeDefs;
