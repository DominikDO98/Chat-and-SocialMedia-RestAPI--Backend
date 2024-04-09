import { v4 as uuid } from "uuid";
import { UserCreationEnitity } from "../../entities/user.entity/user.types";
import { loginUserByEmailRepo, loginUserByNameRepo, registerUserRepo } from "../../repositories/auth.repository";
import { initiateTestDB } from "../../utils/db/db.init";
import { ValidationError } from "../../utils/middlewareUtils/errors";

describe("auth repository tests", () => {
	const userRegistrationData: UserCreationEnitity = {
		id: uuid(),
		username: "Test",
		password: "password",
		email_address: "test@gmail.pl",
	};
	beforeAll(async () => {
		await initiateTestDB();
	});
	describe("regusteruserRepo", () => {
		test("function returns id and unchanged data", async () => {
			const returnedData = await registerUserRepo(userRegistrationData);
			expect(returnedData.id).toStrictEqual(userRegistrationData.id);
			expect(returnedData.userData.email_address).toStrictEqual(userRegistrationData.email_address);
			expect(returnedData.userData.username).toStrictEqual(userRegistrationData.username);
		});
	});
	describe("loginUserByNameRepo", () => {
		test("loginUserByNameRepo returns correct data", async () => {
			const username = "Test";
			const returnedData = await loginUserByNameRepo(username);
			expect(returnedData.userData).toStrictEqual({ username: "Test", email_address: "test@gmail.pl" });
			expect(returnedData.id).toStrictEqual(userRegistrationData.id);
			expect(returnedData.password).toStrictEqual(userRegistrationData.password);
		});
		test("loginUserByNameRepo throws error if user doesn't exist", async () => {
			const wrongUsername = "noFoundTest";
			const throwRepoError = async () => {
				try {
					await loginUserByNameRepo(wrongUsername);
				} catch (error) {
					throw new ValidationError(error as string);
				}
			};
			expect(throwRepoError).rejects.toThrow("User with that username does not exist!");
		});
	});
	describe("loginUserByEmailRepo", () => {
		test("loginUserByEmailRepo returns correct data", async () => {
			const email_address = "test@gmail.pl";
			const returnedData = await loginUserByEmailRepo(email_address);
			expect(returnedData.userData).toStrictEqual({ username: "Test", email_address: "test@gmail.pl" });
			expect(returnedData.id).toStrictEqual(userRegistrationData.id);
			expect(returnedData.password).toStrictEqual(userRegistrationData.password);
		});
		test("loginUserByEmailRepo throws error if user doesn't exist", async () => {
			const wrong_email_address = "notfoundtest@gmail.pl";
			const throwRepoError = async () => {
				try {
					await loginUserByEmailRepo(wrong_email_address);
				} catch (error) {
					throw new ValidationError(error as string);
				}
			};
			expect(throwRepoError).rejects.toThrow("User with that e-mail address does not exist!");
		});
	});
});
