import { faker } from '@faker-js/faker'
import { createIdentity } from '@test/utils/create-identity'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

const ROUTE = '/v1/organizations'

describe(`POST ${ROUTE}`, () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new organization', async () => {
    const { identity, token } = await createIdentity()

    const name = faker.company.name()
    const address = faker.location.streetAddress({ useFullAddress: true })
    const whatsapp = faker.phone.number()
    const zip_code = faker.location.zipCode()

    const response = await supertest(app.server)
      .post(ROUTE)
      .auth(token, { type: 'bearer' })
      .send({
        address,
        name,
        whatsapp,
        zip_code,
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toStrictEqual({
      organization: {
        address,
        created_at: expect.any(String),
        id: expect.any(String),
        identity_id: identity.id,
        name,
        updated_at: expect.any(String),
        whatsapp,
        zip_code,
      },
    })
  })

  it('should not be able to create a new organization without jwt', async () => {
    const name = faker.company.name()
    const address = faker.location.streetAddress({ useFullAddress: true })
    const whatsapp = faker.phone.number()
    const zip_code = faker.location.zipCode()

    const response = await supertest(app.server).post(ROUTE).send({
      address,
      name,
      whatsapp,
      zip_code,
    })

    expect(response.statusCode).toEqual(401)
    expect(response.body).toStrictEqual({
      error: 'Authentication Required',
      message: 'Send a jwt token or re-authenticate',
      statusCode: 401,
      type: 'validation_error',
    })
  })

  it('should not be able to create a new organization with invalid jwt', async () => {
    const name = faker.company.name()
    const address = faker.location.streetAddress({ useFullAddress: true })
    const whatsapp = faker.phone.number()
    const zip_code = faker.location.zipCode()

    const response = await supertest(app.server)
      .post(ROUTE)
      .auth(faker.string.alphanumeric(10), { type: 'bearer' })
      .send({
        address,
        name,
        whatsapp,
        zip_code,
      })

    expect(response.statusCode).toEqual(401)
    expect(response.body).toStrictEqual({
      error: 'Authentication Required',
      message: 'Send a jwt token or re-authenticate',
      statusCode: 401,
      type: 'validation_error',
    })
  })
})
