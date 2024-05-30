import { NextFunction, Request, Response } from "express";
import { deleteContactService, loadContactListService } from "../services/contact.service";

export const deleteContactController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await deleteContactService(req.body.contact_id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};

export const loadContactListController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const contactList = await loadContactListService(req.body.id, Number(req.params.offset));
		res.status(200).json(contactList);
	} catch (err) {
		next(err);
	}
};
