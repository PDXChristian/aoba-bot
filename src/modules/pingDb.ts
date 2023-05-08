import PingModel from '../database/models/PingModel'
import { type PingInt } from '../database/models/PingModel'

export const updatePingData = async (Ping: PingInt): Promise<PingInt> => {
  Ping.pings++
  await Ping.save()
  return Ping
}

export const getPingData = async (id: string): Promise<any> => {
  const pingData =
    (await PingModel.findOne({ discordId: id })) ??
    (await PingModel.create({
      discordId: id,
      pings: 0
    }))
  return pingData
}
