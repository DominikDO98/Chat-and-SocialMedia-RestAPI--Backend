import { v4 as uuid } from "uuid";
import { InvitationEntity } from "./chat.types";

const invitationFactory = (newInvitation: Omit<InvitationEntity, 'id'>) => {
    const invitation: InvitationEntity = {
        id: uuid(),
        from_user_id: newInvitation.from_user_id,
        to_user_id: newInvitation.to_user_id,
    }
    return invitation
}