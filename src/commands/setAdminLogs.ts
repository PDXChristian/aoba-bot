import { SlashCommandBuilder } from '@discordjs/builders'
import { PermissionFlagsBits } from 'discord.js'
import { type CommandInt } from '../interfaces/Command'
import { getAdminLogChannel, updateAdminLogChannel } from '../modules/adminLogChannelDb'

export const setAdminLogChannel: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('setadminlogchannel')
    .setDescription('Sets the channel for logging administrative information.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  run: async (interaction) => {
    await interaction.deferReply()
    const { guildId } = interaction
    const { channelId } = interaction

    const getChannel = await getAdminLogChannel(guildId ?? '')
    await updateAdminLogChannel(getChannel, channelId)

    const tzoffset = (new Date()).getTimezoneOffset() * -60000
    const date = new Date(Date.now() + tzoffset).toISOString().split('T')
    await interaction.editReply('[' + date[0] + ' ' + date[1].slice(0, -5) + '] **Maintenance Logs**: Successfully updated admin log channel.')
  }
}
