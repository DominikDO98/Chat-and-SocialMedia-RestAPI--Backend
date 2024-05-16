import { Pool } from "pg";
import { testConfig } from "../utils/db/db.config";
import { initiateTestDB } from "../utils/db/db.create";
import { userTestData, postTestData, groupTestData, commentTestData, eventTestData, postTestData2, postDataNoID, commentDataNoID } from "./dataForTest";
import { v4 as uuid } from "uuid";
const testPool = new Pool(testConfig);

const insertDataForTests = async () => {
	await testPool.query("INSERT INTO users (id, username, password, email_address, lastname, firstname, birthday, city, occupation, school, description, profile_photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)", [...Object.values(userTestData)]);

	await testPool.query("INSERT INTO groups (id, admin_id, name, profile_photo, created_at, is_private, description) VALUES ($1, $2, $3, $4, $5, $6, $7)", [...Object.values(groupTestData)]);

	await testPool.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [...Object.values(postTestData)]);

	await testPool.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [...Object.values(postTestData2)]);

	for (let i = 0; i < 10; i++) {
		await testPool.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [uuid(), ...Object.values(postDataNoID)]);
	}
	await testPool.query("INSERT INTO comments (id, post_id, user_id, text, picture, attachment, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)", [...Object.values(commentTestData)]);

	for (let i = 0; i < 10; i++) {
		await testPool.query("INSERT INTO comments (id, post_id, user_id, text, picture, attachment, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)", [uuid(), ...Object.values(commentDataNoID)]);
	}

	await testPool.query("BEGIN;");
	await testPool.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [eventTestData.id, eventTestData.user_id, eventTestData.group_id, eventTestData.title, eventTestData.text, eventTestData.picture, eventTestData.attachment, eventTestData.created_at, eventTestData.type]);
	await testPool.query("INSERT INTO events (post_id, date, lat, lon) VALUES ($1, $2, $3, $4);", [eventTestData.id, eventTestData.date, eventTestData.lat, eventTestData.lon]);
	await testPool.query("COMMIT");
};
(async () => {
	await initiateTestDB();
	await insertDataForTests();
})();
