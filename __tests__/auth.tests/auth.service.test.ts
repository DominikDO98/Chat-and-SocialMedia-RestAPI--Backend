import { UserCreationEnitity } from "../../entities/user.entity/user.types";
import { loginUserByEmailService, loginUserByNameService, registerUserService } from "../../src/services/auth.service";
import * as Repo from "../../src/repositories/auth.repository";
import { v4 as uuid } from "uuid";
import { hashSync } from "bcrypt";

describe("auth service tests", () => {
	const registrationData: UserCreationEnitity = {
		username: "Name",
		email_address: "email@gmail.com",
		password: "password",
		id: uuid(),
	};

	describe("registerUserService", () => {
		test("registerUserService return userData and accessToken", async () => {
			const mockRepo = jest.spyOn(Repo, "registerUserRepo").mockImplementation(async () => {
				return {
					userData: {
						username: registrationData.username,
						email_address: registrationData.email_address,
					},
					id: registrationData.id,
				};
			});

			const returnedData = await registerUserService(registrationData);
			expect(mockRepo).toHaveBeenCalled();
			expect(returnedData.userData).toStrictEqual({ username: registrationData.username, email_address: registrationData.email_address });
			expect(returnedData.accessToken).toBeDefined();
		});
	});
	describe("loginUserByNameService", () => {
		test("loginUserByNameService return userData and accessToken", async () => {
			const mockRepo = jest.spyOn(Repo, "loginUserByNameRepo").mockImplementation(async () => {
				return {
					userData: {
						username: registrationData.username,
						email_address: registrationData.email_address,
					},
					id: registrationData.id,
					password: hashSync(registrationData.password, 10),
				};
			});
			const returnedData = await loginUserByNameService({ username: registrationData.username, password: registrationData.password });
			expect(mockRepo).toHaveBeenCalled();
			expect(returnedData.accessToken).toBeDefined();
			expect(returnedData.userData).toStrictEqual({ username: registrationData.username, email_address: registrationData.email_address });
		});
	});
	describe("loginUserByEmailService", () => {
		test("loginUserByEmailService return userData and accessToken", async () => {
			const mockRepo = jest.spyOn(Repo, "loginUserByEmailRepo").mockImplementation(async () => {
				return {
					userData: {
						username: registrationData.username,
						email_address: registrationData.email_address,
					},
					id: registrationData.id,
					password: hashSync(registrationData.password, 10),
				};
			});
			const returnedData = await loginUserByEmailService({ email_address: registrationData.email_address, password: registrationData.password });
			expect(mockRepo).toHaveBeenCalled();
			expect(returnedData.accessToken).toBeDefined();
			expect(returnedData.userData).toStrictEqual({ username: registrationData.username, email_address: registrationData.email_address });
		});
	});
	describe("login with wrong password", () => {
		const repoReturnWrong = {
			userData: {
				username: registrationData.username,
				email_address: registrationData.email_address,
			},
			id: registrationData.id,
			password: "wrong",
		};
		test("loginUserByEmailService throws errors when  incorrect password is being served", async () => {
			const mockRepoLoginByName = jest.spyOn(Repo, "loginUserByNameRepo").mockImplementation(async () => {
				return repoReturnWrong;
			});
			const throwValidationErrorByName = async () => {
				try {
					await loginUserByNameService({ username: repoReturnWrong.userData.username, password: repoReturnWrong.password });
				} catch (err) {
					throw Error(err as string);
				}
			};
			expect(mockRepoLoginByName).toHaveBeenCalled();
			await expect(throwValidationErrorByName).rejects.toThrow();
		});
		test("loginUserByEmailService throws errors when  incorrect password is being served", async () => {
			const mockRepoLoginByEmail = jest.spyOn(Repo, "loginUserByEmailRepo").mockImplementation(async () => {
				return repoReturnWrong;
			});
			const throwValidationErrorByEmail = async () => {
				try {
					await loginUserByEmailService({ email_address: repoReturnWrong.userData.email_address, password: repoReturnWrong.password });
				} catch (err) {
					throw new Error(err as string);
				}
			};
			expect(mockRepoLoginByEmail).toHaveBeenCalled();
			await expect(throwValidationErrorByEmail).rejects.toThrow();
		});
	});
});
