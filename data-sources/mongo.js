const { DataSource } = require('apollo-datasource')
const { InMemoryLRUCache } = require('apollo-server-caching')
const { EJSON } = require('bson')
const DataLoader = require('dataloader')
const { ObjectId } = require('mongodb')

class MongoDataSource extends DataSource {
  constructor (collection) {
    super()

    this.collection = collection
    this.loader = new DataLoader(this.batchFn.bind(this))
  }

  // https://github.com/apollographql/apollo-server/blob/master/packages/apollo-datasource/src/index.ts
  initialize ({ context, cache } = {}) {
    this.context = context
    this.cache = cache || new InMemoryLRUCache()
  }

  async batchFn (ids) {
    const result = await this.collection.find({ _id: { $in: ids } }).toArray()
    return ids.map(id => result.find(({ _id }) => _id.equals(id)))
  }

  cacheKey (id) {
    return ['mongo', this.collection.collectionName, id].join('.')
  }

  find (criteria) {
    console.log(criteria)
    return this.collection.find(criteria).toArray()
  }

  // https://www.apollographql.com/blog/a-deep-dive-on-apollo-data-sources/
  async get (id, { ttlInSeconds } = {}) {
    const cacheDoc = await this.cache.get(this.cacheKey(id))
    if (cacheDoc) {
      return EJSON.parse(cacheDoc)
    }

    id = typeof id === 'string' ? ObjectId(id) : id
    const doc = await this.loader.load(id)

    if (ttlInSeconds) {
      this.cache.set(this.cacheKey(id), EJSON.stringify(doc), { ttl: ttlInSeconds })
    }

    return doc
  }
}

module.exports = MongoDataSource
