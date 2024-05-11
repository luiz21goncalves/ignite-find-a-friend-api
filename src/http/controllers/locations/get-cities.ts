import { FastifyReply, FastifyRequest } from 'fastify'
import { StatusCodes } from 'http-status-codes'
import z from 'zod'

import { makeFetchCitiesUseCase } from '@/use-cases/factories/make-fetch-cities-use-case'

export async function getCities(request: FastifyRequest, replay: FastifyReply) {
  const getCitiesParamsSchemas = z.object({
    acronym: z.string().transform((value) => value.toLowerCase()),
  })

  const { acronym } = getCitiesParamsSchemas.parse(request.params)

  const fetchCitiesUseCase = makeFetchCitiesUseCase()

  const { cities } = await fetchCitiesUseCase.execute({ acronym })

  return replay.status(StatusCodes.OK).send({ cities })
}
