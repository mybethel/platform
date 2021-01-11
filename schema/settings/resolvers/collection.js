const { cleanObject } = require('../../../filters')

/**
 * Converts a settings object from the parent collection document to a flat
 * representation which conforms to the SettingsItem schema.
 * @param {Object} settings - The `settings` key from the collection document.
 * @returns {Array}
 */
module.exports = settings => Object.entries(cleanObject(settings)).map(([key, value]) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return Object.entries(value).map(([childKey, childValue]) => ({ key: `${key}.${childKey}`, value: childValue }))
  }

  return { key, value }
}).flat().filter(Boolean)
