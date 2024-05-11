import { StatusCodes } from 'http-status-codes'

import { AppError } from './app-error'

export class InternalServerError extends AppError {
  constructor() {
    super({
      error: 'Internal Server Error',
      message: 'An internal error occurred',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      type: 'internal_error',
    })
  }
}
