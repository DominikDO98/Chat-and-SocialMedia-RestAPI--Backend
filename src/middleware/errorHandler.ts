import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { CustomError } from "./middleware_utils/errors";

export const handleError = (
    err: CustomError | Error,
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        console.error(err);

        if (err instanceof CustomError)
        {res.status(err.code).json({message: err.message});}

        if (err instanceof ZodError)
        {res.status(400).json({message: err.issues});}

        if (err instanceof Error)
        {res.status(500).json({message: 'Internal server error. Please, try again later'});}
        
        next();

}
