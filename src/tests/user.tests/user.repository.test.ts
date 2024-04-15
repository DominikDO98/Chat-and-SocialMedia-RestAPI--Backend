import { v4 as uuid } from "uuid";
import { UserCreationEnitity, UserEntity } from "../../entities/user.entity/user.types";
import * as UserRepo from "../../repositories/user.repository";
import { pool } from "../../utils/db/db";
import { initiateTestDB } from "../../utils/db/db.init";

describe("userRepository tests", () => {
	const userRegistrationData: UserCreationEnitity = {
		id: uuid(),
		username: "Test",
		password: "password",
		email_address: "test@gmail.pl",
	};
	beforeAll(async () => {
		await initiateTestDB()
			.then()
			.catch((err) => {
				console.log(err);
			})
			.finally(async () => {
				await pool.query("INSERT INTO users (id, username, password, email_address) VALUES ($1, $2, $3, $4) RETURNING id", [userRegistrationData.id, userRegistrationData.username, userRegistrationData.password, userRegistrationData.email_address]);
			});
	});
	describe("editUserAdditionalDataRepo", () => {
		test("function correctly saves data", async () => {
			const dataIncoming: Omit<UserEntity, "id" | "password" | "username" | "email_address" | "profile_photo"> = {
				lastname: "Smith",
				firstname: "Matt",
				birthday: new Date("2005-04-08"),
				city: "Warsaw",
				occupation: "cook",
				school: "Warsaw Univesity of Life Science",
				description: "HI, i'm Matt",
			};
			const receivedData = await UserRepo.editUserAdditionalDataRepo(userRegistrationData.id, dataIncoming);
			expect(receivedData.lastname).toStrictEqual(dataIncoming.lastname);
			expect(receivedData.firstname).toStrictEqual(dataIncoming.firstname);
			expect(receivedData.birthday).toStrictEqual(dataIncoming.birthday);
			expect(receivedData.city).toStrictEqual(dataIncoming.city);
			expect(receivedData.occupation).toStrictEqual(dataIncoming.occupation);
			expect(receivedData.school).toStrictEqual(dataIncoming.school);
			expect(receivedData.description).toStrictEqual(dataIncoming.description);
		});
	});
	// describe("loadUserDataRepo", () => {});
	// describe("uploadProfilePhotoRepo", () => {});
});
