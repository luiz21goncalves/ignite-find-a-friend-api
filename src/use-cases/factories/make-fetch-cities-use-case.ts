import { FetchHttpProvider } from '@/providers/http-provider/fetch-http-provider'
import { LocalStorageProvider } from '@/providers/storage-provider/local-storage-provider'

import { FetchCitiesUseCase } from '../fetch-cities'

export function makeFetchCitiesUseCase() {
  const fetchHttpProvider = new FetchHttpProvider()
  const localStorageProvider = new LocalStorageProvider()
  const useCase = new FetchCitiesUseCase(
    fetchHttpProvider,
    localStorageProvider,
  )

  return useCase
}
