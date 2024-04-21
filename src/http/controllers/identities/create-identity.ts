import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { prisma } from '@/lib/prisma'

export async function createIdentity(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const createIdentityBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = createIdentityBodySchema.parse(request.body)

  const identity = await prisma.identity.create({
    data: {
      email,
      password_hash: password,
    },
  })

  return replay.status(201).send({ identity })
}
