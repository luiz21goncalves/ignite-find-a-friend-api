import { Pet, PetsRepository } from '@/repositories/pets-repository'

type FetchPetsUseCaseRequest = {
  age?: string
  dependency?: string
  energy?: string
  kind?: string
  size?: string
  space?: string
  zip_code: string
}

type FetchPetsUseCaseResponse = {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    zip_code,
    age,
    dependency,
    energy,
    kind,
    size,
    space,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.fetchPets({
      age,
      dependency,
      energy,
      kind,
      size,
      space,
      zip_code,
    })

    return { pets }
  }
}
