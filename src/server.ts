import fastify from 'fastify'

const app = fastify()

app.listen({ port: 3333, host: '0.0.0.0' }).then(console.log)

process.on('uncaughtException', (error, origin) => {
  console.error(error, origin)
})

process.on('unhandledRejection', (error) => {
  console.error(error)
})
