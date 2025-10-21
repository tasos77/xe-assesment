import type { AdResponse } from '../../../infra/controllers/http/showData/types/responses'
import type { StoreData } from '../../../infra/controllers/http/store/types/requests'
import type { SearchResponse } from '../../../infra/repositories/searchServer/repository'
import type { LoggerRepository } from '../../repositories/logger/repository'
import type { SearchService } from '../../services/search/service'
import type { ShowAllService } from '../../services/showData/service'
import type { StoreService } from '../../services/store/service'

interface AdManagerUsecaseDeps {
  logger: LoggerRepository
  searchService: SearchService
  showDataService: ShowAllService
  storeService: StoreService
}

export interface AdManagerUsecase {
  search: (query: string) => Promise<SearchResponse[] | Error>
  store: (ad: StoreData) => Promise<boolean | Error>
  show: () => Promise<AdResponse | Error>
}

export const make = (deps: AdManagerUsecaseDeps): AdManagerUsecase => {
  const { logger, searchService, showDataService, storeService } = deps

  // manage search results
  const search = async (query: string): Promise<SearchResponse[] | Error> => {
    logger.info(`Searching areas for: ${query}`)
    const response = await searchService.search(query)
    if (response instanceof Error) {
      logger.error(`Error searching areas for: ${query}`)
      return response
    }
    return response
  }

  // manage store ads
  const store = async (ad: StoreData): Promise<boolean | Error> => {
    logger.info(`Storing ad: ${ad.title}`)
    const result = await storeService.storeAd(ad)
    if (result instanceof Error) {
      logger.error(`Error storing ad: ${ad}`)
      return result
    }
    return true
  }

  // manage show results
  const show = async (): Promise<AdResponse | Error> => {
    logger.info(`Showing all ads`)
    const response = await showDataService.getAllAds()
    if (response instanceof Error) {
      logger.error(`Error getting all ads`)
      return response
    }
    return response
  }

  return { search, store, show }
}
