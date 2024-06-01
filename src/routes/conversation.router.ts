import { NextFunction, Request, Response, Router } from "express";
import { validateReq } from "../utils/validateReq/validateReq";
import { ConversationCreationSchema, ChatParticipantsIdsSchema } from "../entities/conversation.entity/conversation.entity";
import { createConversationController, loadConversationsController } from "../controllers/conversation.controller";

export const ConversationRouter = Router();
ConversationRouter
	//conversations
	.post("/createConversation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["contact_id", "conversationData"]);
		ConversationCreationSchema.parse(req.body.conversationData);
		await createConversationController(req, res, next);
	})
	.post("/createGroupConversaiton", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["participantsIds", "conversationData"]);
		ChatParticipantsIdsSchema.parse(req.body.participantsIds);
		ConversationCreationSchema.parse(req.body.conversationData);
		await createConversationController(req, res, next);
	});
