import type { StoreData } from "../../../infra/controllers/http/store/types/requests";
import type { DBRepository } from "../../repositories/db/repository";

interface StoreServiceDeps {
	dbRepository: DBRepository;
}

export interface StoreService {
	storeAd: (ad: StoreData) => void;
}

export const make = (deps: StoreServiceDeps): StoreService => {
	const { dbRepository } = deps;

	// propagate error if any
	const storeAd = async (ad: StoreData) => {
		try {
			await dbRepository.storeAd(ad);
		} catch (error) {
			return Error;
		}
	};

	return {
		storeAd,
	};
};
