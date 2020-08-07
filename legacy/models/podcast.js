module.exports = {
  schema: {
    deleted: Boolean,
    description: String,
    image: String,
    lastSync: Date,
    ministry: { type: 'ObjectId', ref: 'Ministry' },
    name: String,
    source: Number,
    sourceMeta: [String],
    storage: Number,
    service: { type: 'ObjectId', ref: 'Integration' }
  },
  options: {
    collection: 'podcast',
    timestamps: true,
    toJSON: {
      transform (doc, ret, options) {
        ret.image = doc.imageUrl
        delete ret.temporaryImage
        return ret
      }
    }
  },
  virtuals: {
    imageUrl () {
      const cdnSettings = '?crop=faces&fit=crop&w=1400&h=1400'
      const image = this.image || 'DefaultPodcaster.png'
      return `https://images.bethel.io/images/${image}${cdnSettings}&modified=${this.updatedAt.getTime()}`
    }
  }
}
