import { FetchHttpProvider } from '@/providers/http-provider/fetch-http-provider'
import { LocalStorageProvider } from '@/providers/storage-provider/local-storage-provider'

import { FetchStatesUseCase } from '../fetch-states'

export function makeFetchStatesUseCase() {
  const fetchHttpProvider = new FetchHttpProvider()
  const localStorageProvider = new LocalStorageProvider()
  const useCase = new FetchStatesUseCase(
    fetchHttpProvider,
    localStorageProvider,
  )

  return useCase
}
