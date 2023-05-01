import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { app } from '../../../app'

describe('Pet Filters (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await app.close()
  })

  it('should be able to list pet filters', async () => {
    const response = await supertest(app.server).get('/pets/filters')

    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body).toStrictEqual({
      filters: {
        age: ['baby', 'adult', 'elderly'],
        dependency: ['low', 'medium', 'high'],
        energy: [1, 2, 3, 4, 5],
        size: ['tiny', 'small', 'medium', 'big', 'bigger'],
      },
    })
  })
})
