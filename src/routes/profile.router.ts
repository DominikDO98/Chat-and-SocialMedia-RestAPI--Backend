import { NextFunction, Request, Response, Router } from "express";
import { ProfileController } from "../controllers/profile.controller";
import { convertImg } from "../tests/user.tests/testingAssets/readFile";
import { validateReq } from "../utils/validateReq/validateReq";

export const profileRouter = Router();
const profileController = new ProfileController();
profileRouter
	//prettier-ignore
	.get("/", async (req: Request, res: Response, next: NextFunction) => {
		await profileController.loadProfile(req, res, next);
	})
	.post("/", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["editUserData"]);
		// EditUserAddtionalDataSchema.parse(req.body.editUserData);
		await profileController.editProfile(req, res, next);
	})
	.post("/uploadPhoto", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["photo"]);
		//@TODO: remove req.body.photo override after FE is done and ready
		req.body.photo = convertImg();
		if (!(req.body.photo instanceof Buffer)) {
			throw new Error("Data type should be a buffer");
		}
		await profileController.uploadProfilePhoto(req, res, next);
	});
