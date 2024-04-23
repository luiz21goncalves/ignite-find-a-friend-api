import dotenv from 'dotenv'
import z from 'zod'

dotenv.config({
  path: ['.env', `.env.${process.env.NODE_ENV}`],
})

const envSchema = z.object({
  JWT_EXPIRES_IN: z.string(),
  JWT_SECRET: z.string(),
  LOGGER_LEVEL: z.enum([
    'fatal',
    'error',
    'warn',
    'info',
    'debug',
    'trace',
    'silent',
  ]),
  PASS_SECRET: z.string(),
  PORT: z.coerce.number(),
})

const env = envSchema.safeParse(process.env)

if (env.success === false) {
  throw new Error(
    `Invalid environment variables. ${JSON.stringify(env.error.format())}`,
  )
}

export const ENV = env.data
