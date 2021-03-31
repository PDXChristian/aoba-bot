const Discord = require('discord.js')

module.exports = function songQueue(message, serverQueue) {
  if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to list the songs!')
  if (!serverQueue) return message.channel.send('There is nothing in the queue!')
  const embed = new Discord.RichEmbed()
  .setTitle('<:yt_icon_rgb:582082533332615168> Now Playing')
  .setColor(0xFF0000)
  serverQueue.songs.forEach( song => {
    embed.addField(song.title, song.url)
  })
  return message.channel.send(embed)
}

module.exports.help = {
  name: '!queue',
  description: 'Lists all songs in queue.'
}
