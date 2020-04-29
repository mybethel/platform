const gql = require('graphql-tag')

module.exports = gql`
type Ministry {
  name: String!
  description(format: TextFormat): String
  url: URL
}

extend type Query {
  ministry(id: ID!): Ministry
}
`
