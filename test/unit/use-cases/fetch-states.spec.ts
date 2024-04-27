import { describe } from 'node:test'

import { beforeEach, expect, it, vi } from 'vitest'

import { FetchStatesUseCase } from '@/use-cases/fetch-states'

import { FakeHttpProvider } from '../providers/http-provider/fake-http-provider'

let fakeHttpProvider: FakeHttpProvider
let sut: FetchStatesUseCase

describe('FetchStatesUseCase', () => {
  beforeEach(() => {
    fakeHttpProvider = new FakeHttpProvider()
    sut = new FetchStatesUseCase(fakeHttpProvider)
    vi.clearAllMocks()
  })

  it('should be able to list all states', async () => {
    vi.spyOn(FakeHttpProvider.prototype, 'get').mockResolvedValueOnce([
      {
        id: 31,
        nome: 'Minas Gerais',
        regiao: {
          id: 3,
          nome: 'Sudeste',
          sigla: 'SE',
        },
        sigla: 'MG',
      },
    ])

    const { states } = await sut.execute()

    expect(states).toStrictEqual([
      { acronym: 'MG', id: 31, name: 'Minas Gerais' },
    ])
  })
})
