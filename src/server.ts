import { app } from './app'
import { logger } from './logger'

app.listen({ port: 3333, host: '0.0.0.0' })

function gracefulShutdown() {
  logger.info('Shutting down server')
  app.close(() => process.exit())
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)

process.on('uncaughtException', (error, origin) => {
  logger.error(error, origin)
})

process.on('unhandledRejection', (error) => {
  logger.error(error)
})
