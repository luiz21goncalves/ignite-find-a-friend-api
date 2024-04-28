import { HttpProvider } from '@/providers/http-provider'

export class FakeHttpProvider implements HttpProvider {
  async get<TData = unknown>(_url: string): Promise<TData> {
    return {} as TData
  }
}
