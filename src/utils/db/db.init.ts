import { Config } from "./db.config";
import { Pool } from "pg";

const initPool = new Pool(Config.initConfig);
const devPool = new Pool(Config.devConfig);
const testPool = new Pool(Config.testConfig);

const initiateDevDB = async () => {
	console.log("Initialize Dev Database...");
	await initPool.query('DROP DATABASE IF EXISTS "devSuperChat"');
	await initPool.query('CREATE DATABASE "devSuperChat" WITH OWNER = postgres ENCODING = "UTF8" TABLESPACE = pg_default CONNECTION LIMIT = -1 IS_TEMPLATE = False;');

	console.log("Tables");

	console.log("Users");
	await devPool.query(
		'CREATE TABLE IF NOT EXISTS public.users (id uuid NOT NULL, username character varying(36) COLLATE pg_catalog."default" NOT NULL, password character varying(72) COLLATE pg_catalog."default" NOT NULL, email_address character varying(320) COLLATE pg_catalog."default" NOT NULL, profile_photo bytea, firstname character varying(20) COLLATE pg_catalog."default", lastname character varying(20) COLLATE pg_catalog."default", birthday timestamp with time zone, country character varying(27) COLLATE pg_catalog."default", city character varying(85) COLLATE pg_catalog."default", occupation character varying(50) COLLATE pg_catalog."default", school character varying(50) COLLATE pg_catalog."default", description character varying(200) COLLATE pg_catalog."default", CONSTRAINT "Users_pkey" PRIMARY KEY (id))',
	);

	console.log("Groups");
	await devPool.query(
		'CREATE TABLE IF NOT EXISTS public."group"(id uuid NOT NULL, admin_id uuid NOT NULL, name character varying(20) COLLATE pg_catalog."default" NOT NULL, profile_photo bytea, created_at timestamp with time zone NOT NULL, is_private boolean NOT NULL, description character varying(200) COLLATE pg_catalog."default" NOT NULL, CONSTRAINT "Group_pkey" PRIMARY KEY (id), CONSTRAINT admin_id_key FOREIGN KEY (admin_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)',
	);

	console.log("Posts");
	await devPool.query(
		'CREATE TABLE IF NOT EXISTS public.posts (id uuid NOT NULL, user_id uuid NOT NULL, group_id uuid, title character varying(30) COLLATE pg_catalog."default" NOT NULL, text character varying(200) COLLATE pg_catalog."default" NOT NULL, picture bytea, attachment character varying(200) COLLATE pg_catalog."default", created_at timestamp with time zone NOT NULL, type smallint NOT NULL, CONSTRAINT "Posts_pkey" PRIMARY KEY (id), CONSTRAINT group_id_key FOREIGN KEY (group_id) REFERENCES public."group" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)',
	);

	console.log("Comments table");
	await devPool.query(
		'CREATE TABLE IF NOT EXISTS public.comments (id uuid NOT NULL, post_id uuid NOT NULL, user_id uuid NOT NULL, text character varying(50) COLLATE pg_catalog."default" NOT NULL, picture bytea, attachment character varying COLLATE pg_catalog."default",   created_at timestamp with time zone NOT NULL, CONSTRAINT "Comments_pkey" PRIMARY KEY (id), CONSTRAINT post_id_key FOREIGN KEY (post_id)       REFERENCES public.posts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_id_key FOREIGN KEY (user_id)     REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)',
	);

	console.log("Likes");
	await devPool.query('CREATE TABLE IF NOT EXISTS public.likes (id uuid NOT NULL, post_id uuid NOT NULL, user_id uuid NOT NULL, created_at timestamp with time zone NOT NULL, CONSTRAINT "Likes_pkey" PRIMARY KEY (id), CONSTRAINT post_id_key FOREIGN KEY (post_id) REFERENCES public.posts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	console.log("Events");
	await devPool.query('CREATE TABLE IF NOT EXISTS public.events (post_id uuid NOT NULL, date timestamp with time zone NOT NULL, lat numeric(8,6) NOT NULL, lon numeric(9,6) NOT NULL, CONSTRAINT "Events_pkey" PRIMARY KEY (post_id), CONSTRAINT post_id_key FOREIGN KEY (post_id) REFERENCES public.posts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	console.log("Invitation");
	await devPool.query('CREATE TABLE IF NOT EXISTS public.invitation (id uuid NOT NULL, from_user_id uuid NOT NULL, to_user_id uuid NOT NULL,CONSTRAINT "Invitation_pkey" PRIMARY KEY (id), CONSTRAINT from_user_id_key FOREIGN KEY (from_user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT to_user_id_key FOREIGN KEY (to_user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	console.log("Conversation");
	await devPool.query('CREATE TABLE IF NOT EXISTS public.conversations(id uuid NOT NULL, is_group boolean NOT NULL, name character varying(20) COLLATE pg_catalog."default", CONSTRAINT "Conversations_pkey" PRIMARY KEY (id))');

	console.log("Messages");
	await devPool.query(
		'CREATE TABLE IF NOT EXISTS public.messages (id uuid NOT NULL, conversation_id uuid NOT NULL, text character varying(100) COLLATE pg_catalog."default" NOT NULL, created_at timestamp with time zone NOT NULL, send_by uuid NOT NULL, picture bytea, attachment character varying(200) COLLATE pg_catalog."default", is_delivered boolean NOT NULL, CONSTRAINT "Messages_pkey" PRIMARY KEY (id), CONSTRAINT message_to_conversation_key FOREIGN KEY (conversation_id) REFERENCES public.conversations (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT message_user_key FOREIGN KEY (send_by) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)',
	);

	console.log("Contacts");
	await devPool.query('CREATE TABLE IF NOT EXISTS public.contacts( id uuid NOT NULL, converstion_id uuid NOT NULL, CONSTRAINT "Contacts_pkey" PRIMARY KEY (id))');

	console.log("Notifications");
	await devPool.query(
		'CREATE TABLE IF NOT EXISTS public.notification (id uuid NOT NULL, actor_id uuid NOT NULL, entity_id uuid NOT NULL, entity_type_id smallint NOT NULL, activity smallint NOT NULL, group_id uuid, CONSTRAINT "Notification_pkey" PRIMARY KEY (id), CONSTRAINT actor_id_key FOREIGN KEY (actor_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT entitiy_id_event FOREIGN KEY (entity_id) REFERENCES public.events (post_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT entity_id_invitation FOREIGN KEY (entity_id) REFERENCES public.invitation (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT entity_id_post FOREIGN KEY (entity_id) REFERENCES public.posts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)',
	);

	console.log("Referance tables");

	console.log("group-notification");
	await devPool.query('CREATE TABLE IF NOT EXISTS public.group_notification (group_id uuid NOT NULL, notification_id uuid NOT NULL, CONSTRAINT group_id_key FOREIGN KEY (group_id) REFERENCES public."group" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT notification_id_key FOREIGN KEY (notification_id) REFERENCES public.notification (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	console.log("user_contacts");
	await devPool.query("CREATE TABLE IF NOT EXISTS public.users_contacts (user_id uuid NOT NULL, contacts_id uuid NOT NULL, CONSTRAINT contacts_to_users_key FOREIGN KEY (contacts_id) REFERENCES public.contacts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID,CONSTRAINT users_to_contacts_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)");

	console.log("users_converstions");
	await devPool.query("CREATE TABLE IF NOT EXISTS public.users_converstions (user_id uuid, conversation_id uuid, CONSTRAINT converstion_to_user_key FOREIGN KEY (conversation_id) REFERENCES public.conversations (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_to_conversation_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)");

	console.log("users_event");
	await devPool.query("CREATE TABLE IF NOT EXISTS public.users_event (user_id uuid NOT NULL, event_id uuid NOT NULL, CONSTRAINT event_id_key FOREIGN KEY (event_id) REFERENCES public.events (post_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)");

	console.log("users_group");
	await devPool.query('CREATE TABLE IF NOT EXISTS public.users_group (user_id uuid NOT NULL, group_id uuid NOT NULL, role smallint NOT NULL,CONSTRAINT group_id_key FOREIGN KEY (group_id) REFERENCES public."group" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID,CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	console.log("users_notification");
	await devPool.query("CREATE TABLE IF NOT EXISTS public.users_notification (notification_id uuid NOT NULL, user_id uuid NOT NULL, in_unread boolean NOT NULL, CONSTRAINT notification_id_key FOREIGN KEY (notification_id) REFERENCES public.notification (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)");
};

export const initiateTestDB = async () => {
	console.log("Initialize Test Database...");
	await initPool.query('DROP DATABASE IF EXISTS "testSuperChat"');
	await initPool.query('CREATE DATABASE "testSuperChat" WITH OWNER = postgres ENCODING = "UTF8" TABLESPACE = pg_default CONNECTION LIMIT = -1 IS_TEMPLATE = False;');

	await testPool.query(
		'CREATE TABLE IF NOT EXISTS public.users (id uuid NOT NULL, username character varying(36) COLLATE pg_catalog."default" NOT NULL, password character varying(72) COLLATE pg_catalog."default" NOT NULL, email_address character varying(320) COLLATE pg_catalog."default" NOT NULL, profile_photo bytea, firstname character varying(20) COLLATE pg_catalog."default", lastname character varying(20) COLLATE pg_catalog."default", birthday timestamp with time zone, country character varying(27) COLLATE pg_catalog."default", city character varying(85) COLLATE pg_catalog."default", occupation character varying(50) COLLATE pg_catalog."default", school character varying(50) COLLATE pg_catalog."default", description character varying(200) COLLATE pg_catalog."default", CONSTRAINT "Users_pkey" PRIMARY KEY (id))',
	);

	await testPool.query(
		'CREATE TABLE IF NOT EXISTS public."group"(id uuid NOT NULL, admin_id uuid NOT NULL, name character varying(20) COLLATE pg_catalog."default" NOT NULL, profile_photo bytea, created_at timestamp with time zone NOT NULL, is_private boolean NOT NULL, description character varying(200) COLLATE pg_catalog."default" NOT NULL, CONSTRAINT "Group_pkey" PRIMARY KEY (id), CONSTRAINT admin_id_key FOREIGN KEY (admin_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)',
	);

	await testPool.query(
		'CREATE TABLE IF NOT EXISTS public.posts (id uuid NOT NULL, user_id uuid NOT NULL, group_id uuid, title character varying(30) COLLATE pg_catalog."default" NOT NULL, text character varying(200) COLLATE pg_catalog."default" NOT NULL, picture bytea, attachment character varying(200) COLLATE pg_catalog."default", created_at timestamp with time zone NOT NULL, type smallint NOT NULL, CONSTRAINT "Posts_pkey" PRIMARY KEY (id), CONSTRAINT group_id_key FOREIGN KEY (group_id) REFERENCES public."group" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)',
	);

	await testPool.query(
		'CREATE TABLE IF NOT EXISTS public.comments (id uuid NOT NULL, post_id uuid NOT NULL, user_id uuid NOT NULL, text character varying(50) COLLATE pg_catalog."default" NOT NULL, picture bytea, attachment character varying COLLATE pg_catalog."default",   created_at timestamp with time zone NOT NULL, CONSTRAINT "Comments_pkey" PRIMARY KEY (id), CONSTRAINT post_id_key FOREIGN KEY (post_id)       REFERENCES public.posts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_id_key FOREIGN KEY (user_id)     REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)',
	);

	await testPool.query('CREATE TABLE IF NOT EXISTS public.likes (id uuid NOT NULL, post_id uuid NOT NULL, user_id uuid NOT NULL, created_at timestamp with time zone NOT NULL, CONSTRAINT "Likes_pkey" PRIMARY KEY (id), CONSTRAINT post_id_key FOREIGN KEY (post_id) REFERENCES public.posts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	await testPool.query('CREATE TABLE IF NOT EXISTS public.events (post_id uuid NOT NULL, date timestamp with time zone NOT NULL, lat numeric(8,6) NOT NULL, lon numeric(9,6) NOT NULL, CONSTRAINT "Events_pkey" PRIMARY KEY (post_id), CONSTRAINT post_id_key FOREIGN KEY (post_id) REFERENCES public.posts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	await testPool.query('CREATE TABLE IF NOT EXISTS public.invitation (id uuid NOT NULL, from_user_id uuid NOT NULL, to_user_id uuid NOT NULL,CONSTRAINT "Invitation_pkey" PRIMARY KEY (id), CONSTRAINT from_user_id_key FOREIGN KEY (from_user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT to_user_id_key FOREIGN KEY (to_user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');
	await testPool.query('CREATE TABLE IF NOT EXISTS public.conversations(id uuid NOT NULL, is_group boolean NOT NULL, name character varying(20) COLLATE pg_catalog."default", CONSTRAINT "Conversations_pkey" PRIMARY KEY (id))');

	await testPool.query(
		'CREATE TABLE IF NOT EXISTS public.messages (id uuid NOT NULL, conversation_id uuid NOT NULL, text character varying(100) COLLATE pg_catalog."default" NOT NULL, created_at timestamp with time zone NOT NULL, send_by uuid NOT NULL, picture bytea, attachment character varying(200) COLLATE pg_catalog."default", is_delivered boolean NOT NULL, CONSTRAINT "Messages_pkey" PRIMARY KEY (id), CONSTRAINT message_to_conversation_key FOREIGN KEY (conversation_id) REFERENCES public.conversations (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT message_user_key FOREIGN KEY (send_by) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)',
	);

	await testPool.query('CREATE TABLE IF NOT EXISTS public.contacts( id uuid NOT NULL, converstion_id uuid NOT NULL, CONSTRAINT "Contacts_pkey" PRIMARY KEY (id))');

	await testPool.query(
		'CREATE TABLE IF NOT EXISTS public.notification (id uuid NOT NULL, actor_id uuid NOT NULL, entity_id uuid NOT NULL, entity_type_id smallint NOT NULL, activity smallint NOT NULL, group_id uuid, CONSTRAINT "Notification_pkey" PRIMARY KEY (id), CONSTRAINT actor_id_key FOREIGN KEY (actor_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT entitiy_id_event FOREIGN KEY (entity_id) REFERENCES public.events (post_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT entity_id_invitation FOREIGN KEY (entity_id) REFERENCES public.invitation (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT entity_id_post FOREIGN KEY (entity_id) REFERENCES public.posts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)',
	);

	await testPool.query('CREATE TABLE IF NOT EXISTS public.group_notification (group_id uuid NOT NULL, notification_id uuid NOT NULL, CONSTRAINT group_id_key FOREIGN KEY (group_id) REFERENCES public."group" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT notification_id_key FOREIGN KEY (notification_id) REFERENCES public.notification (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	await testPool.query("CREATE TABLE IF NOT EXISTS public.users_contacts (user_id uuid NOT NULL, contacts_id uuid NOT NULL, CONSTRAINT contacts_to_users_key FOREIGN KEY (contacts_id) REFERENCES public.contacts (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID,CONSTRAINT users_to_contacts_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)");

	await testPool.query("CREATE TABLE IF NOT EXISTS public.users_converstions (user_id uuid, conversation_id uuid, CONSTRAINT converstion_to_user_key FOREIGN KEY (conversation_id) REFERENCES public.conversations (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_to_conversation_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)");

	await testPool.query("CREATE TABLE IF NOT EXISTS public.users_event (user_id uuid NOT NULL, event_id uuid NOT NULL, CONSTRAINT event_id_key FOREIGN KEY (event_id) REFERENCES public.events (post_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID, CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)");

	await testPool.query('CREATE TABLE IF NOT EXISTS public.users_group (user_id uuid NOT NULL, group_id uuid NOT NULL, role smallint NOT NULL,CONSTRAINT group_id_key FOREIGN KEY (group_id) REFERENCES public."group" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID,CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION NOT VALID)');

	await testPool.query("CREATE TABLE IF NOT EXISTS public.users_notification (notification_id uuid NOT NULL, user_id uuid NOT NULL, in_unread boolean NOT NULL, CONSTRAINT notification_id_key FOREIGN KEY (notification_id) REFERENCES public.notification (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT user_id_key FOREIGN KEY (user_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION)");
};
if (process.env.NODE_ENV !== "test") {
	initiateDevDB();
}
