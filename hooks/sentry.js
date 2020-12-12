const {
  captureException,
  flush,
  init,
  Severity,
  withScope
} = require('@sentry/node')

const { ApolloError } = require('apollo-server')

const config = require('./config')

module.exports = {
  didEncounterErrors (context) {
    if (!context.operation) return

    for (const err of context.errors) {
      if (err instanceof ApolloError) continue

      withScope(scope => {
        scope.setTag('kind', context.operation.operation)
        scope.setExtra('query', context.request.query)
        scope.setExtra('variables', context.request.variables)

        if (err.path) {
          scope.addBreadcrumb({
            category: 'query-path',
            message: err.path.join(' > '),
            level: Severity.Debug
          })
        }

        captureException(err)
      })
    }

    return flush(2000)
  },
  serverWillStart () {
    init(config.sentry)
  }
}
