import { PrismaIdentitiesRepository } from '@/repositories/prisma/prisma-identities-repository'

import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaIdentitiesRepository = new PrismaIdentitiesRepository()
  const useCase = new AuthenticateUseCase(prismaIdentitiesRepository)

  return useCase
}
