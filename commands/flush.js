module.exports = async function flush(message) {
  if(!message.member.hasPermission('MANAGE_MESSAGES')) {
    message.channel.send('You do not have the proper permissions for this command.')
    return
  }
  message.delete()
  const fetched = await message.channel.fetchMessages({limit: 100})
  message.channel.bulkDelete(fetched, true)
  .then(messages => message.channel.send(`Successfully deleted ${messages.size} messages`))
  .catch(error =>
    message.channel.send('Unable to delete messages.'))
}

module.exports.help = {
  name: '!flush',
  description: 'Flushes the last 100 messages that were sent within 14 days.'
}
