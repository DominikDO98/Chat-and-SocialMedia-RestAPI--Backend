import { v4 as uuid } from "uuid";
import { ZodError, ZodIssue } from "zod";
import { ContactEntity, ConversationEntity, InvitationEntity, MessageEntity } from "../../entities/chat.entity/chat.types";
import { messageFactory, MessageSchema } from "../../entities/chat.entity/message.entity";
import { invitationFactory, InvitationSchema } from "../../entities/chat.entity/invitation.entity";
import { conversationFactory, ConversationSchema } from "../../entities/chat.entity/conversation.entity";
import { contactFactory, ContactSchema } from "../../entities/chat.entity/contact.entity";

describe("chat", () => {
	describe("message entity", () => {
		const newMessage: Omit<MessageEntity, "id" | "created_at" | "is_delivered"> = {
			conversaiton_id: uuid(),
			text: "message",
			send_by: uuid(),
			picture: new Blob(),
			attachment: "link.com",
		};
		const newPlainMessage: Omit<MessageEntity, "id" | "created_at" | "is_delivered"> = {
			conversaiton_id: uuid(),
			text: "message",
			send_by: uuid(),
			picture: undefined,
			attachment: undefined,
		};
		test("messageFactory create correct instance of the message object", () => {
			const message = messageFactory(newMessage);
			const plainMessage = messageFactory(newPlainMessage);

			expect(message.id).toBeDefined();
			expect(message.created_at).toBeInstanceOf(Date);
			expect(message.is_delivered).toStrictEqual(false);
			expect(message.picture).toBeInstanceOf(Blob);
			expect(message.picture).toStrictEqual(newMessage.picture);
			expect(message.attachment).toStrictEqual(newMessage.attachment);

			expect(plainMessage.id).toBeDefined();
			expect(plainMessage.created_at).toBeInstanceOf(Date);
			expect(plainMessage.is_delivered).toStrictEqual(false);
			expect(plainMessage.picture).toBeUndefined();
			expect(plainMessage.attachment).toBeUndefined();
		});
		test("newMessageSchema correctly parses message object", () => {
			const message = messageFactory(newMessage);
			const plainMessage = messageFactory(newPlainMessage);

			const parsedMessage = MessageSchema.parse(message);
			const parsedPlainMessage = MessageSchema.parse(plainMessage);

			expect(parsedMessage.id).toStrictEqual(message.id);
			expect(parsedMessage.conversaiton_id).toStrictEqual(message.conversaiton_id);
			expect(parsedMessage.text).toStrictEqual(message.text);
			expect(parsedMessage.created_at).toBeInstanceOf(Date);
			expect(parsedMessage.created_at).toStrictEqual(message.created_at);
			expect(parsedMessage.send_by).toStrictEqual(message.send_by);
			expect(parsedMessage.is_delivered).toStrictEqual(message.is_delivered);
			expect(parsedMessage.picture).toBeInstanceOf(Blob);
			expect(parsedMessage.picture).toStrictEqual(message.picture);
			expect(parsedMessage.attachment).toStrictEqual(message.attachment);

			expect(parsedPlainMessage.id).toStrictEqual(plainMessage.id);
			expect(parsedPlainMessage.conversaiton_id).toStrictEqual(plainMessage.conversaiton_id);
			expect(parsedPlainMessage.text).toStrictEqual(plainMessage.text);
			expect(parsedPlainMessage.created_at).toBeInstanceOf(Date);
			expect(parsedPlainMessage.created_at).toStrictEqual(plainMessage.created_at);
			expect(parsedPlainMessage.send_by).toStrictEqual(plainMessage.send_by);
			expect(parsedPlainMessage.is_delivered).toStrictEqual(plainMessage.is_delivered);
			expect(parsedPlainMessage.picture).toBeUndefined();
			expect(parsedPlainMessage.attachment).toBeUndefined();
		});
		test("newMessageSchema throws error when wrong message data is being parsed", () => {
			const wrongMessage = {
				conversaiton_id: "not uuid",
				text: 1,
				created_at: null,
				send_by: "not exacly a uuid",
				is_delivered: "no",
				picture: {},
				attachment: 3,
			};
			const throwZodError = () => {
				try {
					MessageSchema.parse(wrongMessage);
				} catch (err) {
					throw new ZodError(err as ZodIssue[]);
				}
			};
			expect(throwZodError).toThrow(ZodError);

			expect(throwZodError).toThrow("id");
			expect(throwZodError).toThrow("conversaiton_id");
			expect(throwZodError).toThrow("text");
			expect(throwZodError).toThrow("created_at");
			expect(throwZodError).toThrow("send_by");
			expect(throwZodError).toThrow("is_delivered");
			expect(throwZodError).toThrow("picture");
			expect(throwZodError).toThrow("attachment");

			expect(throwZodError).toThrow("Required");
			expect(throwZodError).toThrow("Invalid uuid");
			expect(throwZodError).toThrow("Expected boolean, received string");
			expect(throwZodError).toThrow("Input not instance of Blob");
			expect(throwZodError).toThrow("Expected string, received number");
			expect(throwZodError).toThrow("Expected date, received null");
		});
	});
	describe("invitation entity", () => {
		const newInvitation: Omit<InvitationEntity, "id"> = {
			from_user_id: uuid(),
			to_user_id: uuid(),
		};
		test("invitationFactory create correct instance of the invitation object", () => {
			const invitation = invitationFactory(newInvitation);

			expect(invitation.id).toBeDefined();
			expect(invitation.from_user_id).toStrictEqual(newInvitation.from_user_id);
			expect(invitation.to_user_id).toStrictEqual(newInvitation.to_user_id);
		});
		test("newInvitationSchema correctly parses invitation object", () => {
			const invitation = invitationFactory(newInvitation);

			const parsedInvitation = InvitationSchema.parse(invitation);

			expect(parsedInvitation.id).toBeDefined();
			expect(parsedInvitation.from_user_id).toStrictEqual(invitation.from_user_id);
			expect(parsedInvitation.to_user_id).toStrictEqual(invitation.to_user_id);
		});
		test("newInvitationSchema throws error when wrong invitation data is being parsed", () => {
			const wrongInvitation: Omit<InvitationEntity, "id"> = {
				from_user_id: "not uuid",
				to_user_id: "not uuid, too",
			};
			const throwZodError = () => {
				try {
					InvitationSchema.parse(wrongInvitation);
				} catch (err) {
					throw new ZodError(err as ZodIssue[]);
				}
			};
			expect(throwZodError).toThrow(ZodError);

			expect(throwZodError).toThrow("id");
			expect(throwZodError).toThrow("from_user_id");
			expect(throwZodError).toThrow("to_user_id");

			expect(throwZodError).toThrow("Required");
			expect(throwZodError).toThrow("Invalid uuid");
		});
	});
	describe("conversation entity", () => {
		const newConversation: Omit<ConversationEntity, "id"> = {
			is_group: true,
			name: "Name",
		};
		const newPlainConversation = {
			is_group: false,
			name: undefined,
		};
		test("conversationFactory create correct instance of the conversation object", () => {
			const conversation = conversationFactory(newConversation);
			const plainConversation = conversationFactory(newPlainConversation);

			expect(conversation.id).toBeDefined();
			expect(conversation.is_group).toStrictEqual(true);
			expect(conversation.name).toStrictEqual(newConversation.name);

			expect(plainConversation.id).toBeDefined();
			expect(plainConversation.is_group).toStrictEqual(false);
			expect(plainConversation.name).toStrictEqual(newPlainConversation.name);
		});
		test("newConversationSchema correctly parses conversation object", () => {
			const conversation = conversationFactory(newConversation);
			const plainConversation = conversationFactory(newPlainConversation);

			const parsedConversation = ConversationSchema.parse(conversation);
			const parsedPlainConversation = ConversationSchema.parse(plainConversation);

			expect(parsedConversation.id).toStrictEqual(conversation.id);
			expect(parsedConversation.is_group).toStrictEqual(true);
			expect(parsedConversation.name).toStrictEqual(conversation.name);

			expect(parsedPlainConversation.id).toStrictEqual(plainConversation.id);
			expect(parsedPlainConversation.is_group).toStrictEqual(false);
			expect(parsedPlainConversation.name).toStrictEqual(plainConversation.name);
		});
		test("newConversationSchema throws error when wrong conversation data is being parsed", () => {
			const wrongConversation = {
				is_group: 1,
				name: 1,
			};
			const throwZodError = () => {
				try {
					ConversationSchema.parse(wrongConversation);
				} catch (err) {
					throw new ZodError(err as ZodIssue[]);
				}
			};
			expect(throwZodError).toThrow(ZodError);

			expect(throwZodError).toThrow("id");
			expect(throwZodError).toThrow("is_group");
			expect(throwZodError).toThrow("name");

			expect(throwZodError).toThrow("Required");
			expect(throwZodError).toThrow("Expected boolean, received number");
			expect(throwZodError).toThrow("Expected string, received number");
		});
	});
	describe("contact entity", () => {
		const newContact: Omit<ContactEntity, "id"> = {
			converation_id: uuid(),
		};
		test("contactFactory create correct instance of the contact object", () => {
			const contact = contactFactory(newContact);

			expect(contact.id).toBeDefined();
			expect(contact.converation_id).toStrictEqual(newContact.converation_id);
		});
		test("newContactSchema correctly parses contact object", () => {
			const contact = contactFactory(newContact);

			const parsedContact = ContactSchema.parse(contact);

			expect(parsedContact.id).toStrictEqual(contact.id);
			expect(parsedContact.converation_id).toStrictEqual(contact.converation_id);
		});
	});
});
