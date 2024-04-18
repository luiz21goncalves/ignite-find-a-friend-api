import { app } from "./app.js";

app.listen({ host: '0.0.0.0', port: process.env.PORT }).then(url => console.info(`server running at: ${url}`))
