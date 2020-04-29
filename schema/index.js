const { typeDefs, resolvers } = require('./common')

module.exports = [
  'asset',
  'collection',
  'ministry',
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
  models: {},
  resolvers: [resolvers],
  typeDefs: [typeDefs]
})
