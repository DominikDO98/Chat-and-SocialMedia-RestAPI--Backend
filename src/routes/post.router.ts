import { NextFunction, Request, Response, Router } from "express";
import { addCommentController, createEventController, createPostController, deleteCommentController, deleteEventController, deletePostController, editCommentContorller, editEventContorller, editPostController, giveLikeController, joinEventController, leaveEventController, loadCommentsController, loadMyPostsController, removeLikeController } from "../controllers/post.contorller";
import { CommentCreationSchema, CommentEditionSchema } from "../entities/post.entity/comment.entity";
import { EventSchema } from "../entities/post.entity/event.entity";
import { LikeCreationSchema } from "../entities/post.entity/like.entity";
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
	})
	//likes
	.post("/giveLike", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["likeData", "id"]);
		LikeCreationSchema.parse(req.body.likeData);
		await giveLikeController(req, res, next);
	})
	.delete("/removeLike", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["likeData", "id"]);
		LikeCreationSchema.parse(req.body.likeData);
		await removeLikeController(req, res, next);
	})
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
	})
	//events
	.post("/createEvent", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["postData", "eventData", "id"]);
		PostCreationSchema.parse(req.body.postData);
		EventSchema.parse(req.body.eventData);
		await createEventController(req, res, next);
	})
	.patch("/editEvent", async(req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["postData", "eventData", "id"]);
		PostEditionSchema.parse(req.body.postData);
		// EventSchema.parse(req.body.evnetData);
		await editEventContorller(req, res, next);
	})
	.post("/joinEvent", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id", "eventId"]);
		await joinEventController(req, res, next);
	})
	.delete("/leaveEvent", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id", "eventId"]);
		await leaveEventController(req, res, next);
	})
	.delete("/deleteEvent", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id", "eventId"]);
		await deleteEventController(req, res, next);
	});
