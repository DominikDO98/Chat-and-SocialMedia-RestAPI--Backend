import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import { ChatController } from "../controllers/chat.controller";
import { validateReq } from "../utils/validateReq/validateReq";
import { ChatCreationSchema, ChatParticipantsIdsSchema } from "../entities/chat.entity/chat.schema";

export const ChatRouter = Router();
const chatController = new ChatController();
ChatRouter
	//prettier-ignore
	.post("/createChat", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["contact_id", "chatData"]);
		ChatCreationSchema.parse(req.body.chatData);
		await chatController.createChat(req, res, next);
	})
	.post("/createGroupChat", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["participantsIds", "chatData"]);
		ChatParticipantsIdsSchema.parse(req.body.participantsIds);
		ChatCreationSchema.parse(req.body.chatData);
		await chatController.createGroupChat(req, res, next);
	})
	.patch("/addUsersToGroupChat", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["participantsIds", "chat_id"]);
		ChatParticipantsIdsSchema.parse(req.body.participantsIds);
		z.string().uuid().parse(req.body.chat_id);
		await chatController.addUsersToGroup(req, res, next);
	})
	.patch("/changeChatName", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["chat_id", "newName"]);
		await chatController.changeChatName(req, res, next);
	})
	.get("/loadPrivateChats", async (req: Request, res: Response, next: NextFunction) => {
		await chatController.loadPrivateChats(req, res, next);
	})
	.get("/loadGroupChats", async (req: Request, res: Response, next: NextFunction) => {
		await chatController.loadGroupChats(req, res, next);
	})
	.delete("/deleteGroupChat", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["chat_id"]);
		await chatController.deleteGroupChat(req, res, next);
	})
	.delete("/deleteUserFromGroupChat", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["user_id", "chat_id"]);
		await chatController.deleteUserFromGroup(req, res, next);
	});
