export default `#graphql
  scalar Upload

  type User {
    id: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    bio: String
    avatar: String
    createdAt: String!
    updatedAt: String!
  }

  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type CreateAccountResult {
    ok: Boolean!
    error: String
  }

  type EditProfileResult {
    ok: Boolean!
    error: String
  }

  type Query {
    seeProfile(username: String!): User
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult!
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): CreateAccountResult!
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      bio: String
      avatar: Upload
      password: String
    ): EditProfileResult!
  }
`;
