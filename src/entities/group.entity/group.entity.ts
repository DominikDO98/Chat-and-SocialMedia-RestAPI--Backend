import { v4 as uuid } from "uuid";
import { GroupEnitiy } from "./group.types";

const groupFactory = (newGroup: Omit<GroupEnitiy, 'id' | 'created_at'>) => {
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