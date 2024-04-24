import { PostEntity } from "../../entities/post.entity/post.types";
import { v4 as uuid } from "uuid";
describe("post.repository tests", () => {
	describe("createPostRepo", () => {
		test("function correctly creates instance of postEntitiy in DB", async () => {
			const postData: PostEntity = {
				id: uuid(),
			};
		});
	});
});
