import { NextFunction, Request, Response, Router } from "express";
import { LikeController } from "../controllers/like.controller";
import { LikeCreationSchema } from "../entities/like.entity/like.factory";
import { validateReq } from "../utils/validateReq/validateReq";

export const LikeRouter = Router();
const likeController = new LikeController();
LikeRouter
	//prettier-ignore
	.post("/giveLike", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["likeData", "id"]);
		LikeCreationSchema.parse(req.body.likeData);
		await likeController.giveLike(req, res, next);
	})
	.delete("/removeLike", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["likeData", "id"]);
		LikeCreationSchema.parse(req.body.likeData);
		await likeController.removeLike(req, res, next);
	});
