import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFetchPetsCharacteristicsUseCase } from '@/use-cases/factories/make-fetch-pets-characteristics-use-case'

export async function getPetsCharacteristics(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const fetchPetsCharacteristicsUseCase = makeFetchPetsCharacteristicsUseCase()

  const { age, dependency, energy, kind, size, space } =
    await fetchPetsCharacteristicsUseCase.execute()

  return replay.status(200).send({ age, dependency, energy, kind, size, space })
}
