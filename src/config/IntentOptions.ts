import { GatewayIntentBits } from 'discord.js'

export const IntentOptions: GatewayIntentBits[] = [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildVoiceStates]
