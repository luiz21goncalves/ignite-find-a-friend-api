import { AppError } from '@/errors/app-error'

export class InvalidCredentialsError extends AppError {
  constructor() {
    super({
      error: 'Invalid credentials',
      message: 'Invalid email or password',
      statusCode: 400,
      type: 'validation_error',
    })
  }
}
