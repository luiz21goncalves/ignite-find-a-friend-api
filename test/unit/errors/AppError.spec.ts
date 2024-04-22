import { describe, expect, it } from 'vitest'

import { AppError } from '@/errors/AppError'

describe('AppError', () => {
  it('should be able to create an application error', () => {
    const appError = new AppError({
      error: 'new error',
      message: 'some message',
      statusCode: 500,
      type: 'internal_error',
    })

    expect(appError.error).toStrictEqual({
      error: 'new error',
      message: 'some message',
      statusCode: 500,
      type: 'internal_error',
    })
  })
})
