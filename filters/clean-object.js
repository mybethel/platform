module.exports = object => Object.keys(object).reduce((clean, key) => {
  if (object[key] === undefined) return clean
  clean[key] = object[key]
  return clean
}, {})
