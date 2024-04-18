import { app } from './app.js'

app
  .listen({ host: '0.0.0.0', port: process.env.PORT })
  .then((url) => process.stdout.write(`server running at: ${url}\n`))
