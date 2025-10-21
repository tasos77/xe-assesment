import type { StoreData } from '../../../infra/controllers/http/store/types/requests'
import type { DBRepository } from '../../repositories/db/repository'

interface StoreServiceDeps {
  dbRepository: Promise<DBRepository>
}

export interface StoreService {
  storeAd: (ad: StoreData) => Promise<boolean | Error>
}

export const make = (deps: StoreServiceDeps): StoreService => {
  const { dbRepository } = deps

  // propagate error if any
  const storeAd = async (ad: StoreData): Promise<boolean | Error> => {
    return await (await dbRepository).storeAd(ad)
  }

  return {
    storeAd
  }
}
