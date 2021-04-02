module.exports = client => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('normal person things', { type: 'PLAYING' })
    .then(presence => console.log(`Activity set to ${presence.activities ? presence.activities[0].name : 'none'}`))
    .catch(console.error)
}
