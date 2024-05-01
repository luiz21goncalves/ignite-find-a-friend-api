import { FastifyReply, FastifyRequest } from 'fastify'

import { AuthenticationError } from '@/errors/authentication-error'

export async function verifyJwt(
  request: FastifyRequest,
  _replay: FastifyReply,
) {
  try {
    await request.jwtVerify()
  } catch (error) {
    request.log.error(error)

    throw new AuthenticationError()
  }
}
