module.exports = {
  Query: {
    collection: (_, { id }, { dataSources }) => dataSources.collection.get(id)
  },
  Collection: {
    description: ({ description }, { format }, { filters }) => filters.formatted(description, format),
    id: ({ _id }) => _id,
    async links (collection, _, { dataSources }) {
      const assets = await dataSources.asset.findLinkedAssets(collection._id)

      return {
        edges: assets.map(node => ({ node })),
        totalCount: assets.length
      }
    },
    ministry: ({ ministry }, _, { dataSources }) => dataSources.ministry.get(ministry),
    settings (collection, _, { filters }) {
      const items = Object.entries(collection.settings).map(([key, value]) => {
        if (value === null || value === 'undefined') return false

        if (value && typeof value === 'object' && !Array.isArray(value)) {
          return Object.entries(value).map(([childKey, childValue]) => ({ key: `${key}.${childKey}`, value: childValue }))
        }

        return { key, value }
      }).flat().filter(Boolean)

      return { items }
    }
  }
}
