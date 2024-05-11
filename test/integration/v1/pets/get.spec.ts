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
    const response = await supertest(app.server)
      .get(ROUTE)
      .query({ zip_code: '00000000' })

    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({})
  })
})
