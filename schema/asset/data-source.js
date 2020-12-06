const MongoDataSource = require('../../data-sources/mongo')

class AssetDataSource extends MongoDataSource {
  findLinkedAssets (collectionId) {
    return this.collection.find({
      $or: [
        { podcast: collectionId }
      ]
    }).sort({ date: -1 }).toArray()
  }
}

module.exports = AssetDataSource
