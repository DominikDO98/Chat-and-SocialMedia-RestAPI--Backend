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
	const id = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET!, { algorithms: ["HS256"] }, (err: VerifyErrors | null, decodedData: string | JwtPayload | undefined): string | undefined => {
		if (err || !decodedData) {
			throw new AuthenticationError("Access forbidden", 403);
		}
		if (typeof decodedData === "string") return decodedData;
		if (typeof decodedData === "object") return decodedData.id;
	});
	req.body = {
		...req.body,
		id: id,
	};
	next();
};
