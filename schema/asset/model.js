module.exports = {
  schema: {
    date: { type: Date, default: Date.now },
    description: String,
    filename: String,
    in: [{ type: 'ObjectId', ref: 'Collection' }],
    ministry: { type: 'ObjectId', ref: 'Ministry' },
    name: String,
    size: Number,
    tags: [String],
    thumbnail: String
  },
  options: {
    timestamps: true
  }
}
