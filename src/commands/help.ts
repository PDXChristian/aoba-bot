import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { type CommandInt } from '../interfaces/Command'
import { CommandList } from './_CommandList'

export const help: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Lists all available commands'),
  run: async (interaction) => {
    const commandData = CommandList.map((command) => command.data.toJSON())
    const helpEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Help')
      .setDescription('List of available commands')
    commandData.forEach(function (data) {
      helpEmbed.addFields({ name: data.name, value: data.description })
    })
    await interaction.reply({ embeds: [helpEmbed], ephemeral: true })
  }
}
