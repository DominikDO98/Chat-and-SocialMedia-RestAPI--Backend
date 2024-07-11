import { NextFunction, Request, Response, Router } from "express";
import { createEventController, deleteEventController, editEventContorller, EventController, joinEventController, leaveEventController, loadEventController } from "../controllers/event.controller";
import { EventSchema } from "../entities/event.entity/event.entity";
import { PostCreationSchema } from "../entities/post.entity/post.entity";
import { validateReq } from "../utils/validateReq/validateReq";

export const EventRouter = Router();
const eventController = new EventController();
EventRouter
	//prettier-ignore
	.post("/createEvent", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["postData", "eventData", "id"]);
		PostCreationSchema.parse(req.body.postData);
		EventSchema.parse(req.body.eventData);
		await eventController.createEvent(req, res, next);
	})
	.patch("/editEvent", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["postData", "eventData", "id"]);
		await eventController.editEvent(req, res, next);
	})
	.post("/joinEvent", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id", "eventId"]);
		await eventController.joinEvent(req, res, next);
	})
	.delete("/leaveEvent", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id", "eventId"]);
		await eventController.leaveEvent(req, res, next);
	})
	.delete("/deleteEvent", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id", "eventId"]);
		await eventController.deleteEvent(req, res, next);
	})
	.get("/loadEvent/:eventId", async (req: Request, res: Response, next: NextFunction) => {
		await eventController.loadEvent(req, res, next);
	});
