import { Request, Response, NextFunction } from "express";
import { AuthenticationError, CustomError, DataBaseError } from "../utils/errors/errors";

export const handleDBErrors = (err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
	if (err.message === 'podwójna wartość klucza narusza ograniczenie unikalności "email_address_ukey"') {
		throw new AuthenticationError("Email address is already taken by another user", "email_address");
	} else if (err.message === 'podwójna wartość klucza narusza ograniczenie unikalności "username_ukey"') {
		throw new AuthenticationError("Username is already taken by another user", "username");
	}
	next(err);
};
