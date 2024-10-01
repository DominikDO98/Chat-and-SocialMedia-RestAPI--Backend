import { UserEntity } from "../../entities/user.entity/user.types";
import * as UserRepo from "../../repositories/user.repository";
import { pool } from "../../src/utils/db/db";
import { testIds, userTestData } from "../initTestDB";
import { convertImg } from "./testingAssets/readFile";

describe("userRepository tests", () => {
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

	describe("editUserAdditionalDataRepo", () => {
		test("function correctly saves data", async () => {
			const receivedData = await UserRepo.editUserAdditionalDataRepo(testIds.user_id, dataChanges);
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
			const loadedData = await UserRepo.loadUserDataRepo(testIds.user_id);
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
