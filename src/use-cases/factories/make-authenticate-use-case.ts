import { Argon2HashProvider } from '@/providers/hash-provider/argon2-hash-provider'
import { PrismaIdentitiesRepository } from '@/repositories/prisma/prisma-identities-repository'

import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const prismaIdentitiesRepository = new PrismaIdentitiesRepository()
  const argon2HashProvider = new Argon2HashProvider()
  const useCase = new AuthenticateUseCase(
    prismaIdentitiesRepository,
    argon2HashProvider,
  )

  return useCase
}
