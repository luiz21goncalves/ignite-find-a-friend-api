import { describe, expect, it } from 'vitest'

import { IdentityAlreadyExistsError } from '@/use-cases/errors/identity-already-exists-error'

describe('IdentityAlreadyExistsError', () => {
  it('should be able to create an identity already exists error', () => {
    const identityAlreadyExistsError = new IdentityAlreadyExistsError()

    expect(identityAlreadyExistsError.error).toStrictEqual({
      error: 'Identity already exists',
      message: 'Email already in use',
      statusCode: 422,
      type: 'constraint_error',
    })
  })
})
