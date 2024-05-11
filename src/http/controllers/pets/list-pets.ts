import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'

export async function listPets(request: FastifyRequest, replay: FastifyReply) {
  return replay.status(StatusCodes.OK).send({})
}
