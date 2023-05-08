import { SlashCommandBuilder } from '@discordjs/builders'
import { PermissionFlagsBits } from 'discord.js'
import { type CommandInt } from '../interfaces/Command'
import { getVoiceLogChannel, updateVoiceLogChannel } from '../modules/voiceLogChannelDb'

export const setVoiceLogChannel: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('setvoicelogchannel')
    .setDescription('Sets the channel for logging voice channel information.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  run: async (interaction) => {
    await interaction.deferReply()
    const { guildId } = interaction
    const { channelId } = interaction

    const getChannel = await getVoiceLogChannel(guildId ?? '')
    await updateVoiceLogChannel(getChannel, channelId)

    const tzoffset = (new Date()).getTimezoneOffset() * -60000
    const date = new Date(Date.now() + tzoffset).toISOString().split('T')
    await interaction.editReply('[' + date[0] + ' ' + date[1].slice(0, -5) + '] **Maintenance Logs**: Successfully updated voice log channel.')
  }
}
