import { NextFunction, Request, Response } from "express";
import { EventService } from "../services/event.service";

export class EventController {
	private _eventService = new EventService();
	constructor() {
		this._eventService;
	}
	createEvent = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const dto = await this._eventService.createEvent(req.body.postData, req.body.eventData, req.body.id);
			res.status(200).json(dto);
		} catch (err) {
			next(err);
		}
	};
	editEvent = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const dto = await this._eventService.editEvent(req.body.postData, req.body.eventData, req.body.id);
			res.status(200).json(dto);
		} catch (err) {
			next(err);
		}
	};
	joinEvent = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._eventService.joinEvent(req.body.id, req.body.eventId);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	leaveEvent = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._eventService.leaveEvent(req.body.id, req.body.eventId);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._eventService.deleteEvent(req.body.id, req.body.eventId);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	loadEvent = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const event = await this._eventService.loadEvent(req.body.id, req.params.eventId);
			res.status(200).json({ event: event });
		} catch (err) {
			next(err);
		}
	};
}
