import type { SearchResponse } from '../../../infra/repositories/searchServer/repository'
import type { CacheRepository } from '../../repositories/cache/reposotiry'
import type { LoggerRepository } from '../../repositories/logger/repository'
import type { SearchServerRepository } from '../../repositories/searchServer/repository'

interface SearchServiceDeps {
  logger: LoggerRepository
  searchServerRepository: SearchServerRepository
  cacheRepository: CacheRepository
}

export interface SearchService {
  search: (query: string) => Promise<SearchResponse[] | Error>
}

export const make = (deps: SearchServiceDeps): SearchService => {
  const { logger, searchServerRepository, cacheRepository } = deps

  const search = async (query: string): Promise<SearchResponse[] | Error> => {
    // search for areas in cache
    logger.info(`Searching for ${query} in cache`)
    const result = cacheRepository.get(query)
    // search for products in server if cache misses
    if (!result) {
      logger.info(`Searching for ${query} in server`)
      const result = await searchServerRepository.search(query)
      // handle error
      if (result instanceof Error) {
        logger.error(`Search for ${query} failed, reason: ${result.message}`)
        return result
      }
      // set result in cache then retur
      cacheRepository.set(query, result)
      return result
    } else {
      return result
    }
  }

  return {
    search
  }
}
