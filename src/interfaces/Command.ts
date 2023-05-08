import {
  type SlashCommandBuilder,
  type SlashCommandSubcommandsOnlyBuilder
} from '@discordjs/builders'
import { type CommandInteraction } from 'discord.js'

export interface CommandInt {
  data: Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand' > | SlashCommandSubcommandsOnlyBuilder
  run: (interaction: CommandInteraction) => Promise<any>
}
