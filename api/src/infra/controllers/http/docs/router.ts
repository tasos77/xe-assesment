import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./openapi.json";

// make docs router
export const make = (): Router => {
	const router: Router = Router();
	router.use("/docs", swaggerUi.serve);
	router.get("/docs", swaggerUi.setup(swaggerDocument));

	return router;
};
