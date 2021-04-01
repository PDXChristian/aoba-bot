module.exports = function skip(message, serverQueue) {
  if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to skip!')
  if (!serverQueue) return message.channel.send('There is nothing playing!')
  message.channel.send(`Successfully skipped!`)
  serverQueue.connection.dispatcher.end()
}

module.exports.help = {
  name: '!skip',
  description: 'Skips the current song'
}
