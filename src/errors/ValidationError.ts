import { AppError } from './AppError'

export class ValidationError extends AppError {
  constructor(message: unknown) {
    super({
      error: 'Validation failed',
      message,
      statusCode: 400,
      type: 'validation_error',
    })
  }
}
