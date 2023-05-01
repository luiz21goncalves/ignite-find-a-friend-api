import fastify from 'fastify'

import { petsRoutes } from './http/controllers/pets/routes'
import { logger } from './logger'

const app = fastify({
  logger,
})

app.register(petsRoutes)

export { app }
