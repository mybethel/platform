const cleanObject = require('../../filters/cleanObject')

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
    timestamps: true
  },
  virtuals: {
    imageUrl () {
      const cdnSettings = '?crop=faces&fit=crop&w=1400&h=1400'
      const image = this.image || 'DefaultPodcaster.png'
      return `https://images.bethel.io/images/${image}${cdnSettings}&modified=${this.updatedAt.getTime()}`
    },
    settings () {
      return cleanObject({
        image: this.imageUrl,
        lastSync: this.lastSync,
        source: { 1: 'CLOUD', 2: 'VIMEO' }[this.source || 1],
        sourceMeta: this.sourceMeta.length ? this.sourceMeta.join(', ') : undefined
      })
    }
  }
}
