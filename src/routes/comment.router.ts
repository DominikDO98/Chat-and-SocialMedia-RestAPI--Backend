import { NextFunction, Request, Response, Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { CommentCreationSchema, CommentEditionSchema } from "../entities/comment.entity/comment.entity";
import { validateReq } from "../utils/validateReq/validateReq";

export const CommentRouter = Router();
const commentController = new CommentController();
CommentRouter
	//prettier-ignore
	.post("/addComment", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["commentData", "id"]);
		CommentCreationSchema.parse(req.body.commentData);
		await commentController.addComment(req, res, next);
	})
	.patch("/editComment", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["commentData", "id"]);
		CommentEditionSchema.parse(req.body.commentData);
		await commentController.editComment(req, res, next);
	})
	.delete("/deleteComment", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["commentId", "id"]);
		await commentController.deleteComment(req, res, next);
	})
	.get("/loadComments/:postId/:offset", async (req: Request, res: Response, next: NextFunction) => {
		//TODO: add offset
		await commentController.loadComments(req, res, next);
	});
