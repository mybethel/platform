const gql = require('graphql-tag')

module.exports = gql`
type Settings {
  schema: [SettingsSchema]
  items: [SettingsItem]
}

type SettingsItem {
  key: String
  value: String
}

interface SettingsSchema {
  key: String!
  type: SettingsType!
}

type SettingsSchemaGroup implements SettingsSchema {
  key: String!
  type: SettingsType!
  title: String
  children: [SettingsSchema]
}

type SettingsSchemaMulti implements SettingsSchema {
  key: String!
  type: SettingsType!
  title: String
  defaultValue: String
  items: [SettingsItem]
}

type SettingsSchemaSlider implements SettingsSchema {
  key: String!
  type: SettingsType!
  title: String
  defaultValue: Float
  minimumValue: Float
  maximumValue: Float
}

type SettingsSchemaText implements SettingsSchema {
  key: String!
  type: SettingsType!
  title: String
  defaultValue: String
}

type SettingsSchemaToggle implements SettingsSchema {
  key: String!
  type: SettingsType!
  title: String
  defaultValue: Boolean
}

enum SettingsType {
  GROUP
  MULTI
  SLIDER
  TEXT
  TOGGLE
}
`
