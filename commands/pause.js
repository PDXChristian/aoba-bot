module.exports = function pause(message, serverQueue) {
  if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to pause the music!')
  if(serverQueue.connection.dispatcher.paused) return message.channel.send('The music is already paused')
  message.channel.send('Music has been paused')
  serverQueue.connection.dispatcher.pause()
}

module.exports.help = {
  name: '!pause',
  description: 'Pauses the music'
}
