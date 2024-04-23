import { FastifyInstance } from 'fastify'

import { createSession } from './create-session'

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/v1/sessions', createSession)
}
