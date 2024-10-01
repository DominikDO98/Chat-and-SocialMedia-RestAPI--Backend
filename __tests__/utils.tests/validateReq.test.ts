import { Request } from "express";
import { validateReq } from "../../src/utils/validateReq/validateReq";

describe("validateReq", () => {
	const req = {
		body: {
			data: "data",
		},
	};
	test("validateReq throws error if given properity doesn't exist", () => {
		const throwReqError = () => {
			try {
				validateReq(req as Request, ["nodata"]);
			} catch (err) {
				throw new Error(err as string);
			}
		};
		expect(throwReqError).toThrow();
	});
	test("validateReq dosen't throw a error if given properity exists", () => {
		const throwReqError = () => {
			try {
				validateReq(req as Request, ["data"]);
			} catch (err) {
				throw new Error(err as string);
			}
		};
		expect(throwReqError).not.toThrow();
	});
});
