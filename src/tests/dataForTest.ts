import { convertImg } from "./user.tests/testingAssets/readFile";

export const testIds = {
	user_id: "d6781b71-b08f-42d3-b87e-34b37909f42a",
	post_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	group_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	like_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	comment_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
};
export const userTestData = {
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
export const postTestData = {
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
export const groupTestData = {
	id: testIds.group_id,
	admin_id: testIds.user_id,
	name: "nameOfTheTestGroup",
	profile_photo: convertImg(),
	created_at: new Date(),
	is_private: true,
	description: "hi, it' a group",
};

export const likeTestData = {
	id: testIds.like_id,
	user_id: testIds.user_id,
	post_id: testIds.post_id,
	created_at: new Date(),
};

export const commentTestData = {
	id: testIds.comment_id,
	post_id: testIds.post_id,
	user_id: testIds.user_id,
	text: "some text",
	picture: convertImg(),
	attachment: "http://www.someurlorsomethingidk.com",
	created_at: new Date(),
};
