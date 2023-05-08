import { type Document, model, Schema } from 'mongoose'

export interface LastSeenInt extends Document {
  discordId: string
  pings: number
}

export const LastSeen = new Schema({
  discordId: String,
  timestamp: Number
})

export default model<LastSeenInt>('lastseen', LastSeen)
