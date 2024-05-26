import { NextFunction, Request, Response } from "express";
import { createPostService, deletePostService, editPostService, loadMyPostsService } from "../services/post.service";

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
