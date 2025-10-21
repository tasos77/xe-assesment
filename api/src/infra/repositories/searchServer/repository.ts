import axios from "axios";
import type { SearchServerRepository } from "../../../core/repositories/searchServer/repository";

export interface SearchResponse {
	placeId: string;
	mainText: string;
	secondaryText: string;
}

export const make = (): SearchServerRepository => {
	const client = axios.create({
		baseURL:
			"https://oapaiqtgkr6wfbum252tswprwa0ausnb.lambda-url.eu-central-1.on.aws",
	});

	// define search function
	const search = async (query: string): Promise<SearchResponse[] | Error> => {
		return client
			.get(`/?input=${query}`)
			.then((res) => res.data)
			.catch((err) => {
				return new Error(
					`Failed to search for ${query}, reason ${err.message}`,
				);
			});
	};

	return {
		search,
	};
};
