const { buildSchema } = require('graphql');

module.exports = buildSchema(`


type User {
  _id: ID!
  firstName: String!
  lastName: String!
  email: String!  
}


type AuthData {
  userId: ID!
  firstName: String!
  lastName: String!
}
input UserInput {
  firstName: String!
  lastName: String!
  email: String!
}

type RootQuery {
    login(email: String!): AuthData!
}

type RootMutation {
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
