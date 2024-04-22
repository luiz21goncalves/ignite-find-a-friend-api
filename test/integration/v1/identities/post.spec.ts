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

    expect(response.status).toEqual(422)
    expect(response.body).toStrictEqual({
      error: 'Identity already exists',
      message: 'Email already in use',
      statusCode: 422,
      type: 'constraint_error',
    })
  })

  it('should not be able to create an identity without email', async () => {
    const password = faker.internet.password()

    const response = await supertest(app.server).post(ROUTE).send({ password })

    expect(response.status).toEqual(400)
    expect(response.body).toStrictEqual({
      error: 'Validation failed',
      message: { _errors: [], email: { _errors: ['Required'] } },
      statusCode: 400,
      type: 'validation_error',
    })
  })

  it('should not be able to create an identity without password', async () => {
    const email = faker.internet.email()

    const response = await supertest(app.server).post(ROUTE).send({ email })

    expect(response.status).toEqual(400)
    expect(response.body).toStrictEqual({
      error: 'Validation failed',
      message: { _errors: [], password: { _errors: ['Required'] } },
      statusCode: 400,
      type: 'validation_error',
    })
  })

  it('should not be able to create an identity without body', async () => {
    const response = await supertest(app.server).post(ROUTE).send({})

    expect(response.status).toEqual(400)
    expect(response.body).toStrictEqual({
      error: 'Validation failed',
      message: {
        _errors: [],
        email: { _errors: ['Required'] },
        password: { _errors: ['Required'] },
      },
      statusCode: 400,
      type: 'validation_error',
    })
  })
})
