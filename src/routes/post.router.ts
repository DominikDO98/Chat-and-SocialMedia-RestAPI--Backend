import { NextFunction, Request, Response, Router } from "express";
import { createPostController, deletePostController, editPostController, loadMyPostsController } from "../controllers/post.contorller";
import { PostCreationSchema, PostEditionSchema } from "../entities/post.entity/post.entity";
import { validateReq } from "../utils/validateReq/validateReq";

export const PostRouter = Router();
//prettier-ignore
PostRouter
	.get("/", async (req: Request, res: Response, next: NextFunction) => {
		req;
		res;
		next;
	//TODO: load posts to display on main site
	})
	//posts
	.post("/createPost", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["postData", "id"]);
		PostCreationSchema.parse(req.body.postData);
		await createPostController(req, res, next);
	})
	.patch("/editPost", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["postData", "id"]);
		PostEditionSchema.parse(req.body.postData);
		await editPostController(req, res, next);
	})
	.delete("/deletePost", async (req:Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id", "post_id"]);
		await deletePostController(req, res, next);
	})
	.get("/loadMyPosts/:offset", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id"]);
		await loadMyPostsController(req, res, next);
	});
