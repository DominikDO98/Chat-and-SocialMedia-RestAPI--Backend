import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AuthenticationError, CustomError } from "../utils/errors/errors";

export const handleError = (err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AuthenticationError) {
		res.status(err.code).json({ message: err.message, key: err.key });
	} else if (err instanceof CustomError) {
		res.status(err.code).json({ message: err.message });
	} else if (err instanceof ZodError) {
		res.status(400).json({ message: err.issues[0].message });
	} else if (err instanceof Error) {
		res.status(500).json({ message: "Internal server error. Please, try again later" });
	}
	next();
};
