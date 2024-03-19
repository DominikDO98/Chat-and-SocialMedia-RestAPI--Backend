import { v4 as uuid } from "uuid";
import { UserCreationEnitity } from "../../entities/user.entity/user.types";
import { loginUserByEmailRepo, loginUserByNameRepo, registerUserRepo } from "../../repositories/auth.repository";
import { initiateTestDB } from "../../utils/db/db.init";

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
	});
	describe("loginUserByEmailRepo", () => {
		test("loginUserByEmailRepo returns correct data", async () => {
			const email_address = "test@gmail.pl";
			const returnedData = await loginUserByEmailRepo(email_address);
			expect(returnedData.userData).toStrictEqual({ username: "Test", email_address: "test@gmail.pl" });
			expect(returnedData.id).toStrictEqual(userRegistrationData.id);
			expect(returnedData.password).toStrictEqual(userRegistrationData.password);
		});
	});
});
