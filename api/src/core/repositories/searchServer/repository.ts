import type { SearchResponse } from "../../../infra/repositories/searchServer/repository";

export interface SearchServerRepository {
	search: (query: string) => Promise<SearchResponse[] | Error>;
}
