const bcrypt = require('bcrypt')
const Mongoose = require('mongoose')

module.exports = {
  middleware: {
    async preSave (next) {
      if (!this.isModified('password')) return next()
      this.password = await bcrypt.hash(this.password, 10)
      next()
    }
  },
  schema: {
    confirmed: {
      type: Boolean,
      default: false
    },
    email: {
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
      type: String
    },
    isLocked: Boolean,
    lastLogin: Date,
    ministry: { type: Mongoose.Schema.Types.ObjectId, ref: 'Ministry' },
    ministriesAuthorized: [Mongoose.Schema.Types.ObjectId],
    name: String,
    password: String,
    permission: {
      type: String,
      enum: ['staff', 'admin', 'user', 'restricted']
    },
    title: String
  },
  options: {
    collection: 'user'
  }
}
