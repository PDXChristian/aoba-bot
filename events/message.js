const kick = require('../commands/kick')
const play = require('../commands/play')
const skip = require('../commands/skip')
const stop = require('../commands/stop')
const ytdl = require('ytdl-core')
const help = require('../commands/help')
const r34 = require('../commands/r34')
const flush = require('../commands/flush')
const pause = require('../commands/pause')
const resume = require('../commands/resume')
const songQueue = require('../commands/queue')
const hydro = require('../commands/hydro')
const queue = new Map()

module.exports = (client, message) => {

  if (message.author.bot) return

  if (!message.guild) return

  const serverQueue = queue.get(message.guild.id)

  if (message.content.toLowerCase() === '!ping') {
    message.reply('Pong!')
  }

  if ((message.channel.name === 'rules' || message.channel.name === 'welcome') && !message.member.user.bot) {
    message.delete()
  }

  if (message.content.toLowerCase() === '!help') {
    help(message)
  }

  if (message.content.toLowerCase().startsWith('!kick')) {
    return kick(message)
  }

  if (message.content.toLowerCase().startsWith('!play')) {
    return play(message, queue, serverQueue, ytdl)

  }

  if (message.content.toLowerCase().startsWith('!skip')) {
    skip(message, serverQueue)
    return
  }

  if (message.content.toLowerCase().startsWith('!stop')) {
    stop(message, serverQueue)
    return
  }

  if (message.content.toLowerCase().startsWith('!r34')) {
    r34(message)
    return
  }

  if (message.content.toLowerCase().startsWith('!flush')) {
    flush(message)
    return
  }

  if (message.content.toLowerCase() === '!pause') {
    pause(message, serverQueue)
    return
  }

  if (message.content.toLowerCase() === '!resume') {
    resume(message, serverQueue)
    return
  } 

  if(message.content.toLowerCase() === '!queue') {
    return songQueue(message, serverQueue)
  }

  if(message.content.toLowerCase() === '!hydro') {
    return hydro(message)
  } 
}
