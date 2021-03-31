module.exports = message => {
  description: 'Kicks the specified user'
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    message.reply('You do not have permission to use this command.')
    return
  }
  const user = message.mentions.users.first()
  if (user) {
    const member = message.guild.member(user)
    if (member) {
      member.kick('Kicked').then(() => {
        message.reply(`Successfullly kicked ${user.tag}`)
      }).catch(err => {
        message.reply(`I was unable to kick ${user.tag}`)
        console.error(err)
      })
    } else {
      message.reply(`${user.tag} does not exist`)
  }
    } else {
      message.reply('You didn\'t mention a user to kick!')
  }
}

module.exports.help = {
  name: '!kick <user>',
  description: 'Kicks the specified user'
}
