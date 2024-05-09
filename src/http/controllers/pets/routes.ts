import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { createPet } from './create-pet'
import { getPetsCharacteristics } from './get-pets-characteristics'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/v1/pets', { onRequest: [verifyJwt] }, createPet)
  app.get('/v1/pets/characteristics', getPetsCharacteristics)
}
