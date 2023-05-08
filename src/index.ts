import { Client, type Message } from 'discord.js'
import { IntentOptions } from './config/IntentOptions'
import { connectDatabase } from './database/connectDatabase'
import { validateEnv } from './utils/validateEnv'
import { onInteraction } from './events/onInteraction'
import { onReady } from './events/onReady'
import { onJoin } from './events/onJoin'
import { onMessageDelete } from './events/onMessageDelete'
import { onMessageUpdate } from './events/onMessageUpdate'

(async (): Promise<void> => {
  if (!validateEnv()) return

  const client = new Client({ intents: IntentOptions })

  await connectDatabase()
  await client.login(process.env.BOT_TOKEN)

  client.on('channelCreate', async () => {
    console.log('New Channel Created')
  })

  client.on('ready', async () => {
    await onReady(client)
  })

  client.on('interactionCreate',
    async (interaction) => { await onInteraction(interaction) }
  )

  client.on('voiceStateUpdate', async (oldState, newState) => {
    await onJoin(oldState, newState)
  })

  client.on('messageDelete', async (message) => {
    if ((message.author != null) && !message.author.bot) {
      await onMessageDelete(message as Message)
    }
  })

  client.on('messageUpdate', async (oldMessage, newMessage) => {
    if ((oldMessage.author != null) && !oldMessage.author.bot) {
      await onMessageUpdate(oldMessage as Message, newMessage as Message)
    }
  })

  client.on('guildMemberAdd', async (member) => {
    const server = member.guild.name
    await member.send(`Welcome to ${server}! Please familiarize yourself with the rules before participating.`)
  })

  client.on('error', async (msg) => { console.log(msg) })
})().catch((e: Error) => { console.log(e) })
