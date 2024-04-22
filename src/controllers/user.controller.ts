import { NextFunction, Request, Response } from "express";
import { EditUserAddtionalDataSchema } from "../entities/user.entity/user.entity";
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
		EditUserAddtionalDataSchema.parse(req.body.editUserData);
		const savedData = await editUserAdditionalDataService(req.body.id, req.body.editUserData);
		res.status(200).json({ editedUsetData: savedData });
	} catch (err) {
		next(err);
	}
};
export const uploadProfilePhotoCOntroller = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await uploadProfilePhotoService(req.body.photo, req.body.id);
		res.status(200).json(result);
	} catch (err) {
		next(err);
	}
};
