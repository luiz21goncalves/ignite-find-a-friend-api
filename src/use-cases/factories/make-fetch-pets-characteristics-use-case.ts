import { FetchPetsCharacteristicsUseCase } from '../fetch-pets-characteristics'

export function makeFetchPetsCharacteristicsUseCase() {
  const useCase = new FetchPetsCharacteristicsUseCase()

  return useCase
}
