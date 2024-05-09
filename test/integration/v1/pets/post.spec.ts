import { CreateIdentityAndOrganization } from '@test/utils/create-identity-and-organization'
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
    const { token } = await CreateIdentityAndOrganization()

    const response = await supertest(app.server)
      .post(ROUTE)
      .auth(token, { type: 'bearer' })
      .send({})

    expect(response.status).toEqual(201)
    expect(response.body).toStrictEqual({})
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
})
