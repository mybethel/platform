module.exports = {
  Query: {
    ministry (_, { id }, { app }) {
      return app.model('ministry').findById(id)
    }
  },
  Ministry: {
    async collections (ministry, { type }, { app }) {
      let edges = await app.model('collection').find({
        ministry: ministry.id,
        type
      })

      if (!type || type === 'io.bethel.podcast') {
        edges = edges.concat(await app.model('podcast').find({ ministry: ministry.id }))
      }

      return { edges: edges.map(node => ({ node })) }
    }
  }
}
