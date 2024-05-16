import { v4 as uuid } from "uuid";
import { CommentEntity, EventEntity, LikeEntity, PostEntity } from "../../entities/post.entity/post.types";
import { addComment, createEventRepo, createPostRepo, deleteCommentRepo, deleteEventRepo, deletePostRepo, editCommentRepo, editEventRepo, editPostRepo, giveLike, joinEventRepo, leaveEventRepo, loadCommentsRepo, loadMyPostsRepo, removeLike } from "../../repositories/post.repository";
import { eventTestData, likeTestData, testIds } from "../dataForTest";
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
				...dataChnages,
			});
		});
		test("deletePostRepo correctly removes postFrom DB and returns true", async () => {
			const result = await deletePostRepo(testIds.user_id, testIds.post2_id);
			expect(result).toStrictEqual(true);
		});

		test("loadMyPostRepo returns array of 10 posts with additonal data (comment and likes)", async () => {
			const posts = await loadMyPostsRepo(testIds.user_id, 0);
			expect(posts.length).toStrictEqual(10);
			expect(posts[0]).toStrictEqual({
				id: expect.anything(),
				group_id: expect.anything(),
				title: expect.anything(),
				text: expect.anything(),
				picture: expect.anything(),
				attachment: expect.anything(),
				created_at: expect.anything(),
				type: expect.anything(),
				commentid: null,
				commenttext: null,
				commentcreated_at: null,
				commentpicture: null,
				commentattachment: null,
				commentusername: null,
				likes: expect.anything(),
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
		test("removeLike deletes like from DB and returns true", async () => {
			const result = await removeLike({ id: testIds.like_id, user_id: testIds.user_id, post_id: testIds.post_id });
			expect(result).toStrictEqual(true);
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
		test("loadCommentsRepo returns array of 10 comments", async () => {
			const comments = await loadCommentsRepo(testIds.post_id, 0);
			expect(comments.length).toStrictEqual(10);
			expect(comments[0]).toStrictEqual({
				id: expect.anything(),
				username: expect.anything(),
				text: expect.anything(),
				created_at: expect.anything(),
				picture: expect.anything(),
				attachment: expect.anything(),
			});
		});
		test("deleteComment returns true and deletes comment data from DB", async () => {
			const result = await deleteCommentRepo({ id: testIds.comment_id, user_id: testIds.user_id, post_id: testIds.post_id });
			expect(result).toStrictEqual(true);
		});
	});
	describe("events", () => {
		test("createEventRepo creates instanace of the event in DB", async () => {
			const newEvent: EventEntity = {
				id: uuid(),
				user_id: testIds.user_id,
				group_id: testIds.group_id,
				title: "EventForTests",
				text: "descreption of the event",
				picture: convertImg(),
				attachment: "www.someUrl.com",
				created_at: eventTestData.created_at,
				type: 1,
				date: new Date(),
				lat: 12.345678,
				lon: 12.345678,
			};
			const result = await createEventRepo(newEvent);
			expect(result).toStrictEqual(newEvent);
		});
		test("editEventRepo updates and returns data of the event", async () => {
			const dataChnages: EventEntity = {
				id: testIds.event_id,
				user_id: testIds.user_id,
				group_id: testIds.group_id,
				title: "SOME NEWTITLE",
				text: "some text",
				picture: convertImg(),
				attachment: "http://www.someNewURL.com",
				created_at: eventTestData.created_at,
				type: 1,
				date: new Date(),
				lat: 12.121212,
				lon: 12.121212,
			};
			const result = await editEventRepo(dataChnages);
			expect(result).toStrictEqual(dataChnages);
		});
		test("joinEventRepo creates link between user and event post", async () => {
			const result = await joinEventRepo(testIds.user_id, testIds.event_id);
			expect(result).toStrictEqual(true);
		});
		test("leaveEventRepo removes link between user and event post", async () => {
			const result = await leaveEventRepo(testIds.user_id, testIds.event_id);
			expect(result).toStrictEqual(true);
		});
		test("deleteEventRepo deletes instnace of the event from DB and reutrn true", async () => {
			const result = await deleteEventRepo(testIds.user_id, testIds.event_id);
			expect(result).toStrictEqual(true);
		});
	});
});
