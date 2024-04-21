import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeCreateIdentityUseCase } from '@/use-cases/factories/make-create-identity-use-case'

export async function createIdentity(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const createIdentityBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = createIdentityBodySchema.parse(request.body)

  const createIdentityUseCase = makeCreateIdentityUseCase()

  const { identity } = await createIdentityUseCase.execute({ email, password })

  return replay.status(201).send({ identity })
}
