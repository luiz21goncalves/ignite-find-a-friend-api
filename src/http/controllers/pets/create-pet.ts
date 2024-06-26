import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import z from 'zod'

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function createPet(request: FastifyRequest, replay: FastifyReply) {
  const createPetBodySchema = z.object({
    about: z.string(),
    age: z.string(),
    dependency: z.string(),
    energy: z.string(),
    kind: z.string(),
    name: z.string(),
    size: z.string(),
    space: z.string(),
  })

  const { about, age, dependency, kind, name, size, space, energy } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({
    about,
    age,
    dependency,
    energy,
    identity_id: request.user.sub,
    kind,
    name,
    size,
    space,
  })

  return replay.status(StatusCodes.CREATED).send({ pet })
}
