import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'

import { CreateOrganizationUseCase } from '@/use-cases/create-organization'

import { InMemoryIdentitiesRepository } from '../repositories/in-memory-identities-repository'
import { InMemoryOrganizationsRepositories } from '../repositories/in-memory-organizations-repository'

let sut: CreateOrganizationUseCase
let inMemoryIdentitiesRepository: InMemoryIdentitiesRepository
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepositories

describe('CreateOrganizationUseCase', () => {
  beforeEach(() => {
    inMemoryIdentitiesRepository = new InMemoryIdentitiesRepository()
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepositories()
    sut = new CreateOrganizationUseCase(
      inMemoryIdentitiesRepository,
      inMemoryOrganizationsRepository,
    )
  })

  it('should be able to create a new organization', async () => {
    const identity = await inMemoryIdentitiesRepository.create({
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
    })

    const address = faker.location.streetAddress({ useFullAddress: true })
    const name = faker.company.name()
    const whatsapp = faker.phone.number()
    const zip_code = faker.location.zipCode()

    const { organization } = await sut.execute({
      address,
      identity_id: identity.id,
      name,
      whatsapp,
      zip_code,
    })

    expect(organization).toStrictEqual({
      address,
      created_at: expect.any(Date),
      id: expect.any(String),
      identity_id: identity.id,
      name,
      updated_at: expect.any(Date),
      whatsapp,
      zip_code,
    })
  })
})
