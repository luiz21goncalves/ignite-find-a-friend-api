import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'

import { makeFetchStatesUseCase } from '@/use-cases/factories/make-fetch-states-use-case'

export async function getStates(
  _request: FastifyRequest,
  replay: FastifyReply,
) {
  const fetchStatesUseCase = makeFetchStatesUseCase()

  const { states } = await fetchStatesUseCase.execute()

  return replay.status(StatusCodes.OK).send({ states })
}
