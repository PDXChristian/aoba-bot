import { type Document, model, Schema } from 'mongoose'

export interface LoggerInt extends Document {
  guildId: string
  logType: string
  userId: string
  action: string
  targetId: string
  message: string
  urgency: string
}

export const Logger = new Schema({
  guildId: String,
  logType: String,
  userId: String,
  action: String,
  targetId: String,
  message: String,
  urgency: String
}, { timestamps: { createdAt: true, updatedAt: false } })

export default model<LoggerInt>('logger', Logger)
