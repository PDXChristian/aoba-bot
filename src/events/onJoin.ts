import { type VoiceState, type TextChannel } from 'discord.js'
import { getVoiceLogChannel } from '../modules/voiceLogChannelDb'
import { submitLog } from '../modules/loggerDb'

export const onJoin = async (oldState: VoiceState, newState: VoiceState): Promise<void> => {
  const tzoffset = (new Date()).getTimezoneOffset() * -60000
  const date = new Date(Date.now() + tzoffset).toISOString().split('T')
  const guildId = oldState.guild.id

  if (newState.channelId === null && oldState.member !== null) {
    const user = oldState.member.user
    const channelName = oldState.channel?.name
    console.log(user.username, 'left')
    if (oldState.channel != null) {
      const getLog = await getVoiceLogChannel(oldState.guild.id)
      const channelId = getLog.channelId
      console.log(getLog)
      let channel
      if (channelId !== '') {
        channel = oldState.client.channels.cache.get(channelId) as TextChannel
        await submitLog(guildId, channelId, user.id, 'VC Status Log', `${user.username} left ${channelName ?? 'Unknown'}`, 'Low', 'left')
        await channel.send('[' + date[0] + ' ' + date[1].slice(0, -5) + '] **VC Status Logs**:' + ' <@' + user.id + '> left <#' + oldState.channel.id + '>')
      }
    }
  } else if (oldState.channelId === null && newState.member !== null) {
    const user = newState.member.user
    const channelName = newState.channel?.name
    console.log(user.username, 'Joined')
    if (newState.channel != null) {
      const getLog = await getVoiceLogChannel(oldState.guild.id)
      const channelId = getLog.channelId
      console.log(getLog)
      let channel
      if (channelId !== '') {
        channel = newState.client.channels.cache.get(channelId) as TextChannel
        await submitLog(guildId, channelId, user.id, 'VC Status Log', `${user.username} joined ${channelName ?? 'Unknown'}`, 'Low', 'joined')
        await channel.send('[' + date[0] + ' ' + date[1].slice(0, -5) + '] **VC Status Logs**:' + ' <@' + user.id + '> joined <#' + newState.channel.id + '>')
      }
    }
  }
}
