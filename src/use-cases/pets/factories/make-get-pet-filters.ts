import { GetPetFilters } from '../get-pet-filters'

export function makeGetPetFilters() {
  const useCase = new GetPetFilters()

  return useCase
}
