export type HttpProvider = {
  get<TData = unknown>(url: string): Promise<TData>
}
