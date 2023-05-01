import { describe, beforeEach, it, expect } from 'vitest'

import { GetPetFilters } from './get-pet-filters'

let sut: GetPetFilters

describe('Get a pet filters', () => {
  beforeEach(() => {
    sut = new GetPetFilters()
  })

  it('should be able to list all pet filters', async () => {
    const filters = await sut.execute()

    expect(filters).toStrictEqual({
      age: ['baby', 'adult', 'elderly'],
      dependency: ['low', 'medium', 'high'],
      energy: [1, 2, 3, 4, 5],
      size: ['tiny', 'small', 'medium', 'big', 'bigger'],
    })
  })
})
