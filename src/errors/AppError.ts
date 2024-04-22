type ErrorType = 'internal_error' | 'validation_error'

type ErroProps<MessageType> = {
  message: MessageType
  error: string
  statusCode: number
  type: ErrorType
}

export class AppError<MessageType = unknown> {
  private readonly props: ErroProps<MessageType>

  constructor(props: ErroProps<MessageType>) {
    this.props = props
  }

  get error(): ErroProps<MessageType> {
    return {
      error: this.props.error,
      message: this.props.message,
      statusCode: this.props.statusCode,
      type: this.props.type,
    }
  }
}
