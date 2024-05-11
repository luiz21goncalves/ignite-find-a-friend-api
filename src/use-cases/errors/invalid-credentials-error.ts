import { StatusCodes } from 'http-status-codes'

import { AppError } from '@/errors/app-error'

export class InvalidCredentialsError extends AppError {
  constructor() {
    super({
      error: 'Invalid credentials',
      message: 'Invalid email or password',
      statusCode: StatusCodes.BAD_REQUEST,
      type: 'validation_error',
    })
  }
}
