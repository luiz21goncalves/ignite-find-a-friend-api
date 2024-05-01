import { PrismaIdentitiesRepository } from '@/repositories/prisma/prisma-identities-repository'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

import { CreateOrganizationUseCase } from '../create-organization'

export function makeCreateOrganizationUseCase() {
  const prismaIdentitiesRepository = new PrismaIdentitiesRepository()
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new CreateOrganizationUseCase(
    prismaIdentitiesRepository,
    prismaOrganizationsRepository,
  )

  return useCase
}
