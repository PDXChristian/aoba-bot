module.exports = (client, reaction, user) => {

  if (user.bot) return
  const member = reaction.message.guild.member(user.id)
  if (reaction.message.id === '580952537843105792') {
    if (reaction.emoji.name === '✅') {
      member.addRole('580708131898916881')
    } else if (reaction.emoji.name === '❌') {
      member.kick('Kicked for not accepting terms.').then(() => {
        console.log(`Kicked ${user.tag} for not accepting the terms.`)
      }).catch(err =>{
        console.log(`Unable to kick ${user.tag}`)
        console.error(err)
      })
    }
  }
  reaction.emoji.reaction.remove(user.id)

}
