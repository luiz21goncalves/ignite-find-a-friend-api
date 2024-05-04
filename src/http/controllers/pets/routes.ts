import { FastifyInstance } from 'fastify'

import { getPetsCharacteristics } from './get-pets-characteristics'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/v1/pets/characteristics', getPetsCharacteristics)
}
