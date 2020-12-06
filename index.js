const cors = require('micro-cors')

const config = require('./hooks/config')
const client = require('./hooks/db')

const apollo = require('./apollo')

const server = apollo.createHandler()

module.exports = cors(config.cors)(async (req, res) => {
  if (req.method === 'OPTIONS') return res.end()
  if (!client.isConnected()) await client.connect()
  server(req, res)
})
