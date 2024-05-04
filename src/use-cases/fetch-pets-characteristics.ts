type FetchPetsCharacteristicsUseCaseResponse = {
  kind: string[]
  age: string[]
  size: string[]
  energy: string[]
  dependency: string[]
  space: string[]
}

export class FetchPetsCharacteristicsUseCase {
  constructor() {}

  async execute(): Promise<FetchPetsCharacteristicsUseCaseResponse> {
    return {
      age: ['baby', 'adult', 'old'],
      dependency: ['low', 'medium', 'high'],
      energy: ['01', '02', '03', '04', '05'],
      kind: ['cat', 'dog'],
      size: ['small', 'medium', 'large'],
      space: ['small', 'medium', 'large'],
    }
  }
}
