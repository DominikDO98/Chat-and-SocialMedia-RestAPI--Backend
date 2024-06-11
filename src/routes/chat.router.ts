import { NextFunction, Request, Response, Router } from "express";
import { validateReq } from "../utils/validateReq/validateReq";
import { ChatCreationSchema, ChatParticipantsIdsSchema } from "../entities/chat.entity/chat.entity";
import { addUsersToGroupController, changeChatNameController, createChatController, createGroupChatController, deleteGroupChatController, deleteUserFromGroupController, loadGroupChatsController, loadPrivateChatsController } from "../controllers/chat.controller";
import { z } from "zod";

export const ChatRouter = Router();
ChatRouter
	//chats
	.post("/createChat", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["contact_id", "chatData"]);
		ChatCreationSchema.parse(req.body.chatData);
		await createChatController(req, res, next);
	})
	.post("/createGroupChat", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["participantsIds", "chatData"]);
		ChatParticipantsIdsSchema.parse(req.body.participantsIds);
		ChatCreationSchema.parse(req.body.chatData);
		await createGroupChatController(req, res, next);
	})
	.patch("/addUsersToGroupChat", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["participantsIds", "chat_id"]);
		ChatParticipantsIdsSchema.parse(req.body.participantsIds);
		z.string().uuid().parse(req.body.chat_id);
		await addUsersToGroupController(req, res, next);
	})
	.patch("/changeChatName", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["chat_id", "newName"]);
		await changeChatNameController(req, res, next);
	})
	.get("/loadPrivateChats", async (req: Request, res: Response, next: NextFunction) => {
		await loadPrivateChatsController(req, res, next);
	})
	.get("/loadGroupChats", async (req: Request, res: Response, next: NextFunction) => {
		await loadGroupChatsController(req, res, next);
	})
	.delete("/deleteGroupChat", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["chat_id"]);
		await deleteGroupChatController(req, res, next);
	})
	.delete("/deleteUserFromGroupChat", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["user_id", "chat_id"]);
		await deleteUserFromGroupController(req, res, next);
	});
