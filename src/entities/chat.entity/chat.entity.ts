import { v4 as uuid } from "uuid";
import { TChat } from "./chat.type";

export const chatFactory = (newChat: Omit<TChat, "id">): TChat => {
	const chat: TChat = {
		id: uuid(),
		is_group: newChat.is_group ? newChat.is_group : false,
		name: newChat.is_group && newChat.name ? newChat.name : undefined,
	};
	return chat;
};
