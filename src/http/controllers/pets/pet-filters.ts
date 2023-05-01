import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'

import { makeGetPetFilters } from '@/use-cases/pets/factories/make-get-pet-filters'

export async function petFilters(
  _request: FastifyRequest,
  replay: FastifyReply,
) {
  const getPetFiltersUseCase = makeGetPetFilters()

  const filters = await getPetFiltersUseCase.execute()

  return replay.status(StatusCodes.OK).send({ filters })
}
