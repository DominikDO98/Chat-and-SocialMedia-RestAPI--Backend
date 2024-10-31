import { IChatEntity } from "./chat";

export class ChatEntity implements IChatEntity {
	public id;
	public is_group;
	public name;
	constructor(id: string, isGroup: boolean, name: string | undefined) {
		this.id = id;
		this.is_group = isGroup ? isGroup : false;
		this.name = isGroup && name ? name : undefined;
	}
}
