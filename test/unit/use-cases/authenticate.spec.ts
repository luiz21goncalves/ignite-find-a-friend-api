import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'

import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { CreateIdentityUseCase } from '@/use-cases/create-identity'
import { InvalidCredentialsError } from '@/use-cases/errors/InvalidCredentialsError'

import { InMemoryIdentitiesRepository } from '../repositories/InMemoryIdentitiesRepository'

let sut: AuthenticateUseCase
let inMemoryIdentitiesRepository: InMemoryIdentitiesRepository
let createIdentityUseCase: CreateIdentityUseCase

describe('AuthenticateUseCase', () => {
  beforeEach(() => {
    inMemoryIdentitiesRepository = new InMemoryIdentitiesRepository()
    sut = new AuthenticateUseCase(inMemoryIdentitiesRepository)
    createIdentityUseCase = new CreateIdentityUseCase(
      inMemoryIdentitiesRepository,
    )
  })

  it('should be able to return the identity', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { identity: createdIdentity } = await createIdentityUseCase.execute({
      email,
      password,
    })

    const { identity } = await sut.execute({ email, password })

    expect(identity).toStrictEqual(createdIdentity)
  })

  it('should not be able to return a non-existing identity', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    await expect(sut.execute({ email, password })).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })

  it('should not be able to return identity with wrong password', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    await createIdentityUseCase.execute({
      email,
      password: 'wrong-password',
    })

    await expect(sut.execute({ email, password })).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })
})
