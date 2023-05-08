import { type CommandInt } from '../interfaces/Command'
import { ping } from './ping'
import { setVoiceLogChannel } from './setVoiceLogs'
import { setAdminLogChannel } from './setAdminLogs'
import { flush } from './flush'
import { help } from './help'

export const CommandList: CommandInt[] = [ping, setVoiceLogChannel, setAdminLogChannel, flush, help]
