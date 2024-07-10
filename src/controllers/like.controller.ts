import { NextFunction, Request, Response } from "express";
import { LikeService } from "../services/like.service";

export class LikeController {
	private _likeService = new LikeService();
	constructor() {
		this._likeService;
	}
	giveLike = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._likeService.giveLike(req.body.likeData, req.body.id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	removeLike = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._likeService.removeLike(req.body.likeData, req.body.id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
}
