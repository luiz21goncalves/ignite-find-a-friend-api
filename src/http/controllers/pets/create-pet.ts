import { FastifyReply, FastifyRequest } from 'fastify'

export async function createPet(request: FastifyRequest, replay: FastifyReply) {
  return replay.status(201).send({})
}
