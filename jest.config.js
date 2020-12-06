module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'data-sources/*.js',
    'filters/*.js',
    'hooks/*.js',
    'schema/**/*.js',
    'index.js',
    '!**/*.spec.js'
  ],
  coverageReporters: ['html', 'lcovonly', 'text-summary'],
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec).js']
}
