import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

const ROUTE = '/v1/not-found'

describe(`GET ${ROUTE}`, () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to return a 404 response', async () => {
    const response = await supertest(app.server).get(ROUTE)

    expect(response.status).toEqual(404)
    expect(response.body).toStrictEqual({
      error: 'Not Found',
      message: 'Route GET:/v1/not-found not found',
      statusCode: 404,
    })
  })
})
