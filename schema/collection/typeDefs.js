const gql = require('graphql-tag')

module.exports = gql`
type Collection {
  id: ID!
  ministry: Ministry!
  parent: Collection
  type: String!
  title: String!
  description(format: TextFormat): String
  tags: [String]
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
