import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { FetchPetsUseCase } from '../fetch-pets'

export function makeFetchPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsUseCase(prismaPetsRepository)

  return useCase
}
