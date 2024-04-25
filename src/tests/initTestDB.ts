import { Pool } from "pg";
import { testConfig } from "../utils/db/db.config";
import { initiateTestDB } from "../utils/db/db.create";
import { convertImg } from "./user.tests/testingAssets/readFile";
const testPool = new Pool(testConfig);
export const testIds = {
	user_id: "d6781b71-b08f-42d3-b87e-34b37909f42a",
	post_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
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
	title: "posttitle",
	text: "post text",
	picture: convertImg(),
	attachment: "http://www.google.com",
	created_at: new Date("2024-04-25"),
	type: 0,
};
const insertDataForTests = async () => {
	await testPool.query("INSERT INTO users (id, username, password, email_address, lastname, firstname, birthday, city, occupation, school, description, profile_photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)", [...Object.values(userTestData)]);

	await testPool.query("INSERT INTO posts (id, user_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [...Object.values(postTestData)]);
};
(async () => {
	await initiateTestDB();
	await insertDataForTests();
})();
