import { Request } from "express";
import { CustomError } from "../errors/errors";

export const validateReq = (req: Request, requiredData: string[]) => {
	for (const properity of requiredData) {
		if (!req.body[`${properity}`]) {
			throw new CustomError("Required data is missing");
		}
	}
};
