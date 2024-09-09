import { v4 as uuid } from "uuid";
import { TGroup } from "./group.types";

export const groupFactory = (newGroup: Omit<TGroup, "id" | "created_at">): TGroup => {
	const group: TGroup = {
		id: uuid(),
		admin_id: newGroup.admin_id,
		name: newGroup.name ? newGroup.name : "Group",
		created_at: new Date(),
		is_private: newGroup.is_private ? newGroup.is_private : true,
		description: newGroup.description,
		profile_photo: newGroup.profile_photo ? newGroup.profile_photo : undefined,
	};
	return group;
};
