import { Pool } from "pg";
import { testConfig } from "../utils/db/db.config";
import { initiateTestDB } from "../utils/db/db.create";
import { userTestData, postTestData, groupTestData } from "./dataForTest";
const testPool = new Pool(testConfig);

const insertDataForTests = async () => {
	await testPool.query("INSERT INTO users (id, username, password, email_address, lastname, firstname, birthday, city, occupation, school, description, profile_photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)", [...Object.values(userTestData)]);

	await testPool.query("INSERT INTO posts (id, user_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [...Object.values(postTestData)]);

	await testPool.query("INSERT INTO groups (id, admin_id, name, profile_photo, created_at, is_private, description) VALUES ($1, $2, $3, $4, $5, $6, $7)", [...Object.values(groupTestData)]);
};
(async () => {
	await initiateTestDB();
	await insertDataForTests();
})();
