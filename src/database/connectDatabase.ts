import mongoose from 'mongoose'

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGO_URI as string,
    { user: process.env.MONGO_USER, pass: process.env.MONGO_PASS })
  mongoose.set('strictQuery', false)
  console.log('Connected to the database.')
}
