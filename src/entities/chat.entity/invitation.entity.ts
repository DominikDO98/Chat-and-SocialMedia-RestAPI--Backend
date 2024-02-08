import { v4 as uuid } from "uuid";
import { z } from "zod";
import { InvitationEntity } from "./chat.types";

const newInvitationSchema = z.object({
    id: z.string().uuid(),
    from_user_id: z.string().uuid(),
    to_user_id: z.string().uuid(),
})

const invitationFactory = (newInvitation: Omit<InvitationEntity, 'id'>) : InvitationEntity => {
    const invitation: InvitationEntity = {
        id: uuid(),
        from_user_id: newInvitation.from_user_id,
        to_user_id: newInvitation.to_user_id,
    }
    return invitation
}