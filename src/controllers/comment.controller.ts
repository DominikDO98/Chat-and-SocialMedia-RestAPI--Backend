import { NextFunction, Request, Response } from "express";
import { addCommentService, deleteCommentService, editCommentService, loadCommentsService } from "../services/comment.service";

//comments
export const addCommentController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await addCommentService(req.body.commentData, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const editCommentContorller = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await editCommentService(req.body.commentData, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const deleteCommentController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await deleteCommentService(req.body.commentId, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const loadCommentsController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const comments = await loadCommentsService(req.params.postId, Number(req.params.offset));
		res.status(200).json({ comments: comments });
	} catch (err) {
		next(err);
	}
};
