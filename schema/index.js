const { typeDefs, resolvers } = require('./common')

module.exports = [
  'asset',
  'collection',
  'ministry',
  'user',
  'settings'
].reduce((result, module) => {
  const { resolvers, typeDefs } = require('./' + module)
  result.resolvers.push(resolvers)
  result.typeDefs.push(typeDefs)
  return result
}, {
  resolvers: [resolvers],
  typeDefs: [typeDefs]
})
