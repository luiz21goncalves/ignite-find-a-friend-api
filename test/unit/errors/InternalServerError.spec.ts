import { describe, expect, it } from 'vitest'

import { InternalServerError } from '@/errors/InternalServerError'

describe('InternalServerError', () => {
  it('should be able to create an InternalServerError', () => {
    const internalServerError = new InternalServerError()

    expect(internalServerError.error).toStrictEqual({
      error: 'Internal Server Error',
      message: 'An internal error occurred',
      statusCode: 500,
      type: 'internal_error',
    })
  })
})
