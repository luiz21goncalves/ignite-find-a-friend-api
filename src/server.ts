import { app } from './app'
import { ENV } from './env'
import { logger } from './logger'

app.listen({ port: ENV.PORT, host: '0.0.0.0' })

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
