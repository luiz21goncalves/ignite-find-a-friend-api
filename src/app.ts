import { randomUUID } from 'node:crypto'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { ENV } from './env'
import { AppError } from './errors/AppError'
import { InternalServerError } from './errors/InternalServerError'
import { ValidationError } from './errors/ValidationError'
import { identitiesRoutes } from './http/controllers/identities/routes'
import { sessionsRoutes } from './http/controllers/sessions/routes'
import { logger } from './logger'

const app = fastify({ genReqId: () => randomUUID(), logger })

app.addHook('preHandler', (request, _replay, next) => {
  request.log.trace({
    body: request.body,
    header: request.headers,
    params: request.params,
    query: request.query,
  })

  next()
})

app.addHook('onSend', (_request, replay, payload, done) => {
  replay.log.trace({
    body: JSON.parse((payload as string) ?? ''),
    headers: replay.getHeaders(),
  })

  done()
})

app.register(cors)
app.register(jwt, {
  secret: ENV.JWT_SECRET,
  sign: {
    expiresIn: ENV.JWT_EXPIRES_IN,
  },
})

app.register(identitiesRoutes)
app.register(sessionsRoutes)

app.setErrorHandler((fastifyError, request, replay) => {
  if (fastifyError instanceof ZodError) {
    const validationError = new ValidationError(fastifyError.format())

    request.log.error(validationError.error)

    return replay
      .status(validationError.error.statusCode)
      .send(validationError.error)
  }

  if (fastifyError instanceof AppError) {
    const appError = fastifyError.error

    request.log.error(appError)

    return replay.status(appError.statusCode).send(appError)
  }

  const internalServerError = new InternalServerError()

  request.log.error(fastifyError)

  return replay
    .status(internalServerError.error.statusCode)
    .send(internalServerError.error)
})

export { app }
