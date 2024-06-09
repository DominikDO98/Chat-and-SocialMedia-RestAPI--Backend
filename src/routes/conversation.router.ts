import { NextFunction, Request, Response, Router } from "express";
import { validateReq } from "../utils/validateReq/validateReq";
import { ConversationCreationSchema, ChatParticipantsIdsSchema } from "../entities/conversation.entity/conversation.entity";
import { addUsersToGroupController, changeConversationNameController, createConversationController, deleteGroupConversationController, deleteUserFromGroupController, loadConversationsController } from "../controllers/conversation.controller";

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
	})
	.patch("/addUsersToGroupConversation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["participantsIds", "conversationData"]);
		ChatParticipantsIdsSchema.parse(req.body.participantsIds);
		ConversationCreationSchema.parse(req.body.conversationData);
		await addUsersToGroupController(req, res, next);
	})
	.patch("/changeConversationName", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["conversation_id", "newName"]);
		await changeConversationNameController(req, res, next);
	})
	.get("/loadConversations", async (req: Request, res: Response, next: NextFunction) => {
		await loadConversationsController(req, res, next);
	})
	.delete("/deleteGroupConversation", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["conversation_id"]);
		await deleteGroupConversationController(req, res, next);
	})
	.delete("/deleteUserFromGroupConversaiton", async (req: Request, res: Response, next: NextFunction) => {
		validateReq(req, ["user_id"]);
		await deleteUserFromGroupController(req, res, next);
	});
