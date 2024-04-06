import { Request, Response, NextFunction } from "express";
import { CustomError, DataBaseError } from "../utils/middlewareUtils/errors";

export const handleDBErrors = (err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
	if (err.message === "podwójna wartość klucza narusza ograniczenie unikalności 'email_address_ukey'") {
		throw new DataBaseError("Email address is already taken by another user");
	} else if (err.message === "podwójna wartość klucza narusza ograniczenie unikalności 'username_ukey'") {
		throw new DataBaseError("Username is already taken by another user");
	}
	next(err);
};
