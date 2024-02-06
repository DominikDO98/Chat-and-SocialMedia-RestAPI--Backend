import { v4 as uuid } from "uuid";
import { ConversationEntity } from "./chat.types";

const conversationFactory = (newConversation: Omit <ConversationEntity, 'id'>) : ConversationEntity => {
    const converstion: ConversationEntity = {
        id: uuid(),
        is_group: newConversation.is_group ? newConversation.is_group : false,
        name: newConversation.is_group && newConversation.name ? newConversation.name : undefined
    }
    return converstion
}