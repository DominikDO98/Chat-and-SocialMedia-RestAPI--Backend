import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue, ZodIssueCode } from "zod";
import { newUserSchema, userFactory } from "../src/entities/user.entity/user.entity";
import { NewUserEnitity } from "../src/entities/user.entity/user.types";
import { handleError } from "../src/middleware/errorHandler";
import { EventEntity, LikeEntity, PostEntity } from "../src/entities/post.entity/post.types";
import {v4 as uuid} from 'uuid';
import { newPostSchema, postFactory } from "../src/entities/post.entity/post.entity";
import { likeFactory, newLikeSchema } from "../src/entities/post.entity/like.entity";

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
                expect(user.username).toBe(newUser.username)
                expect(user.email_address).toBe(newUser.email_address)
                expect(user.password).toHaveLength(60)
                expect(typeof user.password).toBe('string')
                expect(user.id).toBeDefined()
            })
            test('newUserSchema correctly parses user object', () => {
                const user = userFactory(newUser)
                const parsedUser = newUserSchema.parse(user)
                expect(parsedUser.username).toBe(newUser.username)
                expect(parsedUser.email_address).toBe(newUser.email_address)
                expect(parsedUser.password).toHaveLength(60)
                expect(typeof parsedUser.password).toBe('string')
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
            
            test('postFactory create correct instance of the post object', () => {
                const post = postFactory(newPost);
                expect(post.id).toBeDefined();
                expect(post.user_id).toBeDefined();
                expect(post.group_id).toBeDefined();
                expect(post.title).toBe(newPost.title);
                expect(post.text).toBe(newPost.text);
                expect(post.attachment).toBe(newPost.attachment);
                expect(post.picture).toBeInstanceOf(Blob);
                expect(post.created_at).toBeInstanceOf(Date);
                expect(post.type).toBe(post.type);
            })
            test('newPostSchema correctly parses post object', () => {
                const post = postFactory(newPost);
                const parsedPost = newPostSchema.parse(post);
                
                expect(parsedPost.id).toBeDefined();
                expect(parsedPost.user_id).toBe(post.user_id);
                expect(parsedPost.group_id).toBe(post.group_id);
                expect(parsedPost.title).toBe(post.title);
                expect(parsedPost.text).toBe(post.text);
                expect(parsedPost.attachment).toBe(post.attachment);
                expect(parsedPost.picture).toBe(post.picture);
                expect(parsedPost.created_at).toBeInstanceOf(Date);
                expect(parsedPost.created_at).toEqual(post.created_at);
                expect(parsedPost.type).toBe(post.type);
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
                expect(like.post_id).toBeDefined();
                expect(like.user_id).toBeDefined();
                expect(like.created_at).toBeInstanceOf(Date);
            })
            test('newLikeSchema correctly parses post object', () => {
                const like = likeFactory(newLike);
                
                const parsedLike = newLikeSchema.parse(like);
                expect(parsedLike.id).toBe(like.id);
                expect(parsedLike.post_id).toBe(like.post_id);
                expect(parsedLike.user_id).toBe(like.user_id);
                expect(parsedLike.created_at).toBeInstanceOf(Date);
                expect(parsedLike.created_at).toEqual(like.created_at);
            })
            test('newLikeSchema throws error when wrong post data is being parsed', () => {
                const wrongLike = {
                    post_id: 'wrong string',
                    user_id: 'another wrong string',
                    created_at: 'not a Date',
                }
                const throwZodError = () => {
                    try {
                        newLikeSchema.parse(wrongLike)
                    } catch (err) {
                        console.log(err);
                                             
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

            test('EventFactory create correct instance of like', () => {
        })
    })
    
})