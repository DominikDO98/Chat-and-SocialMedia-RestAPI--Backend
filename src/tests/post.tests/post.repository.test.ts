import { v4 as uuid } from "uuid";
import { CommentEntity, LikeEntity, PostEntity } from "../../entities/post.entity/post.types";
import { addComment, createPostRepo, editCommentRepo, editPostRepo, giveLike } from "../../repositories/post.repository";
import { likeTestData, testIds } from "../dataForTest";
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
	describe("likes", () => {
		test("giveLike save like data int DB", async () => {
			const newLike: LikeEntity = {
				id: uuid(),
				user_id: testIds.user_id,
				post_id: testIds.post_id,
				created_at: likeTestData.created_at,
			};
			const like = await giveLike(newLike);
			expect(like).toStrictEqual(newLike);
		});
	});
	describe("comments", () => {
		test("addComment saves comment data into DB", async () => {
			const newComment: CommentEntity = {
				id: uuid(),
				post_id: testIds.post_id,
				user_id: testIds.user_id,
				text: "textOfTheComment",
				picture: convertImg(),
				attachment: "http://www.someAttachment.com",
				created_at: new Date(),
			};
			const comment = await addComment(newComment);
			expect(comment).toStrictEqual(newComment);
		});
		test("editCommnet edits comment data in DB", async () => {
			const dataChnages = {
				id: testIds.comment_id,
				post_id: testIds.post_id,
				user_id: testIds.user_id,
				text: "editedText",
				picture: convertImg(),
				attachment: "http://www.someNewUrl.com",
			};
			const editedComment = await editCommentRepo(dataChnages);
			expect(editedComment).toStrictEqual({
				created_at: expect.anything(),
				...dataChnages,
			});
		});
	});
});
