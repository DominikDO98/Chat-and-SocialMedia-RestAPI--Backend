import { v4 as uuid } from "uuid";
import { UserCreationEnitity, UserEntity } from "../../entities/user.entity/user.types";
import * as UserRepo from "../../repositories/user.repository";
import { pool } from "../../utils/db/db";
import { initiateTestDB } from "../../utils/db/db.init";
import { convertImg } from "./testingAssets/readFile";

describe("userRepository tests", () => {
	const userTestData: UserCreationEnitity = {
		id: uuid(),
		username: "Test",
		password: "password",
		email_address: "test@gmail.pl",
	};
	const profile_photo = convertImg();
	const dataChanges: Omit<UserEntity, "id" | "password" | "username" | "email_address" | "profile_photo"> = {
		lastname: "Smith",
		firstname: "Matt",
		birthday: new Date("2005-04-08"),
		city: "Warsaw",
		occupation: "cook",
		school: "Warsaw Univesity of Life Science",
		description: "HI, i'm Matt",
	};
	const createUserForTests = async () => {
		await pool.query("INSERT INTO users (id, username, password, email_address) VALUES ($1, $2, $3, $4) RETURNING id", [userTestData.id, userTestData.username, userTestData.password, userTestData.email_address]);
	};
	const createDataForTests = async () => {
		await pool.query("UPDATE  users SET lastname = $1, firstname = $2, birthday = $3, city = $4, occupation = $5, school = $6, description = $7 WHERE id = $8 RETURNING lastname, firstname, birthday, city, occupation, school, description", [dataChanges.lastname, dataChanges.firstname, dataChanges.birthday, dataChanges.city, dataChanges.occupation, dataChanges.school, dataChanges.description, userTestData.id]);
	};
	beforeAll(async () => {
		await initiateTestDB()
			.then()
			.catch((err) => {
				console.log(err);
			})
			.finally(async () => {
				await createUserForTests();
			});
	});
	afterEach(async () => {
		await createDataForTests();
	});
	describe("editUserAdditionalDataRepo", () => {
		test("function correctly saves data", async () => {
			const receivedData = await UserRepo.editUserAdditionalDataRepo(userTestData.id, dataChanges);
			expect(receivedData.lastname).toStrictEqual(dataChanges.lastname);
			expect(receivedData.firstname).toStrictEqual(dataChanges.firstname);
			expect(receivedData.birthday).toStrictEqual(dataChanges.birthday);
			expect(receivedData.city).toStrictEqual(dataChanges.city);
			expect(receivedData.occupation).toStrictEqual(dataChanges.occupation);
			expect(receivedData.school).toStrictEqual(dataChanges.school);
			expect(receivedData.description).toStrictEqual(dataChanges.description);
		});
	});
	// describe("loadUserDataRepo", () => {});
	// describe("uploadProfilePhotoRepo", () => {});
});
