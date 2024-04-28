import { FastifyReply, FastifyRequest } from 'fastify'

export function getCities(_request: FastifyRequest, replay: FastifyReply) {
  return replay.status(200).send({ cities: [] })
}
