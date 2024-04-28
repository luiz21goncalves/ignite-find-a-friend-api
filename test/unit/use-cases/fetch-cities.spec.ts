import { beforeEach, describe, expect, it, vi } from 'vitest'

import { LocalStorageProvider } from '@/providers/storage-provider/local-storage-provider'
import { FetchCitiesUseCase } from '@/use-cases/fetch-cities'

import { FakeHttpProvider } from '../providers/http-provider/fake-http-provider'

let fakeHttpProvider: FakeHttpProvider
let localStorageProvider: LocalStorageProvider
let sut: FetchCitiesUseCase

describe('FetchCitiesUseCase', () => {
  beforeEach(() => {
    fakeHttpProvider = new FakeHttpProvider()
    localStorageProvider = new LocalStorageProvider()
    sut = new FetchCitiesUseCase(fakeHttpProvider, localStorageProvider)
    vi.clearAllMocks()
  })

  it('should be able to list all cities by acronym with json file', async () => {
    vi.spyOn(FakeHttpProvider.prototype, 'get').mockResolvedValueOnce([
      { codigo_ibge: '5300108', nome: 'BRASILIA' },
    ])

    const { cities } = await sut.execute({ acronym: 'df' })

    expect(cities).toStrictEqual([{ id: '5300108', name: 'BRASILIA' }])
  })

  it('should be able to list all cities by acronym without json file', async () => {
    vi.spyOn(LocalStorageProvider.prototype, 'read').mockResolvedValueOnce(null)
    vi.spyOn(FakeHttpProvider.prototype, 'get').mockResolvedValueOnce([
      { codigo_ibge: '5300108', nome: 'BRASILIA' },
    ])
    vi.spyOn(LocalStorageProvider.prototype, 'save').mockImplementationOnce(
      async () => {},
    )

    const { cities } = await sut.execute({ acronym: 'df' })

    expect(cities).toStrictEqual([{ id: '5300108', name: 'BRASILIA' }])
  })
})
