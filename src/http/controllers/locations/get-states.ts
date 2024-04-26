import { FastifyReply, FastifyRequest } from 'fastify'

export async function getStates(
  _request: FastifyRequest,
  replay: FastifyReply,
) {
  return replay.status(200).send({ states: [] })
}
