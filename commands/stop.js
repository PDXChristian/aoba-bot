module.exports = function stop(message, serverQueue) {
  if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to stop the music!')
  if (serverQueue === undefined) return message.channel.send('Nothing is playing')
  serverQueue.songs = []
  serverQueue.connection.dispatcher.end()
}

module.exports.help = {
  name: '!stop',
  description: 'Stops the music'
}
