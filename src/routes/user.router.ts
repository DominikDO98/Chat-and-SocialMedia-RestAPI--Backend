import { NextFunction, Request, Response, Router } from "express";
import { editUserAdditionalDataController, loadUserDataController, uploadProfilePhotoCOntroller as uploadProfilePhotoController } from "../controllers/user.controller";
import { validateReq } from "../utils/validateReq/validateReq";
import { convertImg } from "../tests/user.tests/testingAssets/readFile";

export const UserRouter = Router();
//prettier-ignore
UserRouter
	.get("/", async (req: Request, res: Response, next: NextFunction) => {
		await loadUserDataController(req, res, next);
	})
	.post("/", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["editUserData"]);
		await editUserAdditionalDataController(req, res, next);
	})
	.post("/uploadPhoto", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["photo"]);
		//@TODO: remove req.body.photo override after FE is done and ready
		req.body.photo = convertImg();
		if (!(req.body.photo instanceof Buffer)) {
			throw new Error("Data type should be a buffer");
		}
		await uploadProfilePhotoController(req, res, next);
	});
