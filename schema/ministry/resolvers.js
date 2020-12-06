module.exports = {
  Query: {
    ministry: (_, { id }, { dataSources }) => dataSources.ministry.get(id)
  },
  Ministry: {
    async collections (ministry, { type }, { dataSources }) {
      const edges = await dataSources.collection.findByMinistry(ministry.id)
      return {
        edges: edges.map(node => ({ node })),
        totalCount: edges.length
      }
    }
  }
}
