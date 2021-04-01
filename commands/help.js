const fs = require('fs')
const Discord = require('discord.js')

module.exports = message => {
  let str = ''

  const commandList = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

  for (const file of commandList) {
    const command = require(`./${file}`)
    str += `${command.help.name} - ${command.help.description} \n`
  }
  const embed = new Discord.MessageEmbed()
    .setTitle('Commands')
    .setColor(0x0079FF)
    .setDescription(str)
  message.member.send(embed)

}

module.exports.help = {
  name: '!help',
  description: 'Lists all available commands.'
}
