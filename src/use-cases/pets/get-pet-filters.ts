import { PET } from '@/constants/pet'

type GetPetFiltersResponse = {
  age: string[]
  energy: number[]
  size: string[]
  dependency: string[]
}

export class GetPetFilters {
  constructor() {}

  public async execute(): Promise<GetPetFiltersResponse> {
    return {
      age: Object.values(PET.AGE),
      dependency: Object.values(PET.DEPENDENCY),
      energy: Object.values(PET.ENERGY),
      size: Object.values(PET.SIZE),
    }
  }
}
