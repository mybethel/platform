module.exports = {
  SettingsSchema: {
    __resolveType: ({ type }) => 'SettingsSchema' + type.charAt(0) + type.slice(1).toLowerCase()
  }
}
