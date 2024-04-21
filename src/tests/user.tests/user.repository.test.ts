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
		await pool.query("UPDATE  users SET lastname = $1, firstname = $2, birthday = $3, city = $4, occupation = $5, school = $6, description = $7, profile_photo = $8 WHERE id = $9 RETURNING lastname, firstname, birthday, city, occupation, school, description", [dataChanges.lastname, dataChanges.firstname, dataChanges.birthday, dataChanges.city, dataChanges.occupation, dataChanges.school, dataChanges.description, profile_photo, userTestData.id]);
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
	describe("loadUserDataRepo", () => {
		test("function loads all data the data", async () => {
			const loadedData = await UserRepo.loadUserDataRepo(userTestData.id);
			expect(loadedData.username).toStrictEqual(userTestData.username);
			expect(loadedData.email_address).toStrictEqual(userTestData.email_address);
			expect(loadedData.lastname).toStrictEqual(dataChanges.lastname);
			expect(loadedData.firstname).toStrictEqual(dataChanges.firstname);
			expect(loadedData.birthday).toStrictEqual(dataChanges.birthday);
			expect(loadedData.city).toStrictEqual(dataChanges.city);
			expect(loadedData.country).toStrictEqual(dataChanges.country);
			expect(loadedData.description).toStrictEqual(dataChanges.description);
			expect(loadedData.school).toStrictEqual(dataChanges.school);
			expect(loadedData.profile_photo).toStrictEqual(profile_photo);
		});
	});
	describe("uploadProfilePhotoRepo", () => {
		test("photo is correcly uploaded", async () => {
			await UserRepo.uploadProfilePhotoRepo(convertImg(), userTestData.id);
			const { rows } = await pool.query("SELECT profile_photo FROM users WHERE id = $1", [userTestData.id]);
			const uploadedPhoto = rows[0].profile_photo;

			expect(uploadedPhoto).toStrictEqual(profile_photo);
		});
	});
});
