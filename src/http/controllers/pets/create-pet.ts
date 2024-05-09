import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

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

  return replay.status(201).send({})
}
