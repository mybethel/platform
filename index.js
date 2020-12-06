const { ApolloServer } = require('apollo-server-micro')
const cors = require('micro-cors')

const { typeDefs, resolvers } = require('./schema')
const dataSources = require('./data-sources')
const config = require('./hooks/config')
const context = require('./hooks/context')
const client = require('./hooks/db')

const server = new ApolloServer({
  context: context.bind(this),
  dataSources: dataSources.bind(this),
  introspection: true,
  playground: true,
  resolvers,
  typeDefs
}).createHandler()

module.exports = cors(config.cors)(async (req, res) => {
  if (req.method === 'OPTIONS') return res.end()
  if (!client.isConnected()) await client.connect()
  server(req, res)
})
