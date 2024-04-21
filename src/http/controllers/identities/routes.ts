import { FastifyInstance } from 'fastify'

import { createIdentity } from './create-identity'

export async function identitiesRoutes(app: FastifyInstance) {
  app.post('/v1/identities', createIdentity)
}
