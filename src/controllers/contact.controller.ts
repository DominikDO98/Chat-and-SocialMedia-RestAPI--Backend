import { NextFunction, Request, Response } from "express";
import { ContactService } from "../services/contact.service";

export class ContactController {
	private _contactService = new ContactService();
	constructor() {
		this._contactService;
	}
	deleteContact = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this._contactService.deleteContact(req.body.contact_id);
			res.status(200).json({ success: true });
		} catch (err) {
			next(err);
		}
	};
	loadContactList = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const contactList = await this._contactService.loadContactList(req.body.id);
			res.status(200).json(contactList);
		} catch (err) {
			next(err);
		}
	};
}
