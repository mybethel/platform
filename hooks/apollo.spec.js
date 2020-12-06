const { createTestClient } = require('apollo-server-testing')
const gql = require('graphql-tag')

const apollo = require('./apollo')

jest.mock('./db', () => ({
  db: jest.fn().mockReturnValue({
    collection: jest.fn()
  })
}))

describe('hooks: apollo', () => {
  it('creates an apollo instance', () => {
    expect(apollo.createHandler).toBeDefined()
  })

  it('allows queries to be executed', async () => {
    const { query } = createTestClient(apollo)
    const res = await query({ query: gql`{ __schema { types { name } } }` })

    expect(res.errors).not.toBeDefined()
    expect(res.data).toBeDefined()
    expect(res.data.__schema).toBeDefined()
  })
})
