import { FastifyInstance } from 'fastify'

import { getCities } from './get-cities'
import { getStates } from './get-states'

export async function locationsRoutes(app: FastifyInstance) {
  app.get('/v1/locations/states', getStates)
  app.get('/v1/locations/states/:acronym/cities', getCities)
}
