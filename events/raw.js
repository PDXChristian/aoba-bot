const events = {
  MESSAGE_REACTION_ADD: 'messageReactionAdd',
}

module.exports = async (client, event) => {
  if (!events.hasOwnProperty(event.t)) return
  const {d: data} = event
  const user = client.users.get(data.user_id)

  const channel = client.channels.get(data.channel_id) || await user.createDM()


  if (channel.messages.has(data.message_id)) return

  const message = await channel.fetchMessage(data.message_id)
  const emojiKey = data.emoji.id ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name
  const reaction = message.reactions.get(emojiKey)

  if (!reaction) {
    const emoji = new Discord.Emoji(client.guilds.get(data.guild_id), data.emoji)
    reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === client.user.id)
  }

  client.emit(events[event.t], reaction, user)
  if (message.reactions.size === 1) message.reactions.delete(emojiKey)

}
