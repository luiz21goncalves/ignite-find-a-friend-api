import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function createPet(request: FastifyRequest, replay: FastifyReply) {
  const createPetBodySchema = z.object({
    about: z.string(),
    age: z.string(),
    dependency: z.string(),
    kind: z.string(),
    name: z.string(),
    size: z.string(),
    space: z.string(),
  })

  const { about, age, dependency, kind, name, size, space } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const { pet } = await createPetUseCase.execute({
    about,
    age,
    dependency,
    identity_id: request.user.sub,
    kind,
    name,
    size,
    space,
  })

  return replay.status(201).send({ pet })
}
