import z from 'zod'

const envSchema = z.object({
  LOGGER_LEVEL: z.enum([
    'fatal',
    'error',
    'warn',
    'info',
    'debug',
    'trace',
    'silent',
  ]),
  PORT: z.coerce.number(),
})

const env = envSchema.safeParse(process.env)

if (env.success === false) {
  throw new Error(
    `Invalid environment variables. ${JSON.stringify(env.error.format())}`,
  )
}

export const ENV = env.data
