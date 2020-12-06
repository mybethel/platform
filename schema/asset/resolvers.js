const mime = require('mime')

module.exports = {
  Query: {
    asset: (_, { id }, { dataSources }) => dataSources.asset.get(id)
  },
  Asset: {
    contentType: ({ url }) => mime.getType(url),
    description: ({ description }, { format }, { filters }) => filters.formatted(description, format),
    id: ({ _id }) => _id,
    title: ({ name }) => name
  }
}
