const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { sign, verify } = require('jsonwebtoken')

const {
  ForbiddenError,
  UserInputError
} = require('apollo-server')

module.exports = {
  Mutation: {
    /**
     * Deliver an authentication token for the user to query the API for protected
     * resources. Requires an existing, valid token or a username and password
     * pair in order to deliver a new token. Tokens are valid for one week.
     * Optionally, a ministry ID can be included to allow the user to masquerade
     * as a ministry other than their primary association.
     * @param {Object} params
     * @param {String} params.email - The e-mail address of the user to login.
     * @param {String} params.password - The user password to validate.
     * @param {String} [params.token] - A valid, unexpired token in lieue of email/password.
     * @param {String} [params.ministry] - The ministry ID to use as primary.
     */
    async issueToken (_, { email, password, ministry, token }, { app, config }) {
      if (!(email && password) && !token) {
        throw new UserInputError('an e-mail and password or valid token is required')
      }

      if (token) {
        token = verify(token, config.token.hash)
      }

      const user = await app.model('user').findOne(token ? { _id: token.sub } : { email })
      if (!user) throw new ForbiddenError()

      // Allow the user to masquerade under a ministry other than their primary.
      // Requires the user to have staff permissions or to have the ministry ID
      // listed as authorized on their account.
      if (ministry) {
        const userObject = user.toJSON()
        if (userObject.permission !== 'staff' && userObject.ministriesAuthorized.indexOf(ministry) < 0) {
          throw new ForbiddenError('cannot masquerade as this ministry')
        }

        user.ministry = ministry
      }

      const newToken = sign({
        sub: user._id,
        ministry: user.ministry,
        permission: user.permission
      }, config.token.hash, {
        expiresIn: config.token.expiresInDays + 'd'
      })

      if (token) return { user, token: newToken }

      if (!await bcrypt.compare(password, user.password)) {
        throw new ForbiddenError()
      }

      return {
        ministry: app.model('ministry').findOne(user.ministry),
        user,
        token: newToken
      }
    }
  },
  User: {
    avatar ({ email }) {
      const hash = crypto.createHash('md5').update(email).digest('hex')
      return `https://gravatar.com/avatar/${hash}.png?d=mm`
    }
  }
}
