import { v4 as uuid } from "uuid";
import { PostEntity } from "../../entities/post.entity/post.types";
import { createPostRepo, editPostRepo } from "../../repositories/post.repository";
import { testIds } from "../dataForTest";
import { convertImg } from "../user.tests/testingAssets/readFile";
describe("post.repository tests", () => {
	describe("posts", () => {
		test("createPostRepo saves post entitiy into DB", async () => {
			const newPost: PostEntity = {
				id: uuid(),
				user_id: testIds.user_id,
				group_id: testIds.group_id,
				title: "post",
				text: "text text",
				picture: convertImg(),
				attachment: "http://www.google.com",
				created_at: new Date(),
				type: 0,
			};
			const post = await createPostRepo(newPost);
			expect(post).toStrictEqual(newPost);
		});
		test("editPostRepo updates and return data from database", async () => {
			const dataChnages: Omit<PostEntity, "created_at"> = {
				id: testIds.post_id,
				user_id: testIds.user_id,
				group_id: testIds.group_id,
				title: "new title",
				text: "new text",
				picture: convertImg(),
				attachment: "http://www.newurl.com",
				type: 0,
			};
			const editedPost = await editPostRepo(dataChnages);
			expect(editedPost).toStrictEqual({
				created_at: expect.anything(),
				...dataChnages,
			});
		});
	});
});
