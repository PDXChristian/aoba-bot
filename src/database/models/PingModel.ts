import { type Document, model, Schema } from 'mongoose'

export interface PingInt extends Document {
  discordId: string
  pings: number
}

export const Ping = new Schema({
  discordId: String,
  pings: Number
}, { timestamps: true })

export default model<PingInt>('ping', Ping)
