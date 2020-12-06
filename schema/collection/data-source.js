const MongoDataSource = require('../../data-sources/mongo')

class CollectionDataSource extends MongoDataSource {
  findByMinistry (ministryId) {
    return this.collection.find({ ministry: ministryId }).toArray()
  }
}

module.exports = CollectionDataSource
