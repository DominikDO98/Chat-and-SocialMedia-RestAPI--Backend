import { NextFunction, Request, Response, Router } from "express";
import { editUserAdditionalDataController, loadUserDataController, uploadProfilePhotoCOntroller as uploadProfilePhotoController } from "../controllers/user.controller";
import { validateReq } from "../utils/validateReq/validateReq";

export const UserRouter = Router();
//prettier-ignore
UserRouter
	.get("/", async (req: Request, res: Response, next: NextFunction) => {
		await loadUserDataController(req, res, next);
	})
	.post("/", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["editUSerData"]);
		await editUserAdditionalDataController(req, res, next);
	})
	.post("/uploadPhoto", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["photo"]);
		if (!(req.body.photo instanceof Buffer)) {
			throw new Error("Data type should be a buffer");
		}
		await uploadProfilePhotoController(req, res, next);
	});
