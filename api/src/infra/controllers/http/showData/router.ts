import type { Request, Response } from "express";
import { Router } from "express";
import type { AdManagerUsecase } from "../../../../core/usecases/adManager/usecase";

interface ShowDataRouterDeps {
	adManagerUsecase: AdManagerUsecase;
}

export const make = (deps: ShowDataRouterDeps): Router => {
	const { adManagerUsecase } = deps;

	// make show data router
	const router: Router = Router();
	router.get("/show", async (req: Request, res: Response) => {
		// fetching data from database
		const result = await adManagerUsecase.show();
		// return results or error accordingly
		res.json(result);
	});
	return router;
};
