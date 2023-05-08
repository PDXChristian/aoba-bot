import { type Document, model, Schema } from 'mongoose'

export interface LogChannelInt extends Document {
  guildId: string
  channelId: string
}

export const LogChannel = new Schema({
  guildId: String,
  channelId: String
})

export const voiceLogChannel = model<LogChannelInt>('voicelogchannel', LogChannel)
export const adminLogChannel = model<LogChannelInt>('adminlogchannel', LogChannel)
