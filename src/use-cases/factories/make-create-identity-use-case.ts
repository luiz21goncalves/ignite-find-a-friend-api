import { PrismaIdentitiesRepository } from '@/repositories/prisma/prisma-identities-repository'

import { CreateIdentityUseCase } from '../create-identity'

export function makeCreateIdentityUseCase() {
  const prismaIdentitiesRepository = new PrismaIdentitiesRepository()
  const useCase = new CreateIdentityUseCase(prismaIdentitiesRepository)

  return useCase
}
