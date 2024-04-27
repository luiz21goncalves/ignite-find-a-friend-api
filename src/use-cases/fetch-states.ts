import { ENV } from '@/env'
import { HttpProvider } from '@/providers/http-provider'

type State = {
  id: number
  acronym: string
  name: string
}

type StatesResponse = Array<{
  id: number
  sigla: string
  nome: string
}>

type FetchStatesUseCaseResponse = {
  states: State[]
}

export class FetchStatesUseCase {
  constructor(private readonly httpProvider: HttpProvider) {}

  async execute(): Promise<FetchStatesUseCaseResponse> {
    const url = new URL('/api/ibge/uf/v1', ENV.BRASIL_API_BASE_URL).toString()

    const body = await this.httpProvider.get<StatesResponse>(url)

    const states = body.map<State>((state) => {
      return { acronym: state.sigla, id: state.id, name: state.nome }
    })

    return { states }
  }
}
