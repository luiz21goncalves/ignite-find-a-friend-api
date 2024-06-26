import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'

import { CreateIdentityUseCase } from '@/use-cases/create-identity'
import { IdentityAlreadyExistsError } from '@/use-cases/errors/identity-already-exists-error'

import { FakeHashProvider } from '../providers/hash-provider/fake-hash-provider'
import { InMemoryIdentitiesRepository } from '../repositories/in-memory-identities-repository'

let sut: CreateIdentityUseCase
let inMemoryIdentitiesRepository: InMemoryIdentitiesRepository
let fakeHashProvider: FakeHashProvider

describe('CreateIdentityUseCase', () => {
  beforeEach(() => {
    inMemoryIdentitiesRepository = new InMemoryIdentitiesRepository()
    fakeHashProvider = new FakeHashProvider()
    sut = new CreateIdentityUseCase(
      inMemoryIdentitiesRepository,
      fakeHashProvider,
    )
  })

  it('should be able to create an identity', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { identity } = await sut.execute({ email, password })

    expect(identity).toStrictEqual({
      created_at: expect.any(Date),
      email,
      id: expect.any(String),
      updated_at: expect.any(Date),
    })
  })

  it('should not be able to create an identity with a duplicate email', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    await inMemoryIdentitiesRepository.create({
      email,
      password_hash: faker.internet.password(),
    })

    await expect(sut.execute({ email, password })).rejects.toBeInstanceOf(
      IdentityAlreadyExistsError,
    )
  })
})
