import pino, { LoggerOptions } from 'pino'

const config: LoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
}

export const logger = pino(config)
