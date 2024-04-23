import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { makeCreateIdentityUseCase } from '@/use-cases/factories/make-create-identity-use-case'

const ROUTE = '/v1/sessions'

describe(`POST ${ROUTE}`, () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a session', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const createIdentityUseCase = makeCreateIdentityUseCase()

    await createIdentityUseCase.execute({
      email,
      password,
    })

    const response = await supertest(app.server)
      .post(ROUTE)
      .send({ email, password })

    expect(response.status).toEqual(201)
    expect(response.body).toStrictEqual({
      token: expect.any(String),
    })
  })

  it('should not be able to create a session with not found identity', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const response = await supertest(app.server)
      .post(ROUTE)
      .send({ email, password })

    expect(response.status).toEqual(400)
    expect(response.body).toStrictEqual({
      error: 'Invalid credentials',
      message: 'Invalid email or password',
      statusCode: 400,
      type: 'validation_error',
    })
  })

  it('should not be able to create a session when password does not match', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const createIdentityUseCase = makeCreateIdentityUseCase()

    await createIdentityUseCase.execute({
      email,
      password,
    })

    const response = await supertest(app.server)
      .post(ROUTE)
      .send({ email, password: 'wrong-password' })

    expect(response.status).toEqual(400)
    expect(response.body).toStrictEqual({
      error: 'Invalid credentials',
      message: 'Invalid email or password',
      statusCode: 400,
      type: 'validation_error',
    })
  })

  it('should not be able to create a session without email', async () => {
    const password = faker.internet.password()

    const response = await supertest(app.server).post(ROUTE).send({ password })

    expect(response.status).toEqual(400)
    expect(response.body).toStrictEqual({
      error: 'Validation failed',
      message: {
        _errors: [],
        email: {
          _errors: ['Required'],
        },
      },
      statusCode: 400,
      type: 'validation_error',
    })
  })

  it('should not be able to create a session without password', async () => {
    const email = faker.internet.email()

    const response = await supertest(app.server).post(ROUTE).send({ email })

    expect(response.status).toEqual(400)
    expect(response.body).toStrictEqual({
      error: 'Validation failed',
      message: {
        _errors: [],
        password: {
          _errors: ['Required'],
        },
      },
      statusCode: 400,
      type: 'validation_error',
    })
  })

  it('should not be able to create a session with empty request body', async () => {
    const response = await supertest(app.server).post(ROUTE).send({})

    expect(response.status).toEqual(400)
    expect(response.body).toStrictEqual({
      error: 'Validation failed',
      message: {
        _errors: [],
        email: {
          _errors: ['Required'],
        },
        password: {
          _errors: ['Required'],
        },
      },
      statusCode: 400,
      type: 'validation_error',
    })
  })
})
