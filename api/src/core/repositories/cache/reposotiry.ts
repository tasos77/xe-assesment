import type { SearchResponse } from '../../../infra/repositories/searchServer/repository'

export interface CacheRepository {
  set: (key: string, value: SearchResponse[]) => void
  get: (key: string) => SearchResponse[] | undefined
}
