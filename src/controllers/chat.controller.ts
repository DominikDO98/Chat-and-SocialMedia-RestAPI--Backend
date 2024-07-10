import { NextFunction, Request, Response } from "express";
import { ChatService } from "../services/chat.service";

export class ChatController {
	private _chatService = new ChatService();
	constructor() {
		this._chatService;
	}
	createChat = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._chatService.createChat(req.body.contact_id, req.body.chatData);
			res.status(201).json({ succes: true });
		} catch (err) {
			next(err);
		}
	};
	createGroupChat = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._chatService.createGroupChat(req.body.id, req.body.participantsIds, req.body.chatData);
			res.status(201).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	addUsersToGroup = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._chatService.addUsersToGroup(req.body.participantsIds, req.body.chat_id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	changeChatName = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._chatService.changeChatName(req.body.chat_id, req.body.newName);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	loadPrivateChats = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const chats = await this._chatService.loadPrivateChats(req.body.id);
			res.status(200).json(chats);
		} catch (err) {
			next(err);
		}
	};
	loadGroupChats = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const chats = await this._chatService.loadGroupChats(req.body.id);
			res.status(200).json(chats);
		} catch (err) {
			next(err);
		}
	};
	deleteGroupChat = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._chatService.deleteGroupChat(req.body.chat_id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	deleteUserFromGroup = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._chatService.deleteUserFromGroup(req.body.user_id, req.body.chat_id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
}
