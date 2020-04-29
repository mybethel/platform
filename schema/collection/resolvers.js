const formatted = require('../../filters/formatted')

module.exports = {
  Query: {
    collection (_, { id }, { app }) {
      return app.model('collection').findById(id)
    }
  },
  Collection: {
    description: ({ description }, { format }) => formatted(description, format),
    async links (collection, _, { app }) {
      const edges = await app.model('asset').find({ podcast: collection.id }).sort({ date: -1 })
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
