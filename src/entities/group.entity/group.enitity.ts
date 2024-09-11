import { v4 as uuid } from "uuid";
import { IGroupEntity } from "./group.types";

export class GroupEnitity implements IGroupEntity {
	public id;
	public admin_id;
	public name?;
	public created_at;
	public is_private?;
	public description;
	public profile_photo?;
	constructor(newGroup: Omit<IGroupEntity, "id" | "created_at">) {
		this.id = uuid();
		this.admin_id = newGroup.admin_id;
		this.name = newGroup.name ? newGroup.name : "Group";
		this.created_at = new Date();
		this.is_private = newGroup.is_private ? newGroup.is_private : true;
		this.description = newGroup.description;
		this.profile_photo = newGroup.profile_photo ? newGroup.profile_photo : undefined;
	}
}
