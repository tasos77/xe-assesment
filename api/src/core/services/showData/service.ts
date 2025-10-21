import type { DBRepository } from "../../repositories/db/repository";

interface ShowAllServiceDeps {
	dbRepository: DBRepository;
}

export interface ShowAllService {
	getAllAds: () => Promise<any>;
}

export const make = (deps: ShowAllServiceDeps): ShowAllService => {
	const { dbRepository } = deps;

	// propagate results or error
	const getAllAds = async () => {
		try {
			return await dbRepository.getAllAds();
		} catch (error) {
			return Error;
		}
	};

	return {
		getAllAds,
	};
};
