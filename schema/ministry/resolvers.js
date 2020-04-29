module.exports = {
  Query: {
    ministry (_, { id }, { app }) {
      return app.model('ministry').findById(id)
    }
  }
}
