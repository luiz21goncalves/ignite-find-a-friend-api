import { beforeEach, describe, expect, it } from 'vitest'

import { FetchPetsCharacteristicsUseCase } from '@/use-cases/fetch-pets-characteristics'

let sut: FetchPetsCharacteristicsUseCase

describe('FetchPetsCharacteristicsUseCase', () => {
  beforeEach(() => {
    sut = new FetchPetsCharacteristicsUseCase()
  })

  it('should be able to list pets characteristics', async () => {
    const { age, dependency, energy, kind, size, space } = await sut.execute()

    expect(age).toEqual(['baby', 'adult', 'old'])
    expect(dependency).toEqual(['low', 'medium', 'high'])
    expect(energy).toEqual(['01', '02', '03', '04', '05'])
    expect(kind).toEqual(['cat', 'dog'])
    expect(size).toEqual(['small', 'medium', 'large'])
    expect(space).toEqual(['small', 'medium', 'large'])
  })
})
