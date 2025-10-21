import { LRUCache } from 'lru-cache'
import type { CacheRepository } from '../../../core/repositories/cache/reposotiry'
import type { LoggerRepository } from '../../../core/repositories/logger/repository'
import type { SearchResponse } from '../searchServer/repository'

interface CacheRepositoryDeps {
  logger: LoggerRepository
}

export const make = (deps: CacheRepositoryDeps): CacheRepository => {
  const { logger } = deps

  // create cache
  const cache = new LRUCache<string, SearchResponse[]>({ max: 100 })

  // set value in cache
  const set = (key: string, value: SearchResponse[]) => {
    cache.set(key, value)
    logger.info(`Cache set: ${key}`)
  }

  // get value from cache
  const get = (query: string): SearchResponse[] | undefined => {
    const cached = cache.get(query)
    if (!cached) {
      logger.info(`Cache miss: ${query}`)
      return cached
    }
    logger.info(`Cache hit: ${query}`)
    return cached
  }

  return {
    set,
    get
  }
}
