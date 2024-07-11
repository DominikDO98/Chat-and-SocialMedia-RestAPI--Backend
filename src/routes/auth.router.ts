import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateReq } from "../utils/validateReq/validateReq";

export const AuthRouter = Router();
//prettier-ignore
const authController = new AuthController();
AuthRouter.get("/", async (req, res) => {
	res.send("ok");
})
	.post("/registerUser", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["userAuthData"]);
		await authController.registerUser(req, res, next);
	})
	.post("/loginUserByName", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["userAuthData"]);
		await authController.loginUserByName(req, res, next);
	})
	.post("/loginUserByEmail", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["userAuthData"]);
		await authController.loginUserByEmail(req, res, next);
	});
