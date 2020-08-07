const gql = require('graphql-tag')

module.exports = gql`
type Ministry {
  id: ID!
  name: String!
  collections(
    type: String
  ): MinistryCollectionConnection!
  description(format: TextFormat): String
  url: URL
}

type MinistryCollectionConnection {
  edges: [MinistryCollectionEdge!]
  pageInfo: PageInfo
  totalCount: Int
}

type MinistryCollectionEdge {
  node: Collection!
}

extend type Query {
  ministry(id: ID!): Ministry
}
`
