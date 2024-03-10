import { Request } from "express";
import { CustomError } from "../middlewareUtils/errors";

export const validateReq = (req: Request, requiredData: string[]) => {
	for (const properity of requiredData) {
		if (!req.body[`${properity}`]) {
			throw new CustomError("Data required");
		}
	}
};
