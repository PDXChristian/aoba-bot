module.exports = function resume(message, serverQueue) {
  if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to pause the music!')
  if(!serverQueue.connection.dispatcher.paused) return message.channel.send('The music is already playing')
  message.channel.send('Music has been resumed')
  serverQueue.connection.dispatcher.resume()
}

module.exports.help = {
  name: '!resume',
  description: 'Resumes the music'
}
