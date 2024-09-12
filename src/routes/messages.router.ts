import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import { MessageController } from "../controllers/message.controller";
import { MessageEntitySchema } from "../entities/message.entity/message.schema";
import { validateReq } from "../utils/validateReq/validateReq";

export const MessageRouter = Router();
const messageController = new MessageController();
MessageRouter
	//prettier-ignore
	.post("/sendMessage", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["message", "id"]);
		MessageEntitySchema.omit({ id: true, created_at: true, send_by: true, is_delivered: true }).parse(req.body.message);
		await messageController.sendMessage(req, res, next);
	})
	.get("/loadMessages/:chatId/:offset", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id"]);
		await messageController.loadMessages(req, res, next);
	})
	.delete("/deleteMessage", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["messId", "id"]);
		z.string().uuid().parse(req.body.messId);
		await messageController.deleteMessage(req, res, next);
	})
	.patch("/checkMessagesAsDelivered", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["chatId", "id"]);
		z.string().uuid().parse(req.body.chatId);
		await messageController.checkMessagesAsDelivered(req, res, next);
	});
