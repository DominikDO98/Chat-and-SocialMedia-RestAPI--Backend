import { NextFunction, Request, Response } from "express";
import { editUserAdditionalDataService, loadUserDataService, uploadProfilePhotoService } from "../services/user.service";

export const loadUserDataController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const fullUserData = await loadUserDataService(req.body.id);
		res.status(200).json({ fullUserData: fullUserData });
	} catch (err) {
		next(err);
	}
};
export const editUserAdditionalDataController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await editUserAdditionalDataService(req.body.id, req.body.editUserData);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
export const uploadProfilePhotoCOntroller = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await uploadProfilePhotoService(req.body.photo, req.body.id);
		res.status(200).json({ success: true });
	} catch (err) {
		next(err);
	}
};
