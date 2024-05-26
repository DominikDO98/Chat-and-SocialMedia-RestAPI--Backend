import { NextFunction, Request, Response } from "express";
import { createEventService, deleteEventService, editEventService, joinEventService, leaveEventService } from "../services/post.service";

//events
export const createEventController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await createEventService(req.body.postData, req.body.eventData, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const editEventContorller = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await editEventService(req.body.postData, req.body.eventData, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const joinEventController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await joinEventService(req.body.id, req.body.eventId);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const leaveEventController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await leaveEventService(req.body.id, req.body.eventId);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const deleteEventController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await deleteEventService(req.body.id, req.body.eventId);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
