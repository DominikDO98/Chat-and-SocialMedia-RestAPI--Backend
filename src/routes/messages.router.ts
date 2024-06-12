import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import { checkMessagesAsDeliveredController, deleteMessageController, loadMessagesController, sendMessageController } from "../controllers/message.controller";
import { MessageSchema } from "../entities/message.entity/message.entity";
import { validateReq } from "../utils/validateReq/validateReq";

export const MessageRouter = Router();
MessageRouter
	//message-router
	.post("/sendMessage", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["message", "id"]);
		MessageSchema.omit({ id: true, created_at: true, send_by: true, is_delivered: true }).parse(req.body.message);
		await sendMessageController(req, res, next);
	})
	.get("/loadMessages/:chatId/:offset", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["id"]);
		await loadMessagesController(req, res, next);
	})
	.delete("/deleteMessage", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["messId", "id"]);
		z.string().uuid().parse(req.body.messId);
		await deleteMessageController(req, res, next);
	})
	.patch("/checkMessagesAsDelivered", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["chatId", "id"]);
		z.string().uuid().parse(req.body.chatId);
		await checkMessagesAsDeliveredController(req, res, next);
	});
