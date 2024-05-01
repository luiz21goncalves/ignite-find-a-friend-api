import { AppError } from './app-error'

export class AuthenticationError extends AppError {
  constructor() {
    super({
      error: 'Authentication Required',
      message: 'Send a jwt token or re-authenticate',
      statusCode: 401,
      type: 'validation_error',
    })
  }
}
