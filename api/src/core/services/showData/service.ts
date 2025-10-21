import type { AdResponse } from '../../../infra/controllers/http/showData/types/responses'
import type { DBRepository } from '../../repositories/db/repository'

interface ShowAllServiceDeps {
  dbRepository: Promise<DBRepository>
}

export interface ShowAllService {
  getAllAds: () => Promise<AdResponse | Error>
}

export const make = (deps: ShowAllServiceDeps): ShowAllService => {
  const { dbRepository } = deps

  // propagate results or error
  const getAllAds = async (): Promise<AdResponse | Error> => {
    return await (await dbRepository).getAllAds()
  }

  return {
    getAllAds
  }
}
