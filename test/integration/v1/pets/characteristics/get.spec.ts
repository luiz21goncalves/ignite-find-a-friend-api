import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

const ROUTE = '/v1/pets/characteristics'

describe(`GET ${ROUTE}`, () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pets characteristics', async () => {
    const response = await supertest(app.server).get(ROUTE)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual({
      age: ['baby', 'adult', 'old'],
      dependency: ['low', 'medium', 'high'],
      energy: ['01', '02', '03', '04', '05'],
      kind: ['cat', 'dog'],
      size: ['small', 'medium', 'large'],
      space: ['small', 'medium', 'large'],
    })
  })
})
