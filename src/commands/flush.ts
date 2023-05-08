import { SlashCommandBuilder, type TextChannel } from 'discord.js'
import { type CommandInt } from '../interfaces/Command'

export const flush: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('flush')
    .setDescription('Flushes messages')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Target user')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('count')
        .setDescription('Set number of messages to delete. Default 50, up to 100')),
  run: async (interaction) => {
    if (interaction.isChatInputCommand()) {
      const count: number = interaction.options.getInteger('count') ?? 50
      let messages = await interaction.channel?.messages.fetch({ limit: count }) ?? undefined
      const channel = interaction.channel as TextChannel
      if (messages !== undefined) {
        const userid = interaction.options.getUser('target')?.id
        console.log(userid)
        if (userid === null) {
          await interaction.reply('Invalid user')
        } else {
          // @ts-expect-error: Filter is defined, but isn't available on the interface
          messages = messages?.filter((message: any) => message.author.id === userid)

          if (messages !== undefined) {
            await channel.bulkDelete(messages)
          }
          await interaction.reply(`Deleted ${messages?.size ?? 0} messages`)
        }
      }
    }
  }
}
