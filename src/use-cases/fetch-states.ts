import { ENV } from '@/env'
import { HttpProvider } from '@/providers/http-provider'
import { StorateProvider } from '@/providers/storage-provider'

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

const STATES_FOLDER = 'locations'
const STATES_FILENAME = 'states.json'

export class FetchStatesUseCase {
  constructor(
    private readonly httpProvider: HttpProvider,
    private readonly storageProvider: StorateProvider,
  ) {}

  async execute(): Promise<FetchStatesUseCaseResponse> {
    const storageStates = await this.storageProvider.read({
      filename: STATES_FILENAME,
      folder: STATES_FOLDER,
    })

    if (storageStates) {
      const states = JSON.parse(storageStates) as State[]

      return {
        states,
      }
    }

    const url = new URL('/api/ibge/uf/v1', ENV.BRASIL_API_BASE_URL).toString()

    const body = await this.httpProvider.get<StatesResponse>(url)

    const states = body.map<State>((state) => {
      return { acronym: state.sigla, id: state.id, name: state.nome }
    })

    await this.storageProvider.save({
      content: Buffer.from(JSON.stringify(states)),
      filename: STATES_FILENAME,
      folder: STATES_FOLDER,
    })

    return { states }
  }
}
