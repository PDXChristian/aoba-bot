import { SlashCommandBuilder } from '@discordjs/builders'
import { type CommandInt } from '../interfaces/Command'
import { getPingData, updatePingData } from '../modules/pingDb'
import { EmbedBuilder } from 'discord.js'

export const ping: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping to add to your ping score'),
  run: async (interaction) => {
    await interaction.deferReply()
    const { user } = interaction

    const targetPing = await getPingData(user.id)
    const updatedPing = await updatePingData(targetPing)

    const pingEmbed = new EmbedBuilder()
    pingEmbed.setTitle('Ping counter')
    pingEmbed.setDescription('Returns the number of times you ran this command.')
    pingEmbed.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL()
    })
    pingEmbed.addFields({ name: 'Pings', value: updatedPing.pings.toString(), inline: true })
    pingEmbed.setFooter({
      text: 'Made by Christian Wegman'
    })

    await interaction.editReply({ embeds: [pingEmbed] })
  }
}
