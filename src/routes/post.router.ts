import { NextFunction, Request, Response, Router } from "express";
import { PostController } from "../controllers/post.contorller";
import { PostCreationSchema, PostEditionSchema } from "../entities/post.entity/post.schema";
import { validateReq } from "../utils/validateReq/validateReq";

export const PostRouter = Router();
const postController = new PostController();
PostRouter
	//prettier-ignore
	.get("/", async (req: Request, res: Response, next: NextFunction) => {
		req;
		res;
		next;
		//TODO: load posts to display on main site
	})
	.post("/createPost", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["postData", "id"]);
		PostCreationSchema.parse(req.body.postData);
		await postController.createPost(req, res, next);
	})
	.patch("/editPost", async (req: Request, res: Response, next: NextFunction) => {
		console.log("edit");

		validateReq(req, ["postData", "id"]);
		PostEditionSchema.parse(req.body.postData);
		await postController.editPost(req, res, next);
	})
	.delete("/deletePost", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id", "post_id"]);
		await postController.deletePost(req, res, next);
	})
	.get("/loadMyPosts/:offset", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id"]);
		await postController.loadMyPosts(req, res, next);
	});
