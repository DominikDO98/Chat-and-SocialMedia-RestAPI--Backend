import { v4 as uuid } from "uuid";
import { IChatEntity } from "./chat.type";

export class ChatEntity implements IChatEntity {
	id;
	is_group;
	name;
	constructor(newChat: Omit<IChatEntity, "id">) {
		this.id = uuid();
		this.is_group = newChat.is_group ? newChat.is_group : false;
		this.name = newChat.is_group && newChat.name ? newChat.name : undefined;
	}
}
