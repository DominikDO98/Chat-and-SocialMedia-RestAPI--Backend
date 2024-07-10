import { NextFunction, Request, Response } from "express";
import { MessageService } from "../services/message.service";

export class MessageController {
	private _messageService = new MessageService();
	constructor() {
		this._messageService;
	}
	sendMessage = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._messageService.sendMessage(req.body.message, req.body.id);
			res.status(201).json({ success: true });
		} catch (err) {
			next(err);
		}
	};

	loadMessages = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const messages = await this._messageService.loadMessages(req.params.chatId, req.params.offset);
			res.status(200).json({ messages: messages });
		} catch (err) {
			next(err);
		}
	};

	deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._messageService.deleteMessage(req.body.messId);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};

	checkMessagesAsDelivered = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._messageService.checkMessagesAsDelivered(req.body.chatId);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
}
