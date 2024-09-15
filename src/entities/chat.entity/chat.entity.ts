import { v4 as uuid } from "uuid";
import { IChatEntity } from "./chat.type";

export class ChatEntity implements IChatEntity {
	public id;
	public is_group;
	public name;
	constructor(newChat: Omit<IChatEntity, "id">) {
		this.id = uuid();
		this.is_group = newChat.is_group ? newChat.is_group : false;
		this.name = newChat.is_group && newChat.name ? newChat.name : undefined;
	}
}
