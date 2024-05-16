import { GroupEntity } from "../entities/group.entity/group.types";
import { CommentEntity, LikeEntity, PostEntity } from "../entities/post.entity/post.types";
import { UserEntity } from "../entities/user.entity/user.types";
import { convertImg } from "./user.tests/testingAssets/readFile";

export const testIds = {
	user_id: "d6781b71-b08f-42d3-b87e-34b37909f42a",
	post_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	post2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	group_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	like_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	comment_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	event_id: "d6781b71-b08f-42d3-b87e-34b37909f42a",
};

export const userTestData: UserEntity = {
	id: testIds.user_id,
	username: "testname",
	password: "testpass",
	email_address: "email@gmail.com",
	lastname: "testlast",
	firstname: "testfirst",
	birthday: new Date("2024-04-25"),
	city: "testingcity",
	occupation: "physical worker",
	school: "testingschool",
	description: "hi",
	profile_photo: convertImg(),
};
export const postTestData: PostEntity = {
	id: testIds.post_id,
	user_id: testIds.user_id,
	group_id: testIds.group_id,
	title: "posttitle",
	text: "post text",
	picture: convertImg(),
	attachment: "http://www.google.com",
	created_at: new Date("2024-04-25"),
	type: 0,
};

export const postDataNoID: Omit<PostEntity, "id"> = {
	user_id: testIds.user_id,
	group_id: testIds.group_id,
	title: "posttitle",
	text: "post text",
	picture: convertImg(),
	attachment: "http://www.google.com",
	created_at: new Date("2024-04-25"),
	type: 0,
};
export const postTestData2: PostEntity = {
	id: testIds.post2_id,
	user_id: testIds.user_id,
	group_id: testIds.group_id,
	title: "posttitle",
	text: "post text",
	picture: convertImg(),
	attachment: "http://www.google.com",
	created_at: new Date("2024-04-25"),
	type: 0,
};
export const groupTestData: GroupEntity = {
	id: testIds.group_id,
	admin_id: testIds.user_id,
	name: "nameOfTheTestGroup",
	profile_photo: convertImg(),
	created_at: new Date(),
	is_private: true,
	description: "hi, it' a group",
};

export const likeTestData: LikeEntity = {
	id: testIds.like_id,
	user_id: testIds.user_id,
	post_id: testIds.post_id,
	created_at: new Date(),
};

export const commentTestData: CommentEntity = {
	id: testIds.comment_id,
	post_id: testIds.post_id,
	user_id: testIds.user_id,
	text: "some text",
	picture: convertImg(),
	attachment: "http://www.someurlorsomethingidk.com",
	created_at: new Date(),
};
export const commentDataNoID: Omit<CommentEntity, "id"> = {
	post_id: testIds.post_id,
	user_id: testIds.user_id,
	text: "some text",
	picture: convertImg(),
	attachment: "http://www.someurlorsomethingidk.com",
	created_at: new Date(),
};
export const eventTestData: EventCreationEntity = {
	post: {
		id: testIds.event_id,
		user_id: testIds.user_id,
		group_id: testIds.group_id,
		title: "posttitle",
		text: "post text",
		picture: convertImg(),
		attachment: "http://www.google.com",
		created_at: new Date("2024-04-25"),
		type: 1,
	},
	event: {
		post_id: testIds.event_id,
		date: new Date(),
		lat: 11.111111,
		lon: 11.111111,
	},
};
