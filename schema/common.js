const { DateTimeResolver, URLResolver } = require('graphql-scalars')
const gql = require('graphql-tag')

exports.typeDefs = gql`
  enum TextFormat {
    HTML
    MARKDOWN
    TEXT
  }

  scalar DateTime
  scalar URL

  type Query

  type LinkedConnection {
    edges: [LinkedEdge]
    pageInfo: PageInfo
    totalCount: Int
  }

  type LinkedEdge {
    createdAt: DateTime
    node: LinkableItem!
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }

  union LinkableItem = Asset
`

exports.resolvers = {
  DateTime: DateTimeResolver,
  LinkableItem: {
    __resolveType (obj) {
      if (obj.size) {
        return 'Asset'
      }
    }
  },
  URL: URLResolver
}
