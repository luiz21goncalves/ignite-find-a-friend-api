import { randomUUID } from 'node:crypto'

import cors from '@fastify/cors'
import fastify from 'fastify'

import { identitiesRoutes } from './http/controllers/identities/routes'
import { logger } from './logger'

const app = fastify({ genReqId: () => randomUUID(), logger })

app.register(cors)
app.register(identitiesRoutes)

export { app }
