import { type Client } from 'discord.js'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { CommandList } from '../commands/_CommandList'

export const onReady = async (client: Client): Promise<void> => {
  const rest = new REST({ version: '10' }).setToken(
    process.env.BOT_TOKEN as string
  )

  const commandData = CommandList.map((command) => command.data.toJSON())

  await rest.put(
    Routes.applicationCommands(
      client.user?.id ?? 'missing id'
    ),
    { body: commandData }
  )
  console.log('Discord ready!')
}
