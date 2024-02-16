import { v4 as uuid } from 'uuid';
import { ZodError, ZodIssue } from "zod";
import { MessageEntity } from '../../src/entities/chat.entity/chat.types';
import { messageFactory, newMessageSchema } from '../../src/entities/chat.entity/message.entity';

describe('chat', () => {
    describe('message entity', () => {
        const newMessage: Omit<MessageEntity, 'id' | 'created_at' | 'is_delivered'> = {
            conversaiton_id: uuid(),
            text: 'message',
            send_by: uuid(),
            picture: new Blob(),
            attachment: 'link.com'
        }
        const newPlainMessage: Omit<MessageEntity, 'id' | 'created_at' | 'is_delivered'> = {
            conversaiton_id: uuid(),
            text: 'message',
            send_by: uuid(),
            picture: undefined,
            attachment: undefined,
        }
        test('messageFactory create correct instance of the message object', () => {
            const message = messageFactory(newMessage);
            const plainMessage = messageFactory(newPlainMessage);

            expect(message.id).toBeDefined();
            expect(message.created_at).toBeInstanceOf(Date);
            expect(message.is_delivered).toStrictEqual(false);
            expect(message.picture).toBeInstanceOf(Blob);
            expect(message.picture).toStrictEqual(newMessage.picture);
            expect(message.attachment).toStrictEqual(newMessage.attachment);

            expect(plainMessage.id).toBeDefined();
            expect(plainMessage.created_at).toBeInstanceOf(Date);
            expect(plainMessage.is_delivered).toStrictEqual(false);
            expect(plainMessage.picture).toBeUndefined();
            expect(plainMessage.attachment).toBeUndefined();
        })
        test('newMessageSchema correctly parses message object', () => {
            const message = messageFactory(newMessage);
            const plainMessage = messageFactory(newPlainMessage);

            const parsedMessage = newMessageSchema.parse(message);
            const parsedPlainMessage = newMessageSchema.parse(plainMessage);

            expect(parsedMessage.id).toStrictEqual(message.id);
            expect(parsedMessage.conversaiton_id).toStrictEqual(message.conversaiton_id)
            expect(parsedMessage.text).toStrictEqual(message.text);
            expect(parsedMessage.created_at).toBeInstanceOf(Date);
            expect(parsedMessage.created_at).toStrictEqual(message.created_at);
            expect(parsedMessage.send_by).toStrictEqual(message.send_by);
            expect(parsedMessage.is_delivered).toStrictEqual(message.is_delivered);
            expect(parsedMessage.picture).toBeInstanceOf(Blob)
            expect(parsedMessage.picture).toStrictEqual(message.picture);
            expect(parsedMessage.attachment).toStrictEqual(message.attachment);

            expect(parsedPlainMessage.id).toStrictEqual(plainMessage.id);
            expect(parsedPlainMessage.conversaiton_id).toStrictEqual(plainMessage.conversaiton_id)
            expect(parsedPlainMessage.text).toStrictEqual(plainMessage.text);
            expect(parsedPlainMessage.created_at).toBeInstanceOf(Date);
            expect(parsedPlainMessage.created_at).toStrictEqual(plainMessage.created_at);
            expect(parsedPlainMessage.send_by).toStrictEqual(plainMessage.send_by);
            expect(parsedPlainMessage.is_delivered).toStrictEqual(plainMessage.is_delivered);
            expect(parsedPlainMessage.picture).toBeUndefined();
            expect(parsedPlainMessage.attachment).toBeUndefined();
        })
        test('newMessageSchema throws error when wrong message data is being parsed', () => {
            const wrongMessage = {
                conversaiton_id: 'not uuid',
                text: 1,
                created_at: null,
                send_by: 'not exacly a uuid',
                is_delivered: 'no',
                picture: {},
                attachment: 3,
            }
            const throwZodError = () => {
                try {
                    newMessageSchema.parse(wrongMessage)
                } catch (err) {    
                    throw new ZodError(err as ZodIssue[])
                }
            }
            expect(throwZodError).toThrow(ZodError);

            expect(throwZodError).toThrow('id');
            expect(throwZodError).toThrow('conversaiton_id');
            expect(throwZodError).toThrow('text');
            expect(throwZodError).toThrow('created_at');
            expect(throwZodError).toThrow('send_by');
            expect(throwZodError).toThrow('is_delivered');
            expect(throwZodError).toThrow('picture');
            expect(throwZodError).toThrow('attachment');

            expect(throwZodError).toThrow('Required');
            expect(throwZodError).toThrow('Invalid uuid');
            expect(throwZodError).toThrow('Expected boolean, received string');
            expect(throwZodError).toThrow('Input not instance of Blob');                       
            expect(throwZodError).toThrow('Expected string, received number');
            expect(throwZodError).toThrow("Expected date, received null");
        })
    })
})