import { faker } from '@faker-js/faker'
import { createIdentity } from '@test/utils/create-identity'
import { createIdentityAndOrganization } from '@test/utils/create-identity-and-organization'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

const ROUTE = '/v1/pets'

describe(`POST ${ROUTE}`, () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token, organization } = await createIdentityAndOrganization()

    const about = faker.lorem.sentence()
    const age = faker.lorem.word()
    const dependency = faker.lorem.word()
    const name = faker.lorem.word()
    const size = faker.lorem.word()
    const energy = faker.lorem.word()
    const kind = faker.lorem.word()
    const space = faker.lorem.word()

    const response = await supertest(app.server)
      .post(ROUTE)
      .auth(token, { type: 'bearer' })
      .send({
        about,
        age,
        dependency,
        energy,
        kind,
        name,
        size,
        space,
      })

    expect(response.status).toEqual(201)
    expect(response.body).toStrictEqual({
      pet: {
        about,
        age,
        created_at: expect.any(String),
        dependency,
        energy,
        id: expect.any(String),
        kind,
        name,
        organization_id: organization.id,
        size,
        space,
        updated_at: expect.any(String),
      },
    })
  })

  it('should not be able to create a pet without the session', async () => {
    const response = await supertest(app.server).post(ROUTE).send({})

    expect(response.status).toEqual(401)
    expect(response.body).toStrictEqual({
      error: 'Authentication Required',
      message: 'Send a jwt token or re-authenticate',
      statusCode: 401,
      type: 'validation_error',
    })
  })

  it('should not be able to create a pet with invalid params', async () => {
    const { token } = await createIdentityAndOrganization()

    const response = await supertest(app.server)
      .post(ROUTE)
      .auth(token, { type: 'bearer' })
      .send({})

    expect(response.status).toEqual(400)
    expect(response.body).toStrictEqual({
      error: 'Validation failed',
      message: {
        _errors: [],
        about: { _errors: ['Required'] },
        age: { _errors: ['Required'] },
        dependency: { _errors: ['Required'] },
        energy: { _errors: ['Required'] },
        kind: { _errors: ['Required'] },
        name: { _errors: ['Required'] },
        size: { _errors: ['Required'] },
        space: { _errors: ['Required'] },
      },
      statusCode: 400,
      type: 'validation_error',
    })
  })

  it('should not be able to create a pet without organization', async () => {
    const { token } = await createIdentity()

    const about = faker.lorem.sentence()
    const age = faker.lorem.word()
    const dependency = faker.lorem.word()
    const name = faker.lorem.word()
    const size = faker.lorem.word()
    const energy = faker.lorem.word()
    const kind = faker.lorem.word()
    const space = faker.lorem.word()

    const response = await supertest(app.server)
      .post(ROUTE)
      .auth(token, { type: 'bearer' })
      .send({
        about,
        age,
        dependency,
        energy,
        kind,
        name,
        size,
        space,
      })

    expect(response.status).toEqual(404)
    expect(response.body).toStrictEqual({
      error: 'Organization not found',
      message: 'Could not be found the organization',
      statusCode: 404,
      type: 'constraint_error',
    })
  })
})
