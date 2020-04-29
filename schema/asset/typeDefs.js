const gql = require('graphql-tag')

module.exports = gql`
type Asset {
  id: ID!
  collections: [Collection]
  date: DateTime
  description: String
  contentType: String
  fileName: String
  title: String
  size: Int
  width: Int
  height: Int
}

type AssetCollection {
  pageInfo: PageInfo
  totalCount: Int
  nodes: [Asset]!
}

extend type Query {
  asset(
    id: ID!
  ): Asset
}
`
