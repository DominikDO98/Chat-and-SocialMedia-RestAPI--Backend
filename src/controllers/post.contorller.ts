import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/post.service";

export class PostController {
	private _postService = new PostService();
	constructor() {
		this._postService;
	}
	createPost = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const dto = await this._postService.createPost(req.body.postData, req.body.id);
			res.status(201).json(dto);
		} catch (err) {
			next(err);
		}
	};
	editPost = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const dto = await this._postService.editPost(req.body.postData, req.body.id);
			res.status(200).json(dto);
		} catch (err) {
			next(err);
		}
	};
	deletePost = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._postService.deletePost(req.body.id, req.body.post_id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	loadMyPosts = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const dtos = await this._postService.loadUserPosts(req.body.id, Number(req.params.offset));
			res.status(200).json(dtos);
		} catch (err) {
			next(err);
		}
	};
}
