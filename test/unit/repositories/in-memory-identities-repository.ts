import { randomUUID } from 'node:crypto'

import {
  CreateIdentityData,
  IdentitiesRepository,
  Identity,
} from '@/repositories/identities-repository'

export class InMemoryIdentitiesRepository implements IdentitiesRepository {
  private readonly data: Identity[]

  constructor() {
    this.data = []
  }

  async create({
    email,
    password_hash,
  }: CreateIdentityData): Promise<Identity> {
    const identity = {
      created_at: new Date(),
      email,
      id: randomUUID(),
      password_hash,
      updated_at: new Date(),
    } satisfies Identity

    this.data.push(identity)

    return identity
  }

  async findByEmail(email: string): Promise<Identity | null> {
    const identity = this.data.find((item) => item.email === email) ?? null

    return identity
  }

  async findById(id: string): Promise<Identity | null> {
    const identity = this.data.find((item) => item.id === id) ?? null

    return identity
  }
}
