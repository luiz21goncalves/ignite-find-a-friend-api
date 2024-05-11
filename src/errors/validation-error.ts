import { StatusCodes } from 'http-status-codes'

import { AppError } from './app-error'

export class ValidationError extends AppError {
  constructor(message: unknown) {
    super({
      error: 'Validation failed',
      message,
      statusCode: StatusCodes.BAD_REQUEST,
      type: 'validation_error',
    })
  }
}
