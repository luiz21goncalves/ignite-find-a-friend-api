import { AppError } from './app-error'

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
