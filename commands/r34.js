const Booru = require('booru')
const Discord = require('discord.js')

module.exports = function r34(message) {
  if(message.channel.nsfw === true) {
    const args = message.content.slice('!'.length).split(/ +/)
    const commands = args.shift().toLowerCase();
    const query = args.join('_')
    console.log(query)


    Booru.search('r34', [query], {limit: 1, random: true})
    .then(posts => {
      for (let post of posts) {
        const [...tags] = post.tags
        const tag = tags.join(', ')
        const embed = new Discord.RichEmbed()
        .setTitle('Rule 34')
        .setColor(0x0079FF)
        .setDescription(tag)
        .setImage(post.fileUrl)

        message.channel.send(embed)
      }
    })
  } else {
    message.channel.send('The r34 command must be run from an NSFW channel.')
  }
}

module.exports.help = {
  name: '!r34 <tag>',
  description: 'Gets a random post from rule34.xxx matching your tags'
}
