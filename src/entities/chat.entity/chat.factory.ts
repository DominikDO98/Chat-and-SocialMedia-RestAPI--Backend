import { v4 as uuid } from "uuid";
import { IChat } from "./chat.type";

// export const chatFactory = (newChat: Omit<IChat, "id">): IChat => {
// 	const chat: IChat = {
// 		id: uuid(),
// 		is_group: newChat.is_group ? newChat.is_group : false,
// 		name: newChat.is_group && newChat.name ? newChat.name : undefined,
// 	};
// 	return chat;
// };

export class ChatEntity implements IChat {
	public id;
	public is_group;
	public name;
	constructor(newChat: Omit<IChat, "id">) {
		this.id = uuid();
		this.is_group = newChat.is_group ? newChat.is_group : false;
		this.name = newChat.is_group && newChat.name ? newChat.name : undefined;
	}
}
