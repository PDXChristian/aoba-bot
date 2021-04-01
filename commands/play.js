const Discord = require('discord.js')
require('dotenv').config()
const YouTube = require('youtube-node')
var youTube = new YouTube()

youTube.setKey(process.env.YT_API_KEY)
youTube.addParam('type', 'video')

module.exports = async function execute(message, queue, serverQueue, ytdl) {

  const args = message.content.slice('!'.length).split(/ +/)
  const commands = args.shift().toLowerCase();
  const query = args.join(' ')
  const voiceChannel = message.member.voice.channel

  serverQueue = await queue.get(message.guild.id)

  var root = 'https://www.youtube.com/watch?v='
  var video = ''

  if(!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!')

  const permissions = voiceChannel.permissionsFor(message.client.user)
  if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return message.channel.send('I need permission to join and speak in your voice channel!')
  }

  if(serverQueue !== undefined && args[0] === undefined) {
    if(serverQueue.connection.dispatcher.paused) {
      message.channel.send('Music has been resumed')
      serverQueue.connection.dispatcher.resume()
      return
    } else {
      message.channel.send('Music is already playing')
      return
    }
  }

  youTube.search(query, 1, async function(error, result) {
    if (error) {
      console.log(error)
    }
    else {
      message.channel.send(`**Searching for \`${query}\`...**`)

      if(result.items[0] === undefined) {
        return message.channel.send('Can\'t find a video matching your search')
      }
      const video = root + result.items[0].id.videoId
      const songInfo = await ytdl.getInfo(video)
      const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
        image: result.items[0].snippet.thumbnails.high.url
      }

      if(!serverQueue) {

        const songQueue = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
        }

        queue.set(message.guild.id, songQueue)
        songQueue.songs.push(song)

        try {
            var connection = await voiceChannel.join().then(connection => {
            songQueue.connection = connection;

            const embed = new Discord.MessageEmbed()
            .setTitle('<:yt_icon_rgb:582082533332615168> Now Playing')
            .setColor(0xFF0000)
            .setThumbnail(song.image)
            .setDescription(`${song.title}\n${song.url}`)
            message.channel.send(embed)

            play(message.guild, songQueue.songs[0], queue, ytdl)
          })
        } catch (err) {
          console.log(err)
          queue.delete(message.guild.id)
          return message.channel.send(err)
        }
      } else {
        serverQueue.songs.push(song)
        console.log(serverQueue.songs)

        const embed = new Discord.MessageEmbed()
        .setTitle('<:yt_icon_rgb:582082533332615168> Added to Queue')
        .setColor(0xFF0000)
        .setThumbnail(song.image)
        .setDescription(`${song.title}\n${song.url}`)

        return message.channel.send(embed)
      }
    }
  })
}

function play (guild, song, queue, ytdl) {

  const serverQueue = queue.get(guild.id)

  if (!song) {
    serverQueue.voiceChannel.leave()
    queue.delete(guild.id)
    return
  }

  const streamOptions = {passes : 5}

  ytSong = ytdl(song.url, {
    filter: 'audioonly',
    highWaterMark: 512
  })

  const dispatcher = serverQueue.connection.play(ytSong, streamOptions)
  .on('finish', end => {
    console.log(end)
    console.log('Music Stopped')
    serverQueue.songs.shift()
    play(guild, serverQueue.songs[0], queue, ytdl)
  })
  .on('error', error => {
    console.error(error);
  })

  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
}

module.exports.help = {
  name: '!play',
  description: 'Plays songs in your channel'
}
