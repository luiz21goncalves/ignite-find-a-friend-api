import { prisma } from '@/lib/prisma'

import {
  CreateIdentityData,
  IdentitiesRepository,
  Identity,
} from '../identities-repository'

export class PrismaIdentitiesRepository implements IdentitiesRepository {
  async create({
    email,
    password_hash,
  }: CreateIdentityData): Promise<Identity> {
    const identity = await prisma.identity.create({
      data: { email, password_hash },
    })

    return identity
  }

  async findByEmail(email: string): Promise<Identity | null> {
    const identity = await prisma.identity.findUnique({ where: { email } })

    return identity
  }

  async findById(id: string): Promise<Identity | null> {
    const identity = await prisma.identity.findUnique({ where: { id } })

    return identity
  }
}
