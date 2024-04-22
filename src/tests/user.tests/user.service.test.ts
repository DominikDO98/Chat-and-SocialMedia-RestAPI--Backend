import { EditAdditionalUserData, LoadFullUserData, UserCreationEnitity } from "../../entities/user.entity/user.types";
import { loadUserDataRepo } from "../../repositories/user.repository";
import * as Repo from "../../repositories/user.repository";
import { convertImg } from "./testingAssets/readFile";
import { v4 as uuid } from "uuid";

describe("userService tests ", () => {
	const userTestData: UserCreationEnitity = {
		id: uuid(),
		username: "Test",
		password: "password",
		email_address: "test@gmail.pl",
	};
	const img = convertImg();
	const birthday = new Date();
	describe("loadUserDataService", () => {
		test("loadUserDataService calls repo func", async () => {
			const mockRepoLoad = jest.spyOn(Repo, "loadUserDataRepo").mockImplementation(async (): Promise<LoadFullUserData> => {
				return {
					username: "Name",
					email_address: "email@gmail.com",
					profile_photo: img,
					lastname: "Lastname",
					firstname: "some name",
					birthday: birthday,
					city: "Dubai",
					occupation: "software developer",
					school: "none",
					description: "AI: I'll take your job 'cause I write better and cleaner code than you! Junior Software Developer: Spaghetti code go BRRRRRRR",
				};
			});
			const userData = await loadUserDataRepo(userTestData.id);
			expect(mockRepoLoad).toHaveBeenCalledTimes(1);
			expect(mockRepoLoad).toHaveBeenCalledWith(userTestData.id);
			expect(userData).toStrictEqual({
				username: "Name",
				email_address: "email@gmail.com",
				profile_photo: img,
				lastname: "Lastname",
				firstname: "some name",
				birthday: birthday,
				city: "Dubai",
				occupation: "software developer",
				school: "none",
				description: "AI: I'll take your job 'cause I write better and cleaner code than you! Junior Software Developer: Spaghetti code go BRRRRRRR",
			});
		});
	});
	describe("editUserAddtioanlDataService tests", () => {
		test("editUserAddtionalDataSevice calls repo func", async () => {
			const mockRepoEdit = jest.spyOn(Repo, "editUserAdditionalDataRepo").mockImplementation(async (): Promise<EditAdditionalUserData> => {
				return {
					lastname: "Lastname",
					firstname: "some name",
					birthday: birthday,
					city: "Dubai",
					occupation: "software developer",
					school: "none",
					description: "AI: I'll take your job 'cause I write better and cleaner code than you! Junior Software Developer: Spaghetti code go BRRRRRRR",
				};
			});
			const returnedData = await Repo.editUserAdditionalDataRepo(userTestData.id, {} as EditAdditionalUserData);
			expect(mockRepoEdit).toHaveBeenCalledTimes(1);
			expect(mockRepoEdit).toHaveBeenCalledWith(userTestData.id, {});
			expect(returnedData).toStrictEqual({
				lastname: "Lastname",
				firstname: "some name",
				birthday: birthday,
				city: "Dubai",
				occupation: "software developer",
				school: "none",
				description: "AI: I'll take your job 'cause I write better and cleaner code than you! Junior Software Developer: Spaghetti code go BRRRRRRR",
			});
		});
	});
});
