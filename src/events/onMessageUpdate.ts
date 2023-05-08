import { type Message, EmbedBuilder, type TextChannel } from 'discord.js'
import { getAdminLogChannel } from '../modules/adminLogChannelDb'

export const onMessageUpdate = async (oldMessage: Message, newMessage: Message): Promise<void> => {
  const guildId = oldMessage.guildId
  if (guildId !== null) {
    const getLog = await getAdminLogChannel(guildId)
    const channelId = getLog.channelId
    const channel = oldMessage.client.channels.cache.get(channelId) as TextChannel
    const updateEmbed = new EmbedBuilder()
    const getAttachment = oldMessage.attachments.first()
    let attachmentUrl = ''
    updateEmbed.setDescription(' ' + newMessage.content)
    if (getAttachment !== undefined) {
      attachmentUrl = getAttachment.url
      updateEmbed.setImage(attachmentUrl)
    }
    updateEmbed.addFields({ name: 'Previous Message', value: oldMessage.content, inline: true })

    updateEmbed.setAuthor({
      name: oldMessage.author.username + ' - Edited message',
      iconURL: oldMessage.author.displayAvatarURL()
    })
    updateEmbed.setFooter({
      text: 'Made by Christian Wegman'
    })
    await channel.send({ embeds: [updateEmbed] })
  }
}
