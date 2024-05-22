import { NextFunction, Request, Response } from "express";
import { addCommentService, createEventService, createPostService, deleteCommentService, deleteEventService, deletePostService, editCommentService, editEventService, editPostService, giveLikeService, joinEventService, leaveEventService, loadCommentsService, loadMyPostsService, removeLikeService } from "../services/post.service";

//posts
export const createPostController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await createPostService(req.body.postData, req.body.id);
		res.status(201).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const editPostController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await editPostService(req.body.postData, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const deletePostController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await deletePostService(req.body.id, req.body.post_id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const loadMyPostsController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userPosts = await loadMyPostsService(req.body.id, Number(req.params.offset));
		res.status(200).json({ posts: userPosts });
	} catch (err) {
		next(err);
	}
};
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
		await deleteCommentService(req.body.commentIds, req.body.id);
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
//events
export const createEventController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await createEventService(req.body.postData, req.body.eventData, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const editEventContorller = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await editEventService(req.body.postData, req.body.eventData, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const joinEventController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await joinEventService(req.body.id, req.body.eventId);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const leaveEventController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await leaveEventService(req.body.id, req.body.eventId);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const deleteEventController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await deleteEventService(req.body.id, req.body.eventId);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
