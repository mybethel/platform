const { MongoClient } = require('mongodb')

const config = require('./config')

const client = new MongoClient(config.connections.mongo.uri, {
  useUnifiedTopology: true
})

module.exports = client
