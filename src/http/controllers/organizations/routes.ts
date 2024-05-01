import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { createOrganization } from './create-organization'

export async function organizationsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/v1/organizations', createOrganization)
}
