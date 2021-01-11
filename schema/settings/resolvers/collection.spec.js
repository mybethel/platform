const collectionSettings = require('./collection')

describe('resolver: collection settings', () => {
  it('converts an Object into a flat Map', () => {
    expect(collectionSettings({ foo: 'bar' })).toEqual([{ key: 'foo', value: 'bar' }])
  })

  it('cleans null or undefined values', () => {
    const settings = collectionSettings({ foo: false, bar: null })
    expect(settings.find(({ key }) => key === 'foo')).toBeTruthy()
    expect(settings.find(({ key }) => key === 'bar')).toBeFalsy()
  })

  it('represents nested values as dot-separated', () => {
    const settings = collectionSettings({ foo: { bar: true, baz: false } })
    expect(settings.length).toBe(2)
    expect(settings.find(({ key }) => key === 'foo.bar')).toBeTruthy()
  })
})
