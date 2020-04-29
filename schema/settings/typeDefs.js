const gql = require('graphql-tag')

module.exports = gql`
type Settings {
  schema: SettingsSchema
  items: [SettingsItem]
}

type SettingsItem {
  key: String
  value: String
}

type SettingsSchema {
  type: String
  title: String
  key: String!
  defaultValue: String
  minimumValue: String
  maximumValue: String
}
`
