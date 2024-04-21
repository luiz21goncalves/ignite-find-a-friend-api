import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'

const ROUTE = '/v1/identities'

describe(`POST ${ROUTE}`, () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an identity', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const response = await supertest(app.server).post(ROUTE).send({
      email,
      password,
    })

    expect(response.status).toEqual(201)
    expect(response.body).toStrictEqual({
      identity: {
        created_at: expect.any(String),
        email,
        id: expect.any(String),
        updated_at: expect.any(String),
      },
    })
  })

  it('should not be able to create an identity with duplicated email', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    await prisma.identity.create({
      data: {
        email,
        password_hash: password,
      },
    })

    const response = await supertest(app.server)
      .post(ROUTE)
      .send({ email, password })

    expect(response.status).toEqual(500)
    expect(response.body).toStrictEqual({
      error: 'Internal Server Error',
      message: 'Identity already exits',
      statusCode: 500,
    })
  })
})
