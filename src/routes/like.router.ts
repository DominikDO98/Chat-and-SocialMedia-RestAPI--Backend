import { NextFunction, Request, Response, Router } from "express";
import { giveLikeController, removeLikeController } from "../controllers/like.controller";
import { LikeCreationSchema } from "../entities/like.entity/like.entity";
import { validateReq } from "../utils/validateReq/validateReq";

export const LikeRouter = Router();
LikeRouter
	//likes
	.post("/giveLike", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["likeData", "id"]);
		LikeCreationSchema.parse(req.body.likeData);
		await giveLikeController(req, res, next);
	})
	.delete("/removeLike", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["likeData", "id"]);
		LikeCreationSchema.parse(req.body.likeData);
		await removeLikeController(req, res, next);
	});
