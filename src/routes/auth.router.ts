import { NextFunction, Request, Response, Router } from "express";
import { registerUserController, loginUserByNameController, loginUserByEmailController } from "../controllers/auth.controller";
import { validateReq } from "../utils/validateReq/validateReq";

export const AuthRouter = Router();
//prettier-ignore
AuthRouter
	.get('/', async (req, res) => {
		res.send('ok')
	})
	.post("/registerUser", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ['userRegistrationData']);
		await registerUserController(req, res, next);
	})
	.post("/loginUserByName", async (req: Request, res: Response, next: NextFunction) => {
		// TODO: validate request
		await loginUserByNameController(req, res, next);
	})
	.post("/loginUserByEmail", async (req: Request, res: Response, next: NextFunction) => {
		// TODO: validate request
		await loginUserByEmailController(req, res, next);
	});
