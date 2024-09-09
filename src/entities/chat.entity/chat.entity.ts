import { v4 as uuid } from "uuid";
import { IChat } from "./chat.type";

export class ChatEntity implements IChat {
	id;
	is_group;
	name;
	constructor(newChat: Omit<IChat, "id">) {
		this.id = uuid();
		this.is_group = newChat.is_group ? newChat.is_group : false;
		this.name = newChat.is_group && newChat.name ? newChat.name : undefined;
	}
}
