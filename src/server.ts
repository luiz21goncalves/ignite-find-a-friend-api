import { app } from './app'

app
  .listen({ host: '0.0.0.0', port: Number(process.env.PORT) })
  .then((url) => process.stdout.write(`server running at: ${url}\n`))
