exports.withLegacyModels = async (models, cb) => {
  let found
  let attempt = 0

  while (!found) {
    attempt++
    found = await cb(models[attempt])
  }

  found.model = models[attempt]
  return found
}
