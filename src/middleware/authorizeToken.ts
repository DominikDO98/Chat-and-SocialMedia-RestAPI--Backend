import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../utils/middlewareUtils/errors";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { config } from "dotenv";
config();
export const authorizeToken = (req: Request, res: Response, next: NextFunction) => {
	const authToken = req.cookies["authToken"];
	if (!authToken) {
		throw new AuthenticationError("No token provided", 401);
	}
	jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET!, { algorithms: ["HS256"] }, (err: VerifyErrors | null, id: string | JwtPayload | undefined) => {
		if (err || !id) {
			throw new AuthenticationError("Access forbidden", 403);
		}
		req.body = {
			...req.body,
			id: id,
		};
		next();
	});
};
