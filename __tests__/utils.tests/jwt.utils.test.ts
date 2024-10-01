import { v4 as uuid } from "uuid";
import { generateAccessToken } from "../../utils/authenticationUtils/jwt.utils";

describe("token generation", () => {
	test("generateAccessToken returns token as a string with 3 parts separated by the dots", () => {
		const id = uuid();
		const token = generateAccessToken(id);
		const tokenParts = token.split(".");

		expect(typeof token).toStrictEqual("string");
		expect(tokenParts[0].length).toBeGreaterThan(1);
		expect(tokenParts[1].length).toBeGreaterThan(1);
		expect(tokenParts[2].length).toBeGreaterThan(1);
	});
});
