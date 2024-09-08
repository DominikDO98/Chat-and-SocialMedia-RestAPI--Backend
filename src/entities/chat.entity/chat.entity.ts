import { v4 as uuid } from "uuid";
import { string, z } from "zod";
import { TChat } from "./chat.type";

export const ChatSchema = z.object({
	id: z.string().uuid(),
	is_group: z.boolean(),
	name: z.string().min(3).max(20).optional(),
});

export const ChatCreationSchema = ChatSchema.omit({
	id: true,
});

export const ChatParticipantsIdsSchema = z.array(string().uuid()).max(10);

export const chatFactory = (newChat: Omit<TChat, "id">): TChat => {
	const chat: TChat = {
		id: uuid(),
		is_group: newChat.is_group ? newChat.is_group : false,
		name: newChat.is_group && newChat.name ? newChat.name : undefined,
	};
	return chat;
};
