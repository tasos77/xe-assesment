import type { AdResponse } from '../../../infra/controllers/http/showData/types/responses'
import type { StoreData } from '../../../infra/controllers/http/store/types/requests'

export interface DBRepository {
  storeAd: (ad: StoreData) => Promise<boolean | Error>
  getAllAds: () => Promise<AdResponse | Error>
}
