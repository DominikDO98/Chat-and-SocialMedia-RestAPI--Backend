import { v4 as uuid } from "uuid";
import { z } from "zod";
import { GroupEnitiy } from "./group.types";

const newGroupSchema = z.object({
    id: z.string().uuid(),
    admin_id: z.string().uuid(),
    name: z.string().min(3).max(20),
    created_at: z.string().datetime(),
    is_private: z.boolean(),
    description: z.string().min(3).max(200),
    profile_photo: z.any(z.instanceof(Blob)).optional(),
})

const groupFactory = (newGroup: Omit<GroupEnitiy, 'id' | 'created_at'>) : GroupEnitiy => {
    const group: GroupEnitiy = {
        id: uuid(),
        admin_id: newGroup.admin_id,
        name: newGroup.name? newGroup.name : 'Group',
        created_at: new Date().toLocaleString(),
        is_private: newGroup.is_private ? newGroup.is_private : true,
        description: newGroup.description,
        profile_photo: newGroup.profile_photo ? newGroup.profile_photo : undefined,
    }
    return group
}