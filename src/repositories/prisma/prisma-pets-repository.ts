import { prisma } from '@/lib/prisma'

import {
  CreatePetData,
  FetchPetsFilters,
  Pet,
  PetsRepository,
} from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create({
    about,
    age,
    dependency,
    organization_id,
    kind,
    name,
    size,
    space,
    energy,
  }: CreatePetData): Promise<Pet> {
    const pet = await prisma.pet.create({
      data: {
        about,
        age,
        dependency,
        energy,
        kind,
        name,
        organization_id,
        size,
        space,
      },
    })

    return { ...pet, energy: pet.energy ?? '' }
  }

  async fetchPets({
    zip_code,
    age,
    dependency,
    energy,
    kind,
    size,
    space,
  }: FetchPetsFilters): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age,
        dependency,
        energy,
        kind,
        organization: { zip_code },
        size,
        space,
      },
    })

    return pets.map((pet) => {
      return { ...pet, energy: pet.energy ?? '' }
    })
  }
}
