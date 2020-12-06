const mime = require('mime')

const formatted = require('../../filters/formatted')

module.exports = {
  Query: {
    asset: (_, { id }, { dataSources }) => dataSources.asset.get(id)
  },
  Asset: {
    contentType: ({ url }) => mime.getType(url),
    description: ({ description }, { format }) => formatted(description, format),
    title: ({ name }) => name
  }
}
