const { typeDefs, resolvers } = require('./common')

const models = require('../legacy/models')

module.exports = [
  'asset',
  'collection',
  'ministry',
  'user',
  'settings'
].reduce((result, module) => {
  const { resolvers, typeDefs, model } = require('./' + module)
  result.resolvers.push(resolvers)
  result.typeDefs.push(typeDefs)

  if (model) {
    result.models[module] = model
  }

  return result
}, {
  models,
  resolvers: [resolvers],
  typeDefs: [typeDefs]
})
