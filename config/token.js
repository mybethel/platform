module.exports = {
  expiresInDays: 7,
  get hash () {
    const key = 'Rm9yIEdvZCBzbyBsb3ZlZCB0aGUgd29ybGQ'
    if (!process.env.AWS_LAMBDA_LOG_GROUP_NAME) return key

    const [prodKey] = process.env.AWS_LAMBDA_LOG_GROUP_NAME.split('-')
    return Buffer.from(key + prodKey).toString('base64')
  }
}
