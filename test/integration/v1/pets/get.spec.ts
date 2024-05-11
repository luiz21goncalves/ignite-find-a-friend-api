import { faker } from '@faker-js/faker'
import { createPet } from '@test/utils/create-pet'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

const ROUTE = '/v1/pets'

describe(`GET ${ROUTE}`, () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const zip_code = faker.location.zipCode()

    await Promise.all([
      createPet({ zip_code }),
      createPet({ zip_code }),
      createPet({ zip_code }),
    ])

    const response = await supertest(app.server).get(ROUTE).query({ zip_code })

    expect(response.status).toEqual(200)
    expect(response.body.pets).toHaveLength(3)
    expect(response.body.pets[0]).toStrictEqual({
      about: expect.any(String),
      age: expect.any(String),
      created_at: expect.any(String),
      dependency: expect.any(String),
      energy: expect.any(String),
      id: expect.any(String),
      kind: expect.any(String),
      name: expect.any(String),
      organization_id: expect.any(String),
      size: expect.any(String),
      space: expect.any(String),
      updated_at: expect.any(String),
    })
  })
})
