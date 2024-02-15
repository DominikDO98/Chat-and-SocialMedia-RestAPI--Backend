import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue, ZodIssueCode } from "zod";
import { newUserSchema, userFactory } from "../../src/entities/user.entity/user.entity";
import { NewUserEnitity } from "../../src/entities/user.entity/user.types";
import { handleError } from "../../src/middleware/errorHandler";
import { CommentEntity, EventEntity, LikeEntity, PostEntity } from "../../src/entities/post.entity/post.types";
import {v4 as uuid} from 'uuid';
import { newPostSchema, postFactory } from "../../src/entities/post.entity/post.entity";
import { likeFactory, newLikeSchema } from "../../src/entities/post.entity/like.entity";
import { eventFactory, newEventSchema } from "../../src/entities/post.entity/event.entity";
import { commentFactory, newCommentSchema } from "../../src/entities/post.entity/comment.entity";

describe('enitity tests', () => {
    
    describe('user', () => {
        describe('user entity', () => {
            const newUser: Omit<NewUserEnitity, 'id'> = {
                username: "Tester",
                password: "TestPass1",
                email_address: "testing@gmail.com",
            }
            test('userFactory create correct user instance', () => {
                const user = userFactory(newUser)
                expect(user.username).toStrictEqual(newUser.username)
                expect(user.email_address).toStrictEqual(newUser.email_address)
                expect(user.password).toHaveLength(60)
                expect(typeof user.password).toStrictEqual('string')
                expect(user.id).toBeDefined()
            })
            test('newUserSchema correctly parses user object', () => {
                const user = userFactory(newUser)
                const parsedUser = newUserSchema.parse(user)

                expect(parsedUser.username).toStrictEqual(user.username)
                expect(parsedUser.email_address).toStrictEqual(user.email_address)
                expect(parsedUser.password).toHaveLength(60)
                expect(typeof parsedUser.password).toStrictEqual('string')
                expect(parsedUser.id).toBeDefined()
            })
            test('newUserShema throws error when wrong user data is being parsed', () => {
                const wrongUser = {
                    username: 1,
                    password: true,
                    email_address: "testing",
                }
                const throwZodError = () => {
                    try {
                        newUserSchema.parse(wrongUser)
                    } catch (err) {                  
                        throw new ZodError(err as ZodIssue[])
                    }
                }
                expect(throwZodError).toThrow(ZodError);

                expect(throwZodError).toThrow('id');
                expect(throwZodError).toThrow('username');
                expect(throwZodError).toThrow('password');
                expect(throwZodError).toThrow('email_address');

                expect(throwZodError).toThrow('Required');
                expect(throwZodError).toThrow('Expected string, received number');
                expect(throwZodError).toThrow('Expected string, received boolean');
                expect(throwZodError).toThrow('Invalid email');
            })    
        })
    })
    
   
    
})