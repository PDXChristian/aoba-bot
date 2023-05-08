import { adminLogChannel, type LogChannelInt } from '../database/models/LogChannel'

export const getAdminLogChannel = async (guildId: string): Promise<any> => {
  const logChannelData =
    (await adminLogChannel.findOne({ guildId })) ??
    (await adminLogChannel.create({
      guildId,
      channelId: ''
    }))
  return logChannelData
}

export const updateAdminLogChannel = async (logChannel: LogChannelInt, channelId: string): Promise<void> => {
  logChannel.channelId = channelId
  await logChannel.save()
}
