import Logger from '../database/models/Logs'

export const submitLog = async (guildId: string, targetId: string, userId: string,
  logType: string, message: string, urgency: string, action: string): Promise<any> => {
  const logData =
    await Logger.create({
      guildId,
      logType,
      userId,
      action,
      targetId,
      message,
      urgency
    })
  return logData
}
