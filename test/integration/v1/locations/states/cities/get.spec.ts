import fs from 'node:fs/promises'
import path from 'node:path'

import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { TMP_DIR } from '@/constants'
import { makeFetchCitiesUseCase } from '@/use-cases/factories/make-fetch-cities-use-case'

const ROUTE = `/v1/locations/states/df/cities`

describe(`GET ${ROUTE}`, () => {
  beforeAll(async () => {
    await fs.rm(path.join(TMP_DIR, 'locations'), {
      force: true,
      recursive: true,
    })
    await app.ready()
  })

  afterAll(async () => {
    await fs.rm(path.join(TMP_DIR, 'locations'), {
      force: true,
      recursive: true,
    })
    await app.close()
  })

  it('should be able to list all cities of state without json file', async () => {
    const response = await supertest(app.server).get(ROUTE)

    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({
      cities: [{ id: '5300108', name: 'BRASILIA' }],
    })
  })

  it('should be able to list all cities of state with json file', async () => {
    const fetchCitiesUseCase = makeFetchCitiesUseCase()
    await fetchCitiesUseCase.execute({ acronym: 'df' })

    const response = await supertest(app.server).get(ROUTE)

    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({
      cities: [{ id: '5300108', name: 'BRASILIA' }],
    })
  })
})
