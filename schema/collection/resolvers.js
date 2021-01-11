const collectionSettings = require('../settings/resolvers/collection')

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
    settings: ({ settings, type }, _, { dataSources }) => ({
      schema: async () => (await dataSources.apps.get(type)).settings.collections,
      items: collectionSettings(settings)
    })
  }
}
