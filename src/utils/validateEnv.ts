export const validateEnv = (): boolean => {
  if (process.env.BOT_TOKEN === null) {
    console.warn('Missing Discord bot token.')
    return false
  }

  if (process.env.MONGO_USER === null) {
    console.warn('Missing MongoDB username.')
    return false
  }

  if (process.env.MONGO_PASS === null) {
    console.warn('Missing MongoDB password.')
    return false
  }

  if (process.env.MONGO_URI === null) {
    console.warn('Missing MongoDB URI.')
    return false
  }
  return true
}
