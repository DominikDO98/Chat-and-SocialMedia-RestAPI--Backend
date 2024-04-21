import { LoadFullUserData, UserCreationEnitity } from "../../entities/user.entity/user.types";
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
	describe("loadUserDataService", () => {
		test("loadUserDataService properly reads and sends data", async () => {
			const mockRepo = jest.spyOn(Repo, "loadUserDataRepo").mockImplementation(async (): Promise<LoadFullUserData> => {
				return {
					username: "Name",
					email_address: "email@gmail.com",
					profile_photo: convertImg(),
					lastname: "Lastname",
					firstname: "some name",
					birthday: new Date(),
					city: "Dubai",
					occupation: "software developer",
					school: "none",
					description: "AI: I'll take your job 'cause I write better and cleaner code than you! Junior Software Developer: Spaghetti code go BRRRRRRR",
				};
			});
			const userData = await loadUserDataRepo(userTestData.id);
			expect(mockRepo).toHaveBeenCalledTimes(1);
			expect(userData).toStrictEqual({
				username: "Name",
				email_address: "email@gmail.com",
				profile_photo: userData.profile_photo,
				lastname: "Lastname",
				firstname: "some name",
				birthday: userData.birthday,
				city: "Dubai",
				occupation: "software developer",
				school: "none",
				description: "AI: I'll take your job 'cause I write better and cleaner code than you! Junior Software Developer: Spaghetti code go BRRRRRRR",
			});
		});
	});
});
