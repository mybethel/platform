const gql = require('graphql-tag')

module.exports = gql`
type AuthPayload {
  token: String!
  user: User!
  ministry: Ministry!
}

type User {
  id: ID!
  avatar: URL
  confirmed: Boolean!
  email: String!
  isLocked: Boolean!
  lastLogin: DateTime
  ministries: MinistryConnection!
  name: String
  title: String
}

extend type Mutation {
  issueToken(
    email: String
    password: String
    token: String
    ministry: ID
  ): AuthPayload
}
`
