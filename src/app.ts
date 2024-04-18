import { randomUUID } from 'node:crypto'

import cors from '@fastify/cors'
import fastify from 'fastify'

import { logger } from './logger'

const app = fastify({ genReqId: () => randomUUID(), logger })

app.register(cors)

export { app }
