import { hashSync } from "bcrypt";
import { IChatEntity } from "../../entities/chat.entity/chat.type";
import { ICommentEntity } from "../../entities/comment.entity/comment.types";
import { IContactEntity } from "../../entities/contact.entity/contact.type";
import { IEventEntity } from "../../entities/event.entity/event.types";
import { IGroupEntity } from "../../entities/group.entity/group.types";
import { IInvitationEntity } from "../../entities/invitation.entity/invitation.type";
import { ILikeEntity } from "../../entities/like.entity/like.type";
import { TPost } from "../../entities/post.entity/post.types";
import { TUser } from "../../entities/user.entity/user.types";
import { convertImg } from "../../tests/user.tests/testingAssets/readFile";
import { IMessageEntity } from "../../entities/message.entity/message.type";

export const DBIds = {
	comment_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	comment2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	contact_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	contact2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	contact3_id: "33fe4952-4c09-4fa5-a5d5-1718fa9513fa",
	chat_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	chat2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	chatGroup_id: "33fe4952-4c09-4fa5-a5d5-1718fa9513fa",
	event_id: "33fe4952-4c09-4fa5-a5d5-1718fa9513fa",
	event2_id: "02e000d5-a0a8-479d-b20a-e0b1293897fd",
	group_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	group2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	invitation_id: "d6781b71-b08f-42d3-b87e-34b37909f42a",
	invitation2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	message_id: "d6781b71-b08f-42d3-b87e-34b37909f42a",
	message2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	post_id: "ab104f91-6ab9-449c-a5da-71b3064fdaa1",
	post2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	user_id: "d6781b71-b08f-42d3-b87e-34b37909f42a",
	user2_id: "9aa6ff40-9c77-4a8f-a925-dff3a0ca9a63",
	user3_id: "cc6bd842-4314-494c-9079-e70fb448e576",
	user4_id: "f81c30a5-aba6-4749-b990-361f54cf5579",
};

