import { v4 as uuid } from "uuid";
import { z } from "zod";
import { MessageEntity } from "./chat.types";

export const newMessageSchema = z.object({
    id: z.string().uuid(),
    conversaiton_id: z.string().uuid(),
    text: z.string().max(100),
    created_at: z.date(),
    send_by: z.string().uuid(),
    is_delivered: z.boolean(),
    picture: z.instanceof(Blob).optional(),
    attachment: z.string().min(3).max(200).optional(),
})

export const messageFactory = (newMessage: Omit<MessageEntity, 'id' | 'created_at' | 'is_delivered'>) : MessageEntity => {
    const message: MessageEntity = {
        id: uuid(),
        conversaiton_id: newMessage.conversaiton_id,
        text: newMessage.text,
        created_at: new Date(),
        send_by: newMessage.send_by,
        is_delivered: false,
        picture: newMessage.picture ? newMessage.picture : undefined,
        attachment: newMessage.attachment ? newMessage.attachment : undefined,
    }
    return message
}