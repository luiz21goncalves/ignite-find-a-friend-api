import { randomUUID } from 'node:crypto'

import cors from '@fastify/cors'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { AppError } from './errors/AppError'
import { InternalServerError } from './errors/InternalServerError'
import { ValidationError } from './errors/ValidationError'
import { identitiesRoutes } from './http/controllers/identities/routes'
import { logger } from './logger'

const app = fastify({ genReqId: () => randomUUID(), logger })

app.register(cors)
app.register(identitiesRoutes)

app.setErrorHandler((fastifyError, request, replay) => {
  if (fastifyError instanceof ZodError) {
    const validationError = new ValidationError(fastifyError.format())

    return replay
      .status(validationError.error.statusCode)
      .send(validationError.error)
  }

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
