import { Request, Response, NextFunction } from "express";
import { handleError } from "../../src/middleware/errorHandler";
import { ZodError, z } from "zod";
import { CustomError } from "../../utils/middlewareUtils/errors";

describe("test if error handler is throwing errors", () => {
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;
	const nextFunction: NextFunction = jest.fn();

	beforeEach(() => {
		mockRequest = {};
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
		};
	});

	describe("ZodError: ", () => {
		test("to throw ZodError", () => {
			const string = "string";
			const zodNumber = z.number();

			try {
				zodNumber.parse(string);
			} catch (err) {
				handleError(err as ZodError, mockRequest as Request, mockResponse as Response, nextFunction);
			}

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({ message: "Expected number, received string" });
		});

		test("not to throw ZodError", () => {
			const number = 1;
			const zodNumber = z.number();

			try {
				zodNumber.parse(number);
			} catch (err) {
				handleError(err as ZodError, mockRequest as Request, mockResponse as Response, nextFunction);
			}

			expect(mockResponse.status).not.toHaveBeenCalledWith(400);
			expect(mockResponse.json).not.toHaveBeenCalledWith({ message: "Expected number, received string" });
		});
	});

	describe("CustomError: ", () => {
		test("to throw CustomError", () => {
			try {
				throw new CustomError("something happend", 405);
			} catch (err) {
				handleError(err as CustomError, mockRequest as Request, mockResponse as Response, nextFunction);
			}

			expect(mockResponse.status).toHaveBeenCalledWith(405);
			expect(mockResponse.json).toHaveBeenCalledWith({ message: "something happend" });
		});

		test("to throw CustomError with initial code", () => {
			try {
				throw new CustomError("something happend again");
			} catch (err) {
				handleError(err as CustomError, mockRequest as Request, mockResponse as Response, nextFunction);
			}

			expect(mockResponse.status).toHaveBeenCalledWith(400);
			expect(mockResponse.json).toHaveBeenCalledWith({ message: "something happend again" });
		});
	});

	describe("Unexpected Error: ", () => {
		test("to throw UnexpectedError", () => {
			try {
				throw new Error();
			} catch (err) {
				handleError(err as Error, mockRequest as Request, mockResponse as Response, nextFunction);
			}

			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith({ message: "Internal server error. Please, try again later" });
		});
	});
});
