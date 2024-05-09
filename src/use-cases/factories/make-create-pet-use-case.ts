import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(
    prismaOrganizationsRepository,
    prismaPetsRepository,
  )

  return useCase
}
