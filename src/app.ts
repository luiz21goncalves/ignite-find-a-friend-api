import cors from '@fastify/cors'
import fastify from 'fastify'

import { logger } from './logger'

const app = fastify({ logger })

app.register(cors)

export { app }
