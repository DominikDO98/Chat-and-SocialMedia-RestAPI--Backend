import { Request, Response, NextFunction, request } from 'express';
import {handleError} from '../src/middleware/errorHandler';
import {ZodError, z} from 'zod';


describe('test if error handler is throwing errors', () => {

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

    test('throw ZodError', () => {
        const string = 'string'
        const zodNumber = z.number()
        

        try {
            zodNumber.parse(string)
        } catch (err) {
            handleError(err as ZodError, mockRequest as Request, mockResponse as Response, nextFunction)
        }

        
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({"message": "Expected number, received string"})
    })

    test('not to throw ZodError', () => {
        const number = 1
        const zodNumber = z.number()
        

        try {
            zodNumber.parse(number)
        } catch (err) {
            handleError(err as ZodError, mockRequest as Request, mockResponse as Response, nextFunction)
        }

        
    expect(mockResponse.status).not.toHaveBeenCalledWith(400);
    expect(mockResponse.json).not.toHaveBeenCalledWith({"message": "Expected number, received string"})
    })
})