const formatted = require('../../filters/formatted')
const { withLegacyModels } = require('../../legacy/utils')

module.exports = {
  Query: {
    collection (_, { id }, { app }) {
      return withLegacyModels([
        app.model('collection'),
        app.model('podcast')
      ], model => model.findById(id))
    }
  },
  Collection: {
    description: ({ description }, { format }) => formatted(description, format),
    async links (collection, _, { app }) {
      const [assets, legacy] = await Promise.all([
        app.model('asset').find({ in: collection.id }),
        app.model('podcastmedia').find({ podcast: collection.id })
      ])

      const edges = assets.concat(legacy).sort((a, b) => new Date(b.date) - new Date(a.date))

      return {
        edges: edges.map(node => ({ node })),
        totalCount: edges.length
      }
    },
    ministry: ({ ministry }, _, { app }) => app.model('ministry').findById(ministry),
    title: ({ name }) => name,
    type: ({ type }) => type || 'io.bethel.podcast'
  }
}
