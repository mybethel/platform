const client = require('../hooks/db')

const { dataSource: AssetDataSource } = require('../schema/asset')
const { dataSource: CollectionDataSource } = require('../schema/collection')
const MongoDataSource = require('./mongo')

module.exports = () => ({
  asset: new AssetDataSource(client.db().collection('podcastmedia')),
  collection: new CollectionDataSource(client.db().collection('podcast')),
  ministry: new MongoDataSource(client.db().collection('ministry')),
  user: new MongoDataSource(client.db().collection('user'))
})
