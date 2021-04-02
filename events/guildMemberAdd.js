module.exports = (client, member) => {

  const rules = member.guild.channels.cache.find(chRules => chRules.name === 'rules')

  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome')

  if (!channel) return;

  channel.send(`Welcome to the server, ${member}! Please read the <#${rules.id}> before you can post and join voice channels!`);

  member.send('Welcome to the server! Please be aware that this server is dedicated to development within Techilepsy, LLC. Please read the rules to find out what is tolerated.')

}
