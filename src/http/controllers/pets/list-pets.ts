import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import z from 'zod'

export async function listPets(request: FastifyRequest, replay: FastifyReply) {
  const listPetsQueryParamsSchema = z.object({
    age: z.string().optional(),
    dependency: z.string().optional(),
    energy: z.string().optional(),
    kind: z.string().optional(),
    size: z.string().optional(),
    space: z.string().optional(),
    zip_code: z.string(),
  })

  const { zip_code, age, dependency, energy, kind, size, space } =
    listPetsQueryParamsSchema.parse(request.query)

  return replay.status(StatusCodes.OK).send({})
}
