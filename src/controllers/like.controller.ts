import { NextFunction, Request, Response } from "express";
import { giveLikeService, removeLikeService } from "../services/post.service";

//likes
export const giveLikeController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await giveLikeService(req.body.likeData, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const removeLikeController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await removeLikeService(req.body.likeData, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
