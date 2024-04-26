import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

const ROUTE = '/v1/locations/states'

describe(`GET ${ROUTE}`, () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should abe able to list all states', async () => {
    const response = await supertest(app.server).get(ROUTE)

    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({
      states: [],
    })
  })
})
