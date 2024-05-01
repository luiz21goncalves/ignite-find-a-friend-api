import { describe, expect, it } from 'vitest'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

describe('InvalidCredentialsError', () => {
  it('should be able to create an invalid credentials error', () => {
    const invalidCredentialsError = new InvalidCredentialsError()

    expect(invalidCredentialsError.error).toStrictEqual({
      error: 'Invalid credentials',
      message: 'Invalid email or password',
      statusCode: 400,
      type: 'validation_error',
    })
  })
})
