import { v4 as uuid } from 'uuid';
import { ZodError, ZodIssue } from "zod";
import { MessageEntity } from '../../src/entities/chat.entity/chat.types';

describe('chat', () => {
    describe('message entity', () => {
        const newMessage: Omit<MessageEntity, 'id' | 'created_at' | 'is_delivered'> = {
            conversaiton_id: newMessage.conversaiton_id,
            text: newMessage.text,
            send_by: newMessage.send_by,
            picture: newMessage.picture ? newMessage.picture : undefined,
            attachment: newMessage.attachment ? newMessage.attachment : undefined,
        }
    })
})