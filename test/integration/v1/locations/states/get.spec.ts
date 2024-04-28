import fs from 'node:fs/promises'
import path from 'node:path'

import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { TMP_DIR } from '@/constants'
import { makeFetchStatesUseCase } from '@/use-cases/factories/make-fetch-states-use-case'

const ROUTE = '/v1/locations/states'

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

  it('should be able to list all states withtout json file', async () => {
    const response = await supertest(app.server).get(ROUTE)

    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({
      states: [
        { acronym: 'RO', id: 11, name: 'Rondônia' },
        { acronym: 'AC', id: 12, name: 'Acre' },
        { acronym: 'AM', id: 13, name: 'Amazonas' },
        { acronym: 'RR', id: 14, name: 'Roraima' },
        { acronym: 'PA', id: 15, name: 'Pará' },
        { acronym: 'AP', id: 16, name: 'Amapá' },
        { acronym: 'TO', id: 17, name: 'Tocantins' },
        { acronym: 'MA', id: 21, name: 'Maranhão' },
        { acronym: 'PI', id: 22, name: 'Piauí' },
        { acronym: 'CE', id: 23, name: 'Ceará' },
        { acronym: 'RN', id: 24, name: 'Rio Grande do Norte' },
        { acronym: 'PB', id: 25, name: 'Paraíba' },
        { acronym: 'PE', id: 26, name: 'Pernambuco' },
        { acronym: 'AL', id: 27, name: 'Alagoas' },
        { acronym: 'SE', id: 28, name: 'Sergipe' },
        { acronym: 'BA', id: 29, name: 'Bahia' },
        { acronym: 'MG', id: 31, name: 'Minas Gerais' },
        { acronym: 'ES', id: 32, name: 'Espírito Santo' },
        { acronym: 'RJ', id: 33, name: 'Rio de Janeiro' },
        { acronym: 'SP', id: 35, name: 'São Paulo' },
        { acronym: 'PR', id: 41, name: 'Paraná' },
        { acronym: 'SC', id: 42, name: 'Santa Catarina' },
        { acronym: 'RS', id: 43, name: 'Rio Grande do Sul' },
        { acronym: 'MS', id: 50, name: 'Mato Grosso do Sul' },
        { acronym: 'MT', id: 51, name: 'Mato Grosso' },
        { acronym: 'GO', id: 52, name: 'Goiás' },
        { acronym: 'DF', id: 53, name: 'Distrito Federal' },
      ],
    })
  })

  it('should be able to list all states with json file', async () => {
    const fetchStatusUseCase = makeFetchStatesUseCase()
    await fetchStatusUseCase.execute()

    const response = await supertest(app.server).get(ROUTE)

    expect(response.status).toEqual(200)
    expect(response.body).toStrictEqual({
      states: [
        { acronym: 'RO', id: 11, name: 'Rondônia' },
        { acronym: 'AC', id: 12, name: 'Acre' },
        { acronym: 'AM', id: 13, name: 'Amazonas' },
        { acronym: 'RR', id: 14, name: 'Roraima' },
        { acronym: 'PA', id: 15, name: 'Pará' },
        { acronym: 'AP', id: 16, name: 'Amapá' },
        { acronym: 'TO', id: 17, name: 'Tocantins' },
        { acronym: 'MA', id: 21, name: 'Maranhão' },
        { acronym: 'PI', id: 22, name: 'Piauí' },
        { acronym: 'CE', id: 23, name: 'Ceará' },
        { acronym: 'RN', id: 24, name: 'Rio Grande do Norte' },
        { acronym: 'PB', id: 25, name: 'Paraíba' },
        { acronym: 'PE', id: 26, name: 'Pernambuco' },
        { acronym: 'AL', id: 27, name: 'Alagoas' },
        { acronym: 'SE', id: 28, name: 'Sergipe' },
        { acronym: 'BA', id: 29, name: 'Bahia' },
        { acronym: 'MG', id: 31, name: 'Minas Gerais' },
        { acronym: 'ES', id: 32, name: 'Espírito Santo' },
        { acronym: 'RJ', id: 33, name: 'Rio de Janeiro' },
        { acronym: 'SP', id: 35, name: 'São Paulo' },
        { acronym: 'PR', id: 41, name: 'Paraná' },
        { acronym: 'SC', id: 42, name: 'Santa Catarina' },
        { acronym: 'RS', id: 43, name: 'Rio Grande do Sul' },
        { acronym: 'MS', id: 50, name: 'Mato Grosso do Sul' },
        { acronym: 'MT', id: 51, name: 'Mato Grosso' },
        { acronym: 'GO', id: 52, name: 'Goiás' },
        { acronym: 'DF', id: 53, name: 'Distrito Federal' },
      ],
    })
  })
})
