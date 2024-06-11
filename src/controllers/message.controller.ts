import { NextFunction, Request, Response } from "express";
import { loadMessagesService, sendMessageService } from "../services/message.service";

export const sendMessageController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await sendMessageService(req.body.messageData, req.body.id);
		res.status(200).json({ success: true });
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
