import type { StoreData } from "../../../infra/controllers/http/store/types/requests";
import type { SearchResponse } from "../../../infra/repositories/searchServer/repository";
import type { LoggerRepository } from "../../repositories/logger/repository";
import type { SearchService } from "../../services/search/service";
import type { ShowAllService } from "../../services/showData/service";
import type { StoreService } from "../../services/store/service";

interface AdManagerUsecaseDeps {
	logger: LoggerRepository;
	searchService: SearchService;
	showDataService: ShowAllService;
	storeService: StoreService;
}

export interface AdManagerUsecase {
	search: (query: string) => Promise<SearchResponse[] | Error>;
	store: (ad: StoreData) => void;
	show: () => Promise<any>;
}

export const make = (deps: AdManagerUsecaseDeps): AdManagerUsecase => {
	const { logger, searchService, showDataService, storeService } = deps;

	// manage search results
	const search = async (query: string): Promise<SearchResponse[] | Error> => {
		logger.info(`Searching areas for: ${query}`);
		const response = await searchService.search(query);
		if (response instanceof Error) {
			logger.error(`Error searching areas for: ${query}`);
			return response;
		}
		return response;
	};

	// manage store ads
	const store = (ad: StoreData): void => {
		logger.info(`Storing ad: ${ad})}`);
		const result = storeService.storeAd(ad);
		if (result instanceof Error) {
			logger.error(`Error storing ad: ${ad}`);
			throw result;
		}
	};

	// manage show results
	const show = async (): Promise<any> => {
		logger.info(`Showing all ads`);
		const response = await showDataService.getAllAds();
		if (response instanceof Error) {
			logger.error(`Error getting all ads`);
			return response;
		}
		return response;
	};

	return { search, store, show };
};
