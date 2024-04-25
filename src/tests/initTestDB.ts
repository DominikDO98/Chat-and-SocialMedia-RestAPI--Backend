import { Pool } from "pg";
import { testConfig } from "../utils/db/db.config";
import { initiateTestDB } from "../utils/db/db.create";
import { v4 as uuid } from "uuid";
import { convertImg } from "./user.tests/testingAssets/readFile";
const testPool = new Pool(testConfig);
const insertDataForTests = async () => {
	const ids = {
		user_id: uuid(),
		post_id: uuid(),
	};
	await testPool.query("INSERT INTO users (id, username, password, email_address, lastname, firstname, birthday, city, occupation, school, description, profile_photo) VALUES ($1, 'testname', 'testpass', 'email@gmail.com', 'testlast', 'testfirst', $2, 'testingcity', 'physical worker', 'testingschool', 'hi', $3)", [ids.user_id, new Date("2024-04-25"), convertImg()]);

	await testPool.query("INSERT INTO posts (id, user_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, 'posttitle', 'post text', $3, 'http://www.google.com', $4, 0)", [ids.post_id, ids.user_id, convertImg(), new Date("2024-04-25")]);
};
(async () => {
	await initiateTestDB();
	await insertDataForTests();
})();
