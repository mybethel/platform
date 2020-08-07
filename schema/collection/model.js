const Mongoose = require('mongoose')
module.exports = {
  schema: {
    description: String,
    image: String,
    ministry: { type: Mongoose.Schema.Types.ObjectId, ref: 'Ministry' },
    name: String,
    type: String
  },
  options: {
    timestamps: true
  }
}
