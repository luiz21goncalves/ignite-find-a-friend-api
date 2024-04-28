import { Argon2HashProvider } from '@/providers/hash-provider/argon2-hash-provider'
import { PrismaIdentitiesRepository } from '@/repositories/prisma/prisma-identities-repository'

import { CreateIdentityUseCase } from '../create-identity'

export function makeCreateIdentityUseCase() {
  const prismaIdentitiesRepository = new PrismaIdentitiesRepository()
  const argon2HashProvider = new Argon2HashProvider()
  const useCase = new CreateIdentityUseCase(
    prismaIdentitiesRepository,
    argon2HashProvider,
  )

  return useCase
}
