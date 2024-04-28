import { ENV } from '@/env'
import { HttpProvider } from '@/providers/http-provider'
import { StorateProvider } from '@/providers/storage-provider'

type FetchCitiesUseCaseRequest = {
  acronym: string
}

type City = {
  name: string
  id: string
}

type FetchCitiesUseCaseResponse = {
  cities: City[]
}

type CitiesResponse = Array<{ nome: string; codigo_ibge: string }>

const CITIES_FOLDER = 'locations/cities/'

export class FetchCitiesUseCase {
  constructor(
    private readonly httpProvider: HttpProvider,
    private readonly storageProvider: StorateProvider,
  ) {}

  async execute({
    acronym,
  }: FetchCitiesUseCaseRequest): Promise<FetchCitiesUseCaseResponse> {
    const filename = `${acronym}.json`
    const storageCities = await this.storageProvider.read({
      filename,
      folder: CITIES_FOLDER,
    })

    if (storageCities) {
      const cities = JSON.parse(storageCities) as City[]

      return { cities }
    }

    const url = new URL(
      `/api/ibge/municipios/v1/${acronym}`,
      ENV.BRASIL_API_BASE_URL,
    )
    const body = await this.httpProvider.get<CitiesResponse>(url.toString())

    const cities = body.map<City>((city) => {
      return { id: city.codigo_ibge, name: city.nome }
    })

    await this.storageProvider.save({
      content: Buffer.from(JSON.stringify(cities)),
      filename,
      folder: CITIES_FOLDER,
    })

    return { cities }
  }
}
