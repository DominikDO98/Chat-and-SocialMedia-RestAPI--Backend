import { Request, Response, NextFunction } from "express";

class CustomError extends Error {

    private readonly _initialStatus = 400;
    protected readonly _code: number; 
    protected readonly _message: string;
    protected readonly _logging: boolean;

    constructor( 
        message: string,
        code?: number,
        logging?: boolean
        ){

        super()
        this._message = message;
        this._code = code || this._initialStatus;
        this._logging = logging || false;
    }

    public get message() {
        return this._message;
    }

    public get code() {
        return this._code;
    }

    
    public get logging() {
        return this._logging;
    }
        
};

export class ValidationError extends CustomError {};
export class InternalError extends CustomError {};
export class ContentNotFoundError extends CustomError {};

const err = new ValidationError ('message', 401, true)

console.log(err.code, err.message, err.name, err.logging);

const err2 = new ValidationError ('messsage')

console.log(err2, err2.code);

throw new InternalError('coś nie działa')

// const handleError = (
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction
//     ) => {
//         console.error(err);

//         if (err instanceof ValidationError) {
//             res
//                 .sendStatus(err.code)
//                 .json({
//                     message: err.message
//                 });
//             };
        

// }
