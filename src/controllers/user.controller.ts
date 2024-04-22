import { NextFunction, Request, Response } from "express";
import { EditUserAddtionalDataSchema } from "../entities/user.entity/user.entity";
import { editUserAdditionalDataService } from "../services/user.service";

export const editUserAdditionalDataController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		EditUserAddtionalDataSchema.parse(req.body.editUserData);
		const savedData = await editUserAdditionalDataService(req.body.id, req.body.editUserData);
		res.status(200).json({ editedUsetData: savedData });
	} catch (err) {
		next(err);
	}
};
