const {RedditSimple} = require('reddit-simple')
const Discord = require('discord.js')

module.exports = async message => {
  
  const randPost = await RedditSimple.RandomPost('HydroHomies')
  const embed = new Discord.MessageEmbed()
    .setTitle(randPost[0].data.title)
    .setImage(randPost[0].data.url)
    .setColor(0x0079FF)
    .setURL('https://reddit.com' + randPost[0].data.permalink)    
  message.channel.send(embed)

}

module.exports.help = {
  name: '!hydro',
  description: 'Grabs a random post from r/hydrohomies'
}
