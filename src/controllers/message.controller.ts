import { NextFunction, Request, Response } from "express";
import { checkMessageAsDeliveredService, deleteMessageService, loadMessagesService, sendMessageService } from "../services/message.service";

export const sendMessageController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await sendMessageService(req.body.messageData, req.body.id);
		res.status(201).json({ success: true });
	} catch (err) {
		next(err);
	}
};

export const loadMessagesController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const messages = await loadMessagesService(req.body.chatId, req.body.offset);
		res.status(200).json({ messages: messages });
	} catch (err) {
		next(err);
	}
};

export const deleteMessageController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await deleteMessageService(req.body.messId);
	} catch (err) {
		next(err);
	}
};

export const checkMessageAsDeliveredController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await checkMessageAsDeliveredService(req.body.messId);
	} catch (err) {
		next(err);
	}
};
