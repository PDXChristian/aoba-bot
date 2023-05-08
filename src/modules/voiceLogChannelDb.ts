import { voiceLogChannel, type LogChannelInt } from '../database/models/LogChannel'

export const getVoiceLogChannel = async (guildId: string): Promise<any> => {
  const voiceData =
    (await voiceLogChannel.findOne({ guildId })) ??
    (await voiceLogChannel.create({
      guildId,
      channelId: ''
    }))
  return voiceData
}

export const updateVoiceLogChannel = async (logChannel: LogChannelInt, channelId: string): Promise<void> => {
  logChannel.channelId = channelId
  await logChannel.save()
}
