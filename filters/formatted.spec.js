const formatted = require('./formatted')

describe('filter: formatted', () => {
  const original = 'The _quick_ brown fox **jumps over** the lazy dog.'

  it('ignores null values', () =>
    expect(formatted()).toBeUndefined())

  it('defaults to markdown format', () =>
    expect(formatted(original)).toBe(original))

  it('converts markdown to html', () =>
    expect(formatted(original, 'HTML')).toContain('<strong>'))

  it('strips all formatting for plain text', () =>
    expect(formatted(original, 'TEXT')).toContain('The quick brown fox'))
})
