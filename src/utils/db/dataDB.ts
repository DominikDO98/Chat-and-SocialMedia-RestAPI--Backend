import { GroupEntity } from "../../entities/group.entity/group.types";
import { CommentEntity, EventCreationEntity, LikeEntity, PostEntity } from "../../entities/post.entity/post.types";
import { UserEntity } from "../../entities/user.entity/user.types";
import { convertImg } from "../../tests/user.tests/testingAssets/readFile";

export const DBIds = {
	comment_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	comment2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	contact_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	contact2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	conversation_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	conversation2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	event_id: "d6781b71-b08f-42d3-b87e-34b37909f42a",
	event2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	group_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	group2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	invitation_id: "d6781b71-b08f-42d3-b87e-34b37909f42a",
	invitation2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	like_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	like2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	message_id: "d6781b71-b08f-42d3-b87e-34b37909f42a",
	message2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	post_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	post2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	user_id: "d6781b71-b08f-42d3-b87e-34b37909f42a",
};

export const userTestData: UserEntity = {
	id: DBIds.user_id,
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
	id: DBIds.post_id,
	user_id: DBIds.user_id,
	group_id: DBIds.group_id,
	title: "posttitle",
	text: "post text",
	picture: convertImg(),
	attachment: "http://www.google.com",
	created_at: new Date("2024-04-25"),
	type: 0,
};

export const postDataNoID: Omit<PostEntity, "id"> = {
	user_id: DBIds.user_id,
	group_id: DBIds.group_id,
	title: "posttitle",
	text: "post text",
	picture: convertImg(),
	attachment: "http://www.google.com",
	created_at: new Date("2024-04-25"),
	type: 0,
};
export const postTestData2: PostEntity = {
	id: DBIds.post2_id,
	user_id: DBIds.user_id,
	group_id: DBIds.group_id,
	title: "posttitle",
	text: "post text",
	picture: convertImg(),
	attachment: "http://www.google.com",
	created_at: new Date("2024-04-25"),
	type: 0,
};
export const groupTestData: GroupEntity = {
	id: DBIds.group_id,
	admin_id: DBIds.user_id,
	name: "nameOfTheTestGroup",
	profile_photo: convertImg(),
	created_at: new Date(),
	is_private: true,
	description: "hi, it' a group",
};

export const likeTestData: LikeEntity = {
	id: DBIds.like_id,
	user_id: DBIds.user_id,
	post_id: DBIds.post_id,
	created_at: new Date(),
};

export const commentTestData: CommentEntity = {
	id: DBIds.comment_id,
	post_id: DBIds.post_id,
	user_id: DBIds.user_id,
	text: "some text",
	picture: convertImg(),
	attachment: "http://www.someurlorsomethingidk.com",
	created_at: new Date(),
};
export const commentDataNoID: Omit<CommentEntity, "id"> = {
	post_id: DBIds.post_id,
	user_id: DBIds.user_id,
	text: "some text",
	picture: convertImg(),
	attachment: "http://www.someurlorsomethingidk.com",
	created_at: new Date(),
};
export const eventTestData: EventCreationEntity = {
	post: {
		id: DBIds.event_id,
		user_id: DBIds.user_id,
		group_id: DBIds.group_id,
		title: "posttitle",
		text: "post text",
		picture: convertImg(),
		attachment: "http://www.google.com",
		created_at: new Date("2024-04-25"),
		type: 1,
	},
	event: {
		post_id: DBIds.event_id,
		date: new Date(),
		lat: 11.111111,
		lon: 11.111111,
	},
};
