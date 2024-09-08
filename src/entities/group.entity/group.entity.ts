import { v4 as uuid } from "uuid";
import { z } from "zod";
import { TGroup } from "./group.types";

export const GroupSchema = z.object({
	id: z.string().uuid(),
	admin_id: z.string().uuid(),
	name: z.string().min(3).max(20),
	created_at: z.date(),
	is_private: z.boolean(),
	description: z.string().min(3).max(200),
	profile_photo: z.instanceof(Buffer).optional(),
});

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
