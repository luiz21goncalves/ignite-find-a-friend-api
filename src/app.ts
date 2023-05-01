import fastify from 'fastify'

import { logger } from './logger'

const app = fastify({
  logger,
})

export { app }
