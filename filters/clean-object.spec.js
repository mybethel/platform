const cleanObject = require('./clean-object')

describe('filter: clean object', () => {
  it('removes undefined key/value pairs', () => {
    const clean = cleanObject({ foo: 'bar', bar: undefined })
    expect(Object.keys(clean)).toContain('foo')
    expect(Object.keys(clean)).not.toContain('bar')
  })

  it('does not mutate the original object', () => {
    const original = { foo: 'bar' }
    const clean = cleanObject(original)
    original.bar = 'baz'
    expect(clean.bar).not.toBeDefined()
  })
})
