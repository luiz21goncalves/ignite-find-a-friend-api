import fastify from 'fastify'

const app = fastify()

app
  .listen({ port: 3333, host: '0.0.0.0' })
  .then((url) => console.log(`Server started at url:${url}`))

function gracefulShutdown() {
  console.log('server ending')
  app.close(() => process.exit())
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)

process.on('uncaughtException', (error, origin) => {
  console.error(error, origin)
})

process.on('unhandledRejection', (error) => {
  console.error(error)
})
