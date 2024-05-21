import { Client, Pool, PoolClient, PoolConfig } from "pg";
import { v4 as uuid } from "uuid";
import { comment2DBData, commentDBData, commentDataNoID, contact2DBData, contactDBData, conversation2DBData, conversationDBData, event2DBData, eventDBData, groupDBData, groupDBData2, invitation2DBData, invitationDBData, like2DBData, likeDBData, message2DBData, messageDBData, messageNoID, post2DBData, postDBData, postDataNoID, user2DBData, user3DBData, user4DBData, userDBData } from "./dataDB";
import { Config } from "./db.config";

const initPool = new Pool(Config.initConfig);
const devPool = new Pool(Config.devConfig);
const testPool = new Pool(Config.testConfig);
const initiateTables = async (client: PoolClient) => {
	console.log("Tables");

	console.log("Users");
	await client.query(
		'CREATE TABLE IF NOT EXISTS public.users (id uuid NOT NULL, username character varying(36) COLLATE pg_catalog."default" NOT NULL, password character varying(72) COLLATE pg_catalog."default" NOT NULL, email_address character varying(320) COLLATE pg_catalog."default" NOT NULL, profile_photo bytea, firstname character varying(20) COLLATE pg_catalog."default", lastname character varying(20) COLLATE pg_catalog."default", birthday timestamp with time zone, country character varying(27) COLLATE pg_catalog."default", city character varying(85) COLLATE pg_catalog."default", occupation character varying(50) COLLATE pg_catalog."default", school character varying(50) COLLATE pg_catalog."default", description character varying(200) COLLATE pg_catalog."default", CONSTRAINT "Users_pkey" PRIMARY KEY (id), CONSTRAINT email_address_ukey UNIQUE (email_address) INCLUDE(email_address), CONSTRAINT username_ukey UNIQUE (username) INCLUDE(username))',
	);

	console.log("Groups");
	await client.query(
		'CREATE TABLE IF NOT EXISTS public."groups"(id uuid NOT NULL, admin_id uuid NOT NULL, name character varying(20) COLLATE pg_catalog."default" NOT NULL, profile_photo bytea, created_at timestamp with time zone NOT NULL, is_private boolean NOT NULL, description character varying(200) COLLATE pg_catalog."default" NOT NULL, CONSTRAINT "Groups_pkey" PRIMARY KEY (id), CONSTRAINT admin_id_key FOREIGN KEY (admin_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)',
	);

	console.log("Posts");
	await client.query(
		'CREATE TABLE IF NOT EXISTS public.posts (id uuid NOT NULL, user_id uuid NOT NULL, group_id uuid, title character varying(30) COLLATE pg_catalog."default" NOT NULL, text character varying(200) COLLATE pg_catalog."default" NOT NULL, picture bytea, attachment character varying(200) COLLATE pg_catalog."default", created_at timestamp with time zone NOT NULL, type smallint NOT NULL, CONSTRAINT "Posts_pkey" PRIMARY KEY (id), CONSTRAINT group_id_key FOREIGN KEY (group_id) REFERENCES public."group" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)',
	);

	console.log("Comments table");
	await client.query(
		'CREATE TABLE IF NOT EXISTS public.comments (id uuid NOT NULL, post_id uuid NOT NULL, user_id uuid NOT NULL, text character varying(50) COLLATE pg_catalog."default" NOT NULL, picture bytea, attachment character varying COLLATE pg_catalog."default",   created_at timestamp with time zone NOT NULL, CONSTRAINT "Comments_pkey" PRIMARY KEY (id), CONSTRAINT post_id_key FOREIGN KEY (post_id)       REFERENCES public.posts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_id_key FOREIGN KEY (user_id)     REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)',
	);

	console.log("Likes");
	await client.query('CREATE TABLE IF NOT EXISTS public.likes (id uuid NOT NULL, post_id uuid NOT NULL, user_id uuid NOT NULL, created_at timestamp with time zone NOT NULL, CONSTRAINT "Likes_pkey" PRIMARY KEY (id), CONSTRAINT post_id_key FOREIGN KEY (post_id) REFERENCES public.posts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	console.log("Events");
	await client.query('CREATE TABLE IF NOT EXISTS public.events (post_id uuid NOT NULL, date timestamp with time zone NOT NULL, lat numeric(8,6) NOT NULL, lon numeric(9,6) NOT NULL, CONSTRAINT "Events_pkey" PRIMARY KEY (post_id), CONSTRAINT post_id_key FOREIGN KEY (post_id) REFERENCES public.posts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	console.log("Invitations");
	await client.query('CREATE TABLE IF NOT EXISTS public.invitations (id uuid NOT NULL, from_user_id uuid NOT NULL, to_user_id uuid NOT NULL,CONSTRAINT "Invitation_pkey" PRIMARY KEY (id), CONSTRAINT from_user_id_key FOREIGN KEY (from_user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT to_user_id_key FOREIGN KEY (to_user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	console.log("Contacts");
	await client.query('CREATE TABLE IF NOT EXISTS public.contacts( id uuid NOT NULL, converstion_id uuid NOT NULL, CONSTRAINT "Contacts_pkey" PRIMARY KEY (id))');

	console.log("Conversations");
	await client.query('CREATE TABLE IF NOT EXISTS public.conversations(id uuid NOT NULL, is_group boolean NOT NULL, name character varying(20) COLLATE pg_catalog."default", CONSTRAINT "Conversations_pkey" PRIMARY KEY (id))');

	console.log("Messages");
	await client.query(
		'CREATE TABLE IF NOT EXISTS public.messages (id uuid NOT NULL, conversation_id uuid NOT NULL, text character varying(100) COLLATE pg_catalog."default" NOT NULL, created_at timestamp with time zone NOT NULL, send_by uuid NOT NULL, picture bytea, attachment character varying(200) COLLATE pg_catalog."default", is_delivered boolean NOT NULL, CONSTRAINT "Messages_pkey" PRIMARY KEY (id), CONSTRAINT message_to_conversation_key FOREIGN KEY (conversation_id) REFERENCES public.conversations (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT message_user_key FOREIGN KEY (send_by) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)',
	);

	console.log("Notifications");
	await client.query(
		'CREATE TABLE IF NOT EXISTS public.notifications (id uuid NOT NULL, actor_id uuid NOT NULL, entity_id uuid NOT NULL, entity_type_id smallint NOT NULL, activity smallint NOT NULL, group_id uuid, CONSTRAINT "Notification_pkey" PRIMARY KEY (id), CONSTRAINT actor_id_key FOREIGN KEY (actor_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT entitiy_id_event FOREIGN KEY (entity_id) REFERENCES public.events (post_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT entity_id_invitation FOREIGN KEY (entity_id) REFERENCES public.invitation (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT entity_id_post FOREIGN KEY (entity_id) REFERENCES public.posts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)',
	);

	console.log("Referance tables");

	console.log("groups-notifications");
	await client.query('CREATE TABLE IF NOT EXISTS public.groups_notifications (group_id uuid NOT NULL, notification_id uuid NOT NULL, CONSTRAINT group_id_key FOREIGN KEY (group_id) REFERENCES public."groups" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT notification_id_key FOREIGN KEY (notification_id) REFERENCES public.notification (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	console.log("users_contacts");
	await client.query("CREATE TABLE IF NOT EXISTS public.users_contacts (user_id uuid NOT NULL, contacts_id uuid NOT NULL, CONSTRAINT contacts_to_users_key FOREIGN KEY (contacts_id) REFERENCES public.contacts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID,CONSTRAINT users_to_contacts_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)");

	console.log("users_converstions");
	await client.query("CREATE TABLE IF NOT EXISTS public.users_converstions (user_id uuid, conversation_id uuid, CONSTRAINT converstion_to_user_key FOREIGN KEY (conversation_id) REFERENCES public.conversations (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_to_conversation_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)");

	console.log("users_events");
	await client.query("CREATE TABLE IF NOT EXISTS public.users_events (user_id uuid NOT NULL, event_id uuid NOT NULL, CONSTRAINT event_id_key FOREIGN KEY (event_id) REFERENCES public.events (post_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)");

	console.log("users_groups");
	await client.query('CREATE TABLE IF NOT EXISTS public.users_groups (user_id uuid NOT NULL, group_id uuid NOT NULL, role smallint NOT NULL,CONSTRAINT group_id_key FOREIGN KEY (group_id) REFERENCES public."groups" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID,CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	console.log("users_notifications");
	await client.query("CREATE TABLE IF NOT EXISTS public.users_notification (notification_id uuid NOT NULL, user_id uuid NOT NULL, in_unread boolean NOT NULL, CONSTRAINT notification_id_key FOREIGN KEY (notification_id) REFERENCES public.notification (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)");

	console.log("Tables created");
};

const insertDataToDB = async (client: PoolClient) => {
	let query = "INSERT INTO users (id, username, password, email_address, lastname, firstname, birthday, city, occupation, school, description, profile_photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";
	await client.query(query, [...Object.values(userDBData)]);
	await client.query(query, [...Object.values(user2DBData)]);
	await client.query(query, [...Object.values(user3DBData)]);
	await client.query(query, [...Object.values(user4DBData)]);

	query = "INSERT INTO groups (id, admin_id, name, profile_photo, created_at, is_private, description) VALUES ($1, $2, $3, $4, $5, $6, $7)";
	await client.query(query, [...Object.values(groupDBData)]);
	await client.query(query, [...Object.values(groupDBData2)]);

	query = "INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
	await client.query(query, [...Object.values(postDBData)]);
	await client.query(query, [...Object.values(post2DBData)]);
	for (let i = 0; i < 9; i++) {
		await client.query(query, [uuid(), ...Object.values(postDataNoID)]);
	}

	query = "INSERT INTO comments (id, post_id, user_id, text, picture, attachment, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)";
	await client.query(query, [...Object.values(commentDBData)]);
	await client.query(query, [...Object.values(comment2DBData)]);
	for (let i = 0; i < 10; i++) {
		await client.query(query, [uuid(), ...Object.values(commentDataNoID)]);
	}
	query = "INSERT INTO likes (id, user_id, post_id, created_at) VALUES ($1, $2, $3, $4)";
	await client.query(query, [...Object.values(likeDBData)]);
	await client.query(query, [...Object.values(like2DBData)]);

	await client.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [eventDBData.post.id, eventDBData.post.user_id, eventDBData.post.group_id, eventDBData.post.title, eventDBData.post.text, eventDBData.post.picture, eventDBData.post.attachment, eventDBData.post.created_at, eventDBData.post.type]);
	await client.query("INSERT INTO events (post_id, date, lat, lon) VALUES ($1, $2, $3, $4);", [eventDBData.event.post_id, eventDBData.event.date, eventDBData.event.lat, eventDBData.event.lon]);

	await client.query("INSERT INTO posts (id, user_id, group_id, title, text, picture, attachment, created_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [event2DBData.post.id, event2DBData.post.user_id, event2DBData.post.group_id, event2DBData.post.title, event2DBData.post.text, event2DBData.post.picture, event2DBData.post.attachment, event2DBData.post.created_at, event2DBData.post.type]);
	await client.query("INSERT INTO events (post_id, date, lat, lon) VALUES ($1, $2, $3, $4);", [event2DBData.event.post_id, event2DBData.event.date, event2DBData.event.lat, event2DBData.event.lon]);
	query = "INSERT INTO invitations (id, from_user_id, to_user_id) VALUES ($1, $2, $3)";
	await client.query(query, [...Object.values(invitationDBData)]);
	await client.query(query, [...Object.values(invitation2DBData)]);

	query = "INSERT INTO conversations (id, is_group, name) VALUES ($1, $2, $3)";
	await client.query(query, [...Object.values(conversationDBData)]);
	await client.query(query, [...Object.values(conversation2DBData)]);

	query = "INSERT INTO contacts (id, conversation_id) VALUES ($1, $2)";
	await client.query(query, [...Object.values(contactDBData)]);
	await client.query(query, [...Object.values(contact2DBData)]);

	query = "INSERT INTO messages (id, convesation_id, text, created_at, send_by, is_delivered, picture, attachment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
	await client.query(query, [...Object.values(messageDBData)]);
	await client.query(query, [...Object.values(message2DBData)]);
	for (let i = 0; i < 9; i++) {
		await client.query(query, [uuid(), ...Object.values(messageNoID)]);
	}
	query = "INSERT INTO users_contacts (user_id, contacts_id) VALUES ($1, $2)";
	await client.query(query, [userDBData.id, contactDBData.id]);
	await client.query(query, [user2DBData.id, contactDBData.id]);

	query = "INSERT INTO users_conversations (user_id, convesation_id) VALUES ($1, $2)";
	await client.query(query, [userDBData.id, conversationDBData.id]);
	await client.query(query, [user2DBData.id, conversationDBData.id]);

	query = "INSERT INTO users_events (user_id, event_id) VALUES ($1, $2)";
	await client.query(query, [user2DBData.id, eventDBData.post.id]);
	await client.query(query, [user3DBData.id, eventDBData.post.id]);

	query = "INSER INTO users_groups (user_id, group_id, role) VALUES ($1, $2, 0)";
	await client.query(query, [user2DBData.id, groupDBData.id]);
	await client.query(query, [user3DBData.id, groupDBData.id]);

	console.log("DATA INSERTED INTO DB");
};

(async () => {
	if (process.argv[2] === "dev") {
		const client = await devPool.connect();
		try {
			console.log("Initialize Dev Database...");
			await initPool.query('DROP DATABASE IF EXISTS "devSuperChat"');
			await initPool.query('CREATE DATABASE "devSuperChat" WITH OWNER = postgres ENCODING = "UTF8" TABLESPACE = pg_default CONNECTION LIMIT = -1 IS_TEMPLATE = False;');
			console.log("Database created");
			await client.query("BEGIN;");
			await initiateTables(client);
			await insertDataToDB(client);
			await client.query("COMMIT;");
		} catch (err) {
			console.log(err);
			await client.query("ROLLBACK");
		} finally {
			client.release();
		}
	} else if (process.argv[2] === "test") {
		const client = await testPool.connect();
		try {
			console.log("Initialize Test Database...");
			await initPool.query('DROP DATABASE IF EXISTS "testSuperChat"');
			await initPool.query('CREATE DATABASE "testSuperChat" WITH OWNER = postgres ENCODING = "UTF8" TABLESPACE = pg_default CONNECTION LIMIT = -1 IS_TEMPLATE = False;');
			console.log("Database created");
			await client.query("BEGIN;");
			await initiateTables(client);
			await insertDataToDB(client);
			await client.query("COMMIT;");
		} catch (err) {
			console.log(err);
			await client.query("ROLLBACK");
		} finally {
			client.release();
		}
	}
})();
