import { NextFunction, Request, Response, Router } from "express";
import { loginUserByEmailController, loginUserByNameController, registerUserController } from "../constrollers/auth.controller";

export const AuthRouter = Router();
//prettier-ignore
AuthRouter
	.post("/registerUser", async (req: Request, res: Response, next: NextFunction) => {
		// TODO: validate request
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
