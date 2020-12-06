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
      const settings = new Map(Object.entries(collection.settings || filters.cleanObject({
        image: collection.imageUrl,
        lastSync: collection.lastSync,
        source: { 1: 'CLOUD', 2: 'VIMEO' }[collection.source || 1],
        sourceMeta: collection.sourceMeta ? collection.sourceMeta.join(', ') : undefined
      })))

      if (!settings.size) return

      return { items: Array.from(settings.entries(), ([key, value]) => ({ key, value })) }
    },
    title: ({ name }) => name,
    type: ({ type }) => type || 'io.bethel.podcast'
  }
}
