import { beforeEach, describe, expect, it, vi } from 'vitest'

import { LocalStorageProvider } from '@/providers/storage-provider/local-storage-provider'
import { FetchStatesUseCase } from '@/use-cases/fetch-states'

import { FakeHttpProvider } from '../providers/http-provider/fake-http-provider'

let fakeHttpProvider: FakeHttpProvider
let localStorageProvider: LocalStorageProvider
let sut: FetchStatesUseCase

describe('FetchStatesUseCase', () => {
  beforeEach(() => {
    fakeHttpProvider = new FakeHttpProvider()
    localStorageProvider = new LocalStorageProvider()
    sut = new FetchStatesUseCase(fakeHttpProvider, localStorageProvider)
    vi.clearAllMocks()
  })

  it('should be able to list all states with file', async () => {
    vi.spyOn(LocalStorageProvider.prototype, 'read').mockResolvedValueOnce(
      JSON.stringify([{ acronym: 'MG', id: 31, name: 'Minas Gerais' }]),
    )

    const { states } = await sut.execute()

    expect(states).toStrictEqual([
      { acronym: 'MG', id: 31, name: 'Minas Gerais' },
    ])
  })

  it('should be able to list all states without file', async () => {
    vi.spyOn(LocalStorageProvider.prototype, 'read').mockResolvedValueOnce(null)
    vi.spyOn(FakeHttpProvider.prototype, 'get').mockResolvedValueOnce([
      {
        id: 31,
        nome: 'Minas Gerais',
        regiao: { id: 3, nome: 'Sudeste', sigla: 'SE' },
        sigla: 'MG',
      },
    ])
    vi.spyOn(LocalStorageProvider.prototype, 'save').mockImplementationOnce(
      async () => {},
    )

    const { states } = await sut.execute()

    expect(states).toStrictEqual([
      { acronym: 'MG', id: 31, name: 'Minas Gerais' },
    ])
  })
})
