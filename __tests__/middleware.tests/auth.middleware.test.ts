import { Request, Response, NextFunction } from "express";
import { authorizeToken } from "../../src/middleware/authorizeToken";
import { generateAccessToken } from "../../utils/authenticationUtils/jwt.utils";
import { v4 as uuid } from "uuid";
import { UserLoginReturnedData } from "../../entities/user.entity/user.types";
import { handleError } from "../../src/middleware/errorHandler";
import { ValidationError } from "../../src/utils/errors/errors";
import jwt from "jsonwebtoken";

describe("auth middleware", () => {
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;
	const nextFunction: NextFunction = jest.fn();

	beforeEach(() => {
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
		};
	});
	test("authorizeToken return req.body with decoded id", () => {
		const mockUser: UserLoginReturnedData = {
			userData: {
				username: "",
				email_address: "",
			},
			id: uuid(),
			password: "",
		};
		mockRequest = {
			cookies: {
				authToken: generateAccessToken(mockUser.id),
			},
		};
		authorizeToken(mockRequest as Request, mockResponse as Response, nextFunction);
		expect(mockRequest.body.id).toStrictEqual(mockUser.id);
		expect(typeof mockRequest.body.id).toStrictEqual("string");
	});
	test("authorizeToken throws error while no token is being provided", () => {
		mockRequest = {};
		try {
			authorizeToken(mockRequest as Request, mockResponse as Response, nextFunction);
		} catch (err) {
			handleError(err as ValidationError, mockRequest as Request, mockResponse as Response, nextFunction);
		}
		expect(mockResponse.status).toHaveBeenCalledWith(401);
		expect(mockResponse.json).toHaveBeenCalledWith({ message: "No token provided" });
	});
	test("authorizeToken throws error while invalid token is being provided", () => {
		const mockUser: UserLoginReturnedData = {
			userData: {
				username: "",
				email_address: "",
			},
			id: uuid(),
			password: "",
		};
		mockRequest = {
			cookies: {
				authToken: jwt.sign({ id: mockUser.id }, "no secret", { expiresIn: 1 }),
			},
		};
		try {
			authorizeToken(mockRequest as Request, mockResponse as Response, nextFunction);
		} catch (err) {
			handleError(err as ValidationError, mockRequest as Request, mockResponse as Response, nextFunction);
		}
		expect(mockResponse.status).toHaveBeenCalledWith(403);
		expect(mockResponse.json).toHaveBeenCalledWith({ message: "Access forbidden" });
	});
});
