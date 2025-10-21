import type { StoreData } from '../../../infra/controllers/http/store/types/requests'

export interface DBRepository {
  storeAd: (ad: StoreData) => Promise<void>
  getAllAds: () => Promise<any>
}
