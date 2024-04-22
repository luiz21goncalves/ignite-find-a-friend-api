import { AppError } from './AppError'

export class InternalServerError extends AppError {
  constructor() {
    super({
      error: 'Internal Server Error',
      message: 'An internal error occurred',
      statusCode: 500,
      type: 'internal_error',
    })
  }
}
