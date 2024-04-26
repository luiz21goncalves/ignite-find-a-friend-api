import { FastifyInstance } from 'fastify'

import { getStates } from './get-states'

export async function locationsRoutes(app: FastifyInstance) {
  app.get('/v1/locations/states', getStates)
}
