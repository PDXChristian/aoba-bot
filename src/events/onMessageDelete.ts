import { type Message, EmbedBuilder, type TextChannel } from 'discord.js'
import { getAdminLogChannel } from '../modules/adminLogChannelDb'

export const onMessageDelete = async (message: Message): Promise<void> => {
  const guildId = message.guildId
  console.log(message)
  if (guildId !== null) {
    const getLog = await getAdminLogChannel(guildId)
    const channelId = getLog.channelId
    const channel = message.client.channels.cache.get(channelId) as TextChannel
    const deleteEmbed = new EmbedBuilder()
    const getAttachment = message.attachments.first()
    let attachmentUrl = ''
    deleteEmbed.setDescription(' ' + message.content)
    if (getAttachment !== undefined) {
      attachmentUrl = getAttachment.url
      deleteEmbed.setImage(attachmentUrl)
    }
    deleteEmbed.setAuthor({
      name: message.author.username + ' - Deleted message',
      iconURL: message.author.displayAvatarURL()
    })
    deleteEmbed.setFooter({
      text: 'Made by Christian Wegman'
    })
    await channel.send({ embeds: [deleteEmbed] })
  }
}
