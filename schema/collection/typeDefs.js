const gql = require('graphql-tag')

module.exports = gql`
type Collection {
  ministry: Ministry!
  parent: Collection
  title: String!
  type: String!
  description(format: TextFormat): String
  settings: Settings
  links(
    after: String
    before: String
    first: Int
    last: Int
  ): LinkedConnection!
}

extend type Query {
  collection(id: ID!): Collection
}
`