export const userDBData: TUser = {
	id: DBIds.user_id,
	username: "testname",
	password: hashSync("testpass", 10),
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

export const user2DBData: TUser = {
	...userDBData,
	id: DBIds.user2_id,
	username: "testname2",
	password: hashSync("testpass2", 10),
	email_address: "email2@gmail.com",
};
export const user3DBData: TUser = {
	...userDBData,
	id: DBIds.user3_id,
	username: "testname3",
	password: hashSync("testpass3", 10),
	email_address: "email3@gmail.com",
};
export const user4DBData: TUser = {
	...userDBData,
	id: DBIds.user4_id,
	username: "testname4",
	password: hashSync("testpass4", 10),
	email_address: "email4@gmail.com",
};

export const groupDBData: IGroupEntity = {
	id: DBIds.group_id,
	admin_id: DBIds.user_id,
	name: "nameOfTheTestGroup",
	profile_photo: undefined,
	created_at: new Date(),
	is_private: true,
	description: "hi, it' a group",
};

export const groupDBData2: IGroupEntity = {
	id: DBIds.group2_id,
	admin_id: DBIds.user_id,
	name: "groupName",
	profile_photo: undefined,
	created_at: new Date("2024-05-20"),
	is_private: true,
	description: "Some Radom users group",
};

export const postDBData: TPost = {
	id: DBIds.post_id,
	user_id: DBIds.user_id,
	group_id: DBIds.group_id,
	title: "posttitle",
	text: "post text",
	picture: undefined,
	attachment: "http://www.google.com",
	created_at: new Date("2024-04-25"),
	type: 0,
};

export const post2DBData: TPost = {
	id: DBIds.post2_id,
	user_id: DBIds.user2_id,
	group_id: DBIds.group_id,
	title: "posttitle",
	text: "post text",
	picture: undefined,
	attachment: "http://www.google.com",
	created_at: new Date("2024-04-25"),
	type: 0,
};

export const postDataNoID: Omit<TPost, "id"> = {
	user_id: DBIds.user_id,
	group_id: DBIds.group_id,
	title: "posttitle",
	text: "post text",
	picture: undefined,
	attachment: "http://www.google.com",
	created_at: new Date("2024-04-25"),
	type: 0,
};

export const commentDBData: ICommentEntity = {
	id: DBIds.comment_id,
	post_id: DBIds.post_id,
	user_id: DBIds.user_id,
	text: "some text",
	picture: undefined,
	attachment: "http://www.someurlorsomethingidk.com",
	created_at: new Date(),
};

export const comment2DBData: ICommentEntity = {
	id: DBIds.comment2_id,
	post_id: DBIds.post_id,
	user_id: DBIds.user_id,
	text: "some text",
	picture: undefined,
	attachment: "http://www.someurlorsomethingidk.com",
	created_at: new Date(),
};

export const commentDataNoID: Omit<ICommentEntity, "id"> = {
	post_id: DBIds.post_id,
	user_id: DBIds.user_id,
	text: "some text",
	picture: undefined,
	attachment: "http://www.someurlorsomethingidk.com",
	created_at: new Date(),
};

export const likeDBData: ILikeEntity = {
	user_id: DBIds.user2_id,
	post_id: DBIds.post_id,
};

export const like2DBData: ILikeEntity = {
	user_id: DBIds.user3_id,
	post_id: DBIds.post_id,
};

export const eventDBData: { post: TPost; event: IEventEntity } = {
	post: {
		id: DBIds.event_id,
		user_id: DBIds.user_id,
		group_id: DBIds.group_id,
		title: "posttitle",
		text: "post text",
		picture: undefined,
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

export const event2DBData: { post: TPost; event: IEventEntity } = {
	post: {
		id: DBIds.event2_id,
		user_id: DBIds.user_id,
		group_id: DBIds.group_id,
		title: "posttitle",
		text: "post text",
		picture: undefined,
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

export const invitationDBData: IInvitationEntity = {
	id: DBIds.invitation_id,
	from_user_id: DBIds.user3_id,
	to_user_id: DBIds.user_id,
};

export const invitation2DBData: IInvitationEntity = {
	id: DBIds.invitation2_id,
	from_user_id: DBIds.user_id,
	to_user_id: DBIds.user4_id,
};

export const contactDBData: IContactEntity = {
	id: DBIds.contact_id,
	chat_id: DBIds.chat_id,
};

export const contact2DBData: IContactEntity = {
	id: DBIds.contact2_id,
	chat_id: DBIds.chat2_id,
};

export const contact3DBData: IContactEntity = {
	id: DBIds.contact3_id,
	chat_id: undefined,
};

export const chatDBData: IChatEntity = {
	id: DBIds.chat_id,
	is_group: false,
	name: "chat1",
};

export const chat2DBData: IChatEntity = {
	id: DBIds.chat2_id,
	is_group: false,
	name: "chat2",
};

export const chatGroupDBData: IChatEntity = {
	id: DBIds.chatGroup_id,
	is_group: true,
	name: "name",
};

export const messageDBData: IMessageEntity = {
	id: DBIds.message_id,
	chat_id: DBIds.chat_id,
	text: "Message text",
	created_at: new Date(),
	send_by: DBIds.user_id,
	is_delivered: false,
	picture: undefined,
	attachment: undefined,
};

export const message2DBData: IMessageEntity = {
	id: DBIds.message2_id,
	chat_id: DBIds.chat_id,
	text: "Message text2",
	created_at: new Date(),
	send_by: DBIds.user2_id,
	is_delivered: false,
	picture: undefined,
	attachment: undefined,
};

export const messageNoID: Omit<IMessageEntity, "id"> = {
	chat_id: DBIds.chat_id,
	text: "auto message",
	created_at: new Date(),
	send_by: DBIds.user_id,
	is_delivered: false,
	picture: undefined,
	attachment: undefined,
};
