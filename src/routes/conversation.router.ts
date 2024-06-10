import { NextFunction, Request, Response, Router } from "express";
import { validateReq } from "../utils/validateReq/validateReq";
import { ConversationCreationSchema, ChatParticipantsIdsSchema } from "../entities/conversation.entity/conversation.entity";
import { addUsersToGroupController, changeConversationNameController, createConversationController, createGroupConversationController, deleteGroupConversationController, deleteUserFromGroupController, loadGroupConversationsController, loadPrivateConversationsController } from "../controllers/conversation.controller";
import { z } from "zod";

export const ConversationRouter = Router();
ConversationRouter
	//conversations
	.post("/createConversation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["contact_id", "conversationData"]);
		ConversationCreationSchema.parse(req.body.conversationData);
		await createConversationController(req, res, next);
	})
	.post("/createGroupConversation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["participantsIds", "conversationData"]);
		ChatParticipantsIdsSchema.parse(req.body.participantsIds);
		ConversationCreationSchema.parse(req.body.conversationData);
		await createGroupConversationController(req, res, next);
	})
	.patch("/addUsersToGroupConversation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["participantsIds", "conversation_id"]);
		ChatParticipantsIdsSchema.parse(req.body.participantsIds);
		z.string().uuid().parse(req.body.conversation_id);
		await addUsersToGroupController(req, res, next);
	})
	.patch("/changeConversationName", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["conversation_id", "newName"]);
		await changeConversationNameController(req, res, next);
	})
	.get("/loadPrivateConversations", async (req: Request, res: Response, next: NextFunction) => {
		await loadPrivateConversationsController(req, res, next);
	})
	.get("/loadGroupConversations", async (req: Request, res: Response, next: NextFunction) => {
		await loadGroupConversationsController(req, res, next);
	})
	.delete("/deleteGroupConversation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["conversation_id"]);
		await deleteGroupConversationController(req, res, next);
	})
	.delete("/deleteUserFromGroupConversation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["user_id", "conversation_id"]);
		await deleteUserFromGroupController(req, res, next);
	});
