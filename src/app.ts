import { randomUUID } from 'node:crypto'

import cors from '@fastify/cors'
import fastify from 'fastify'

import { AppError } from './errors/AppError'
import { InternalServerError } from './errors/InternalServerError'
import { identitiesRoutes } from './http/controllers/identities/routes'
import { logger } from './logger'

const app = fastify({ genReqId: () => randomUUID(), logger })

app.register(cors)
app.register(identitiesRoutes)

app.setErrorHandler((fastifyError, request, replay) => {
  if (fastifyError instanceof AppError) {
    const appError = fastifyError.error

    return replay.status(appError.statusCode).send(appError)
  }

  const internalServerError = new InternalServerError()

  return replay
    .status(internalServerError.error.statusCode)
    .send(internalServerError.error)
})

export { app }
