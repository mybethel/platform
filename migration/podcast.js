const { cleanObject } = require('../filters')
const client = require('../hooks/db')

const migration = []
client.connect().then(() =>
  client.db().collection('podcast').find({ deleted: { $ne: true } }).forEach(podcast => {
    migration.push(
      client.db().collection('collection').findOneAndReplace({ _id: podcast._id }, {
        _id: podcast._id,
        createdAt: podcast.createdAt,
        updatedAt: podcast.updatedAt,
        ministry: podcast.ministry,
        type: 'io.bethel.podcast',
        title: podcast.name,
        description: podcast.description,
        tags: String(podcast.tags || '').split(',').filter(Boolean),
        meta: cleanObject({
          feedUrl: podcast.feedUrl,
          lastSync: podcast.lastSync
        }),
        settings: cleanObject({
          copyright: podcast.copyright,
          source: { 1: 'CLOUD', 2: 'VIMEO' }[podcast.source || 1],
          type: { 1: 'AUDIO', 2: 'VIDEO' }[podcast.type],
          syncTags: Array.isArray(podcast.sourceMeta) ? podcast.sourceMeta.sort(String.localeCompare).filter(Boolean).map(tag => tag.toLowerCase()).join(',') : null,
          embedTheme: podcast.embedSettings && {
            controls: podcast.embedSettings.controlColor,
            slider: podcast.embedSettings.sliderColor,
            text: podcast.embedSettings.textColor
          }
        })
      }, { upsert: true })
    )
  }, async () => {
    await Promise.all(migration)
    console.log(migration.length + ' documents migrated')
    process.exit()
  })
)
