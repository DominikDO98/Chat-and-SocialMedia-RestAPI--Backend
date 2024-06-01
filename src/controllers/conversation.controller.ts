import { NextFunction, Request, Response } from "express";
import { addUsersToGroupService, changeConversationNameService, createConversationService, createGroupConversationService, deleteGroupConversationService, deleteUserFromGroupService, loadConversationsService } from "../services/conversation.service";

export const createConversationController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await createConversationService(req.body.contact_id, req.body.conversationData);
		res.status(201).json({ succes: true });
	} catch (err) {
		next(err);
	}
};
export const createGroupConversationController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await createGroupConversationService(req.body.participantsIds, req.body.conversationData);
		res.status(201).json({ success: true });
	} catch (err) {
		next(err);
	}
};

export const addUsersToGroupController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await addUsersToGroupService(req.body.participantsIds, req.body.conversationData);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};

export const changeConversationNameController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await changeConversationNameService(req.body.conversation_id, req.body.newName);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};

export const loadConversationsController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const conversations = await loadConversationsService(req.body.id);
		res.status(200).json(conversations);
	} catch (err) {
		next(err);
	}
};

export const deleteGroupConversationController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await deleteGroupConversationService(req.body.conversation_id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};

export const deleteUserFromGroupController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await deleteUserFromGroupService(req.body.user_id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
