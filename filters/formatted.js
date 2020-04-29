const marked = require('marked')
const plain = require('remove-markdown')

marked.setOptions({
  breaks: true,
  gfm: true,
  smartypants: true,
  xhtml: true
})

/**
 * Convert a raw value to it's requested TextFormat. It is expected that the
 * value is stored in Markdown format, so requesting this format has no affect.
 * @param {String} value
 * @param {String} format
 * @return {String}
 */
module.exports = (value, format = 'MARKDOWN') => {
  if (!value) return value
  value = String(value).trim()

  switch (format) {
    case 'HTML':
      return marked(value)
    case 'TEXT':
      return plain(value)
    default:
      return value
  }
}
