import { ContactEntity, ConversationEntity, InvitationEntity, MessageEntity } from "../../entities/chat.entity/chat.types";
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
	user2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	user3_id: "cc6bd842-4314-494c-9079-e70fb448e576",
	user4_id: "f81c30a5-aba6-4749-b990-361f54cf5579",
};

export const userDBData: UserEntity = {
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

export const user2DBData: UserEntity = {
	...userDBData,
	id: DBIds.user2_id,
	username: "testname2",
	password: "testpass2",
	email_address: "email2@gmail.com",
};
export const user3DBData: UserEntity = {
	...userDBData,
	id: DBIds.user3_id,
	username: "testname3",
	password: "testpass3",
	email_address: "email3@gmail.com",
};
export const user4DBData: UserEntity = {
	...userDBData,
	id: DBIds.user4_id,
	username: "testname4",
	password: "testpass4",
	email_address: "email4@gmail.com",
};

export const groupDBData: GroupEntity = {
	id: DBIds.group_id,
	admin_id: DBIds.user_id,
	name: "nameOfTheTestGroup",
	profile_photo: convertImg(),
	created_at: new Date(),
	is_private: true,
	description: "hi, it' a group",
};

export const groupDBData2: GroupEntity = {
	id: DBIds.group2_id,
	admin_id: DBIds.user_id,
	name: "groupName",
	created_at: new Date("2024-05-20"),
	is_private: true,
	description: "Some Radom users group",
	profile_photo: convertImg(),
};

export const postDBData: PostEntity = {
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

export const post2DBData: PostEntity = {
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

export const commentDBData: CommentEntity = {
	id: DBIds.comment_id,
	post_id: DBIds.post_id,
	user_id: DBIds.user_id,
	text: "some text",
	picture: convertImg(),
	attachment: "http://www.someurlorsomethingidk.com",
	created_at: new Date(),
};

export const comment2DBData: CommentEntity = {
	id: DBIds.comment2_id,
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

export const likeDBData: LikeEntity = {
	id: DBIds.like_id,
	user_id: DBIds.user_id,
	post_id: DBIds.post_id,
	created_at: new Date(),
};

export const like2DBData: LikeEntity = {
	id: DBIds.like2_id,
	user_id: DBIds.user_id,
	post_id: DBIds.post_id,
	created_at: new Date(),
};

export const eventDBData: EventCreationEntity = {
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

export const event2DBData: EventCreationEntity = {
	post: {
		id: DBIds.event2_id,
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
		post_id: DBIds.event2_id,
		date: new Date(),
		lat: 11.111111,
		lon: 11.111111,
	},
};

export const invitationDBData: InvitationEntity = {
	id: DBIds.invitation_id,
	from_user_id: DBIds.user_id,
	to_user_id: DBIds.user3_id,
};

export const invitation2DBData: InvitationEntity = {
	id: DBIds.invitation2_id,
	from_user_id: DBIds.user2_id,
	to_user_id: DBIds.user4_id,
};

export const contactDBData: ContactEntity = {
	id: DBIds.contact_id,
	converation_id: DBIds.conversation_id,
};

export const contact2DBData: ContactEntity = {
	id: DBIds.contact2_id,
	converation_id: DBIds.conversation2_id,
};

export const conversationDBData: ConversationEntity = {
	id: DBIds.conversation_id,
	is_group: false,
	name: "conversation1",
};

export const conversation2DBData: ConversationEntity = {
	id: DBIds.conversation2_id,
	is_group: false,
	name: "conversation2",
};

export const messageDBData: MessageEntity = {
	id: DBIds.message_id,
	conversaiton_id: DBIds.conversation_id,
	text: "Message text",
	created_at: new Date(),
	send_by: DBIds.user_id,
	is_delivered: false,
	picture: undefined,
	attachment: undefined,
};

export const message2DBData: MessageEntity = {
	id: DBIds.message2_id,
	conversaiton_id: DBIds.conversation_id,
	text: "Message text2",
	created_at: new Date(),
	send_by: DBIds.user2_id,
	is_delivered: false,
	picture: undefined,
	attachment: undefined,
};

export const messageNoID: Omit<MessageEntity, "id"> = {
	conversaiton_id: DBIds.conversation_id,
	text: "auto message",
	created_at: new Date(),
	send_by: DBIds.user_id,
	is_delivered: false,
	picture: undefined,
	attachment: undefined,
};
