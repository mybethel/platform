const { ApolloServer } = require('apollo-server-micro')
const cors = require('micro-cors')

const { typeDefs, resolvers } = require('./schema')
const dataSources = require('./data-sources')
const config = require('./hooks/config')

const server = new ApolloServer({
  context: () => ({ config }),
  dataSources: dataSources.bind(this),
  introspection: true,
  playground: true,
  resolvers,
  typeDefs
}).createHandler()

module.exports = cors(config.cors)(server)
