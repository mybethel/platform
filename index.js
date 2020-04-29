const { resolve } = require('path')

const { utils, nautilus } = require('@nautilus/micro')
const { ApolloServer } = require('apollo-server-micro')

const { models, typeDefs, resolvers } = require('./schema')

const config = utils.config(resolve(__dirname, './config'))

const server = new ApolloServer({
  context: ({ req: { app } }) => ({
    app,
    config
  }),
  introspection: true,
  playground: true,
  resolvers,
  typeDefs
}).createHandler()

module.exports = nautilus((req, res, app) => {
  req.app = app
  server(req, res)
}, { ...config, models })
