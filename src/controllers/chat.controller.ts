import { NextFunction, Request, Response } from "express";
import { addUsersToGroupService, changeChatNameService, createChatService, createGroupChatService, deleteGroupChatService, deleteUserFromGroupService, loadGroupChatsService, loadPrivateChatsService } from "../services/chat.service";

export const createChatController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await createChatService(req.body.contact_id, req.body.chatData);
		res.status(201).json({ succes: true });
	} catch (err) {
		next(err);
	}
};
export const createGroupChatController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await createGroupChatService(req.body.id, req.body.participantsIds, req.body.chatData);
		res.status(201).json({ success: true });
	} catch (err) {
		next(err);
	}
};

export const addUsersToGroupController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await addUsersToGroupService(req.body.participantsIds, req.body.chat_id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};

export const changeChatNameController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await changeChatNameService(req.body.chat_id, req.body.newName);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};

export const loadPrivateChatsController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const chats = await loadPrivateChatsService(req.body.id);
		res.status(200).json(chats);
	} catch (err) {
		next(err);
	}
};

export const loadGroupChatsController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const chats = await loadGroupChatsService(req.body.id);
		res.status(200).json(chats);
	} catch (err) {
		next(err);
	}
};

export const deleteGroupChatController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await deleteGroupChatService(req.body.chat_id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};

export const deleteUserFromGroupController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await deleteUserFromGroupService(req.body.user_id, req.body.chat_id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
