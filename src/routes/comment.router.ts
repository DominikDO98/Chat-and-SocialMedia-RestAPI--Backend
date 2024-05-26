import { NextFunction, Request, Response, Router } from "express";
import { addCommentController, deleteCommentController, editCommentContorller, loadCommentsController } from "../controllers/comment.controller";
import { CommentCreationSchema, CommentEditionSchema } from "../entities/post.entity/comment.entity";
import { validateReq } from "../utils/validateReq/validateReq";

export const CommentRouter = Router();
CommentRouter
	//comments
	.post("/addComment", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["commentData", "id"]);
		CommentCreationSchema.parse(req.body.commentData);
		await addCommentController(req, res, next);
	})
	.patch("/editComment", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["commentData", "id"]);
		CommentEditionSchema.parse(req.body.commentData);
		await editCommentContorller(req, res, next);
	})
	.delete("/deleteComment", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["commentId", "id"]);
		await deleteCommentController(req, res, next);
	})
	.get("/loadComments/:postId/:offset", async (req: Request, res: Response, next: NextFunction) => {
		//TODO: add offset
		await loadCommentsController(req, res, next);
	});
