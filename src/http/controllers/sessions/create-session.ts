import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import z from 'zod'

import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function createSession(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const createSessionBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = createSessionBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  const { identity } = await authenticateUseCase.execute({ email, password })

  const token = await replay.jwtSign({}, { sign: { sub: identity.id } })

  return replay.status(StatusCodes.CREATED).send({ token })
}
