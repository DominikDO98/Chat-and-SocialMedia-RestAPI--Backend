import { v4 as uuid } from "uuid";
import { MessageEntity } from "./chat.types";

const messageFactory = (newMessage: Omit<MessageEntity, 'id' | 'created_at' | 'is_delivered'>) => {
    const message: MessageEntity = {
        id: uuid(),
        conversaiton_id: newMessage.conversaiton_id,
        text: newMessage.text,
        created_at: new Date().toLocaleString(),
        send_by: newMessage.send_by,
        is_delivered: false,
        picture: newMessage.picture ? newMessage.picture : undefined,
        attachment: newMessage.attachment ? newMessage.attachment : undefined,
    }
    return message
}