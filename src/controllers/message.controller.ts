import { NextFunction, Request, Response } from "express";
import { MessageEntity } from "../entities/message.entity/message.type";
import { sendMessageService } from "../services/message.service";

export const sendMessageController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await sendMessageService(req.body.messageData, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
