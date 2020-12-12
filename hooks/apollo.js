const { ApolloServer } = require('apollo-server-micro')

const { typeDefs, resolvers } = require('../schema')
const dataSources = require('../data-sources')
const context = require('./context')

module.exports = new ApolloServer({
  context: context.bind(this),
  dataSources: dataSources.bind(this),
  introspection: true,
  playground: true,
  plugins: [
    require('./sentry')
  ],
  resolvers,
  typeDefs
})
