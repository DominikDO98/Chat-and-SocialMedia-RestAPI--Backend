import { ZodError, ZodIssue } from "zod";
import { UserCreationSchema, userFactory } from "../../entities/user.entity/user.entity";
import { UserCreationEnitity } from "../../entities/user.entity/user.types";

describe("enitity tests", () => {
	describe("user", () => {
		describe("user entity", () => {
			const newUser: Omit<UserCreationEnitity, "id"> = {
				username: "Tester",
				password: "TestPass1",
				email_address: "testing@gmail.com",
			};
			test("userFactory create correct user instance", () => {
				const user = userFactory(newUser);
				expect(user.username).toStrictEqual(newUser.username);
				expect(user.email_address).toStrictEqual(newUser.email_address);
				expect(user.password).toHaveLength(60);
				expect(typeof user.password).toStrictEqual("string");
				expect(user.id).toBeDefined();
			});
			test("newUserSchema correctly parses user object", () => {
				const user = userFactory(newUser);
				const parsedUser = UserCreationSchema.parse(user);

				expect(parsedUser.username).toStrictEqual(user.username);
				expect(parsedUser.email_address).toStrictEqual(user.email_address);
				expect(parsedUser.password).toHaveLength(60);
				expect(typeof parsedUser.password).toStrictEqual("string");
				expect(parsedUser.id).toBeDefined();
			});
			test("newUserShema throws error when wrong user data is being parsed", () => {
				const wrongUser = {
					username: 1,
					password: true,
					email_address: "testing",
				};
				const throwZodError = () => {
					try {
						UserCreationSchema.parse(wrongUser);
					} catch (err) {
						throw new ZodError(err as ZodIssue[]);
					}
				};
				expect(throwZodError).toThrow(ZodError);

				expect(throwZodError).toThrow("id");
				expect(throwZodError).toThrow("username");
				expect(throwZodError).toThrow("password");
				expect(throwZodError).toThrow("email_address");

				expect(throwZodError).toThrow("Required");
				expect(throwZodError).toThrow("Expected string, received number");
				expect(throwZodError).toThrow("Expected string, received boolean");
				expect(throwZodError).toThrow("Invalid email");
			});
		});
	});
});
