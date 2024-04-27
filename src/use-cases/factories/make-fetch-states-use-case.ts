import { FetchHttpProvider } from '@/providers/http-provider/fetch-http-provider'

import { FetchStatesUseCase } from '../fetch-states'

export function makeFetchStatesUseCase() {
  const fetchHttpProvider = new FetchHttpProvider()
  const useCase = new FetchStatesUseCase(fetchHttpProvider)

  return useCase
}
