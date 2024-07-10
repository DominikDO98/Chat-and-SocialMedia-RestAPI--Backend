import { NextFunction, Request, Response } from "express";
import { CommnetService } from "../services/comment.service";

export class CommentController {
	private _commentService = new CommnetService();
	constructor() {
		this._commentService;
	}
	addComment = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._commentService.addComment(req.body.commentData, req.body.id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	editComment = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._commentService.editComment(req.body.commentData, req.body.id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	deleteComment = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._commentService.deleteComment(req.body.commentId, req.body.id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	loadComments = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const comments = await this._commentService.loadComments(req.params.postId, Number(req.params.offset));
			res.status(200).json({ comments: comments });
		} catch (err) {
			next(err);
		}
	};
}
