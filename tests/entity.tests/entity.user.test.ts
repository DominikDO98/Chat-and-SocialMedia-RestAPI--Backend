import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue, ZodIssueCode } from "zod";
import { newUserSchema, userFactory } from "../src/entities/user.entity/user.entity";
import { NewUserEnitity } from "../src/entities/user.entity/user.types";
import { handleError } from "../src/middleware/errorHandler";
import { CommentEntity, EventEntity, LikeEntity, PostEntity } from "../src/entities/post.entity/post.types";
import {v4 as uuid} from 'uuid';
import { newPostSchema, postFactory } from "../src/entities/post.entity/post.entity";
import { likeFactory, newLikeSchema } from "../src/entities/post.entity/like.entity";
import { eventFactory, newEventSchema } from "../src/entities/post.entity/event.entity";
import { commentFactory, newCommentSchema } from "../src/entities/post.entity/comment.entity";

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
    
    describe('post', () => {
        describe('post entity', () => {
            const newPost: Omit<PostEntity, 'id' | 'created_at'> = {
                user_id: uuid(),
                group_id: uuid(),
                title: 'nothing',
                text: 'nothingness',
                picture: new Blob(),
                attachment: 'link.com',
                type: 1
            }
            const newPlainPost: Omit<PostEntity, 'id' | 'created_at'> = {
                user_id: uuid(),
                title: 'nothing',
                text: 'nothingness',
                type: 1
            }
            test('postFactory create correct instance of the post object', () => {
                const post = postFactory(newPost);
                const plainPost = postFactory(newPlainPost);

                expect(post.id).toBeDefined();
                expect(post.group_id).toStrictEqual(newPost.group_id);
                expect(post.picture).toBeInstanceOf(Blob);
                expect(post.picture).toStrictEqual(newPost.picture);
                expect(post.attachment).toStrictEqual(newPost.attachment);
                expect(post.created_at).toBeInstanceOf(Date);
                expect(post.type).toStrictEqual(newPost.type);

                expect(plainPost.id).toBeDefined();
                expect(plainPost.group_id).toBeUndefined();
                expect(plainPost.picture).toBeUndefined();
                expect(plainPost.attachment).toBeUndefined();
                expect(plainPost.created_at).toBeInstanceOf(Date);
                expect(plainPost.type).toStrictEqual(newPlainPost.type);
            })
            test('newPostSchema correctly parses post object', () => {
                const post = postFactory(newPost);
                const plainPost = postFactory(newPlainPost);

                const parsedPost = newPostSchema.parse(post);
                const parsedPlainPost = newPostSchema.parse(plainPost);

                expect(parsedPost.id).toBeDefined();
                expect(parsedPost.group_id).toStrictEqual(post.group_id);
                expect(parsedPost.picture).toStrictEqual(post.picture);
                expect(parsedPost.attachment).toStrictEqual(post.attachment);
                expect(parsedPost.created_at).toBeInstanceOf(Date);
                expect(parsedPost.created_at).toStrictEqual(post.created_at);
                expect(parsedPost.type).toStrictEqual(post.type);

                expect(parsedPlainPost.id).toBeDefined();
                expect(parsedPlainPost.group_id).toBeUndefined();
                expect(parsedPlainPost.picture).toBeUndefined();
                expect(parsedPlainPost.attachment).toBeUndefined();
                expect(parsedPlainPost.created_at).toBeInstanceOf(Date);
                expect(parsedPlainPost.created_at).toStrictEqual(post.created_at);
                expect(parsedPlainPost.type).toStrictEqual(post.type);
            })
            test('newPostSchema throws error when wrong post data is being parsed', () => {
                const wrongPost = {
                    user_id: 'too short id',
                    group_id: 'another too short id',
                    title: 123,
                    text: true,
                    picture: {},
                    attachment: 23,
                    created_at: 'not date',
                    type: null,
                }
                const throwZodError = () => {
                    try {
                        newPostSchema.parse(wrongPost)
                    } catch (err) { 
                        throw new ZodError(err as ZodIssue[])
                    }
                }
                
                expect(throwZodError).toThrow(ZodError);
    
                expect(throwZodError).toThrow('id');
                expect(throwZodError).toThrow('user_id');
                expect(throwZodError).toThrow('group_id');
                expect(throwZodError).toThrow('title');
                expect(throwZodError).toThrow('text');
                expect(throwZodError).toThrow('picture');
                expect(throwZodError).toThrow('attachment');
                expect(throwZodError).toThrow('created_at');
                expect(throwZodError).toThrow('type');
    
                expect(throwZodError).toThrow('Required');
                expect(throwZodError).toThrow('Invalid uuid');            
                expect(throwZodError).toThrow('Expected string, received number');
                expect(throwZodError).toThrow('Expected string, received boolean');
                expect(throwZodError).toThrow('Input not instance of Blob');
                expect(throwZodError).toThrow('Expected number, received null');
            })
        })
        describe('like entity', () => {
            const newLike: Omit<LikeEntity, 'id' | 'created_at'> = {
                post_id: uuid(),
                user_id: uuid(),
            }
            test('likeFactory create correct instance of like', () => {
                const like = likeFactory(newLike);
                expect(like.id).toBeDefined();
                expect(like.post_id).toStrictEqual(newLike.post_id);
                expect(like.user_id).toStrictEqual(newLike.user_id);
                expect(like.created_at).toBeInstanceOf(Date);
            })
            test('newLikeSchema correctly parses like object', () => {
                const like = likeFactory(newLike);
                const parsedLike = newLikeSchema.parse(like);

                expect(parsedLike.id).toStrictEqual(like.id);
                expect(parsedLike.post_id).toStrictEqual(like.post_id);
                expect(parsedLike.user_id).toStrictEqual(like.user_id);
                expect(parsedLike.created_at).toBeInstanceOf(Date);
                expect(parsedLike.created_at).toStrictEqual(like.created_at);
            })
            test('newLikeSchema throws error when wrong like data is being parsed', () => {
                const wrongLike = {
                    post_id: 'wrong string',
                    user_id: 'another wrong string',
                    created_at: 'not a Date',
                }
                const throwZodError = () => {
                    try {
                        newLikeSchema.parse(wrongLike)
                    } catch (err) {
                        throw new ZodError(err as ZodIssue[])
                    }
                }
                expect(throwZodError).toThrow(ZodError);

                expect(throwZodError).toThrow('id');
                expect(throwZodError).toThrow('post_id');
                expect(throwZodError).toThrow('user_id');
                expect(throwZodError).toThrow('created_at');

                expect(throwZodError).toThrow('Required');
                expect(throwZodError).toThrow('Invalid uuid');
                expect(throwZodError).toThrow('Expected date, received string');


            })
        })
        describe('event entity', () => {
            const newEvent: EventEntity = {
                post_id: uuid(),
                date: new Date(),
                lat: 45.668278,
                lon: 11.182738,
            }
            test('eventFactory create correct instance of event', () => {
                const event = eventFactory(newEvent);
                
                expect(event.post_id).toStrictEqual(newEvent.post_id);
                expect(event.date).toBeInstanceOf(Date);
                expect(event.lat).toStrictEqual(newEvent.lat);
                expect(event.lon).toStrictEqual(newEvent.lon);
            })
            test('newEventSchema correctly parses event object', () => {
                const event = eventFactory(newEvent);
                const parsedEvent = newEventSchema.parse(event);

                expect(parsedEvent.post_id).toStrictEqual(event.post_id);
                expect(parsedEvent.date).toStrictEqual(event.date);
                expect(parsedEvent.lat).toStrictEqual(event.lat);
                expect(parsedEvent.lon).toStrictEqual(event.lon);
            })
            test('newEventSchema throws error when wrong like data is being parsed', () => {
                const wrongEvent = {
                    post_id: 'yet another wrong id',
                    date: 'definitely not a date',
                    lat: 100,
                    lon: 1.1234567,
                }
                const throwZodError = () => {
                    try {
                        newEventSchema.parse(wrongEvent)
                    } catch (err) {
                        throw new ZodError(err as ZodIssue[])
                    } 
                }
                expect(throwZodError).toThrow(ZodError);

                expect(throwZodError).toThrow('post_id');
                expect(throwZodError).toThrow('date');
                expect(throwZodError).toThrow('lat');
                expect(throwZodError).toThrow('lon');

                expect(throwZodError).toThrow('Invalid uuid');
                expect(throwZodError).toThrow('Expected date, received string');
                expect(throwZodError).toThrow('Number must be less than or equal to 90');
                expect(throwZodError).toThrow('Number must be a multiple of 0.000001');
            })
        })
        describe('comment entity', () => {
            const newComment: Omit<CommentEntity, 'id' | 'created_at'> = {
                post_id: uuid(),
                user_id: uuid(),
                text: 'some text',
                picture: new Blob(),
                attachment: 'link.com'
            }
            const newPlainComment: Omit<CommentEntity, 'id' | 'created_at'> = {
                post_id: uuid(),
                user_id: uuid(),
                text: 'some text',
            }
            test('commentFactory create correct instance of event', () => {
                const comment = commentFactory(newComment);
                const plainComment = commentFactory(newPlainComment);

                expect(comment.id).toBeDefined();
                expect(comment.created_at).toBeInstanceOf(Date);
                expect(comment.picture).toBeInstanceOf(Blob);
                expect(comment.picture).toStrictEqual(newComment.picture);
                expect(comment.attachment).toStrictEqual(newComment.attachment)

                expect(plainComment.id).toBeDefined();
                expect(plainComment.created_at).toBeInstanceOf(Date);
                expect(plainComment.picture).toBeUndefined();
                expect(plainComment.attachment).toBeUndefined();
            })
            test('newCommentSchema correctly parses comment object', () => {
                const comment = commentFactory(newComment);
                const plainComment = commentFactory(newPlainComment);

                const parsedComment = newCommentSchema.parse(comment);
                const parsedPlainComment = newCommentSchema.parse(plainComment);

                expect(parsedComment.created_at).toBeInstanceOf(Date)
                expect(parsedComment.created_at).toStrictEqual(comment.created_at);
                expect(parsedComment.picture).toBeInstanceOf(Blob)
                expect(parsedComment.picture).toStrictEqual(comment.picture);
                expect(parsedComment.attachment).toStrictEqual(comment.attachment);

                expect(parsedPlainComment.created_at).toBeInstanceOf(Date);
                expect(parsedPlainComment.created_at).toStrictEqual(plainComment.created_at);
                expect(parsedPlainComment.picture).toBeUndefined()
                expect(parsedPlainComment.attachment).toBeUndefined();
            })
            test('newCommentSchema throws error when wrong like data is being parsed', () => {
                const wrongComment = {
                    post_id: 'not uuid',
                    user_id: 1,
                    text: 2,
                    created_at: 'date',
                    picture: {},
                    attachment: 'no',
                }
                const throwZodError = () => {
                    try {
                        newCommentSchema.parse(wrongComment)
                    } catch (err) {
                        throw new ZodError(err as ZodIssue[])
                    } 
                }

                expect(throwZodError).toThrow(ZodError);

                expect(throwZodError).toThrow('id');
                expect(throwZodError).toThrow('post_id');
                expect(throwZodError).toThrow('user_id');
                expect(throwZodError).toThrow('text');
                expect(throwZodError).toThrow('picture');
                expect(throwZodError).toThrow('attachment');

                expect(throwZodError).toThrow('Required');
                expect(throwZodError).toThrow('Invalid uuid');
                expect(throwZodError).toThrow('Expected string, received number');
                expect(throwZodError).toThrow('Expected date, received string');
                expect(throwZodError).toThrow('Input not instance of Blob');
                expect(throwZodError).toThrow('String must contain at least 3 character(s)');

            })
        })
    })
    
})