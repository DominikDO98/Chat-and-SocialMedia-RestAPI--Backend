import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { newUserSchema, userFactory } from "../src/entities/user.entity/user.entity";
import { NewUserEnitity } from "../src/entities/user.entity/user.types";
import { handleError } from "../src/middleware/errorHandler";

describe('enitity tests', () => {
    
      let mockRequest: Partial<Request>;
      let mockResponse: Partial<Response>;
      let nextFunction: NextFunction = jest.fn();
      
      beforeEach(() => {
        mockRequest = {};
        mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };
      });

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
            try {
                newUserSchema.parse(wrongUser)
            } catch (err) {
                handleError(err as ZodError, mockRequest as Request, mockResponse as Response, nextFunction)
            }
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({"message": "Required"})
        })    
        })
    // describe('')
    })