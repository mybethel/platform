module.exports = {
  Query: {
    ministry: (_, { id }, { dataSources }) => dataSources.ministry.get(id)
  },
  Ministry: {
    async collections (ministry, { type }, { dataSources }) {
      const edges = await dataSources.collection.findByMinistry(ministry._id)
      return {
        edges: edges.map(node => ({ node })),
        totalCount: edges.length
      }
    },
    id: ({ _id }) => _id
  },
  MinistryConnection: {
    edges: (nodes) => nodes.map(node => ({ node })),
    totalCount: (nodes) => nodes.length
  }
}
