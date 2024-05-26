import { NextFunction, Request, Response, Router } from "express";
import { createEventController, deleteEventController, editEventContorller, joinEventController, leaveEventController } from "../controllers/post.contorller";
import { EventSchema } from "../entities/post.entity/event.entity";
import { PostCreationSchema, PostEditionSchema } from "../entities/post.entity/post.entity";
import { validateReq } from "../utils/validateReq/validateReq";

export const EventRouter = Router();
EventRouter
	//events
	.post("/createEvent", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["postData", "eventData", "id"]);
		PostCreationSchema.parse(req.body.postData);
		EventSchema.parse(req.body.eventData);
		await createEventController(req, res, next);
	})
	.patch("/editEvent", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["postData", "eventData", "id"]);
		PostEditionSchema.parse(req.body.postData);
		EventSchema.parse(req.body.evnetData);
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
